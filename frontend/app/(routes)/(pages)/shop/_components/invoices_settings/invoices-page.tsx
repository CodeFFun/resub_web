'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { handleGetPaymentsOfShop } from '@/lib/actions/payment-action'
import { handleGetAllShopsOfAUser } from '@/lib/actions/shop-action'

interface Payment {
  _id: string
  provider: string
  status: string
  amount: number
  paid_at: string
  createdAt: string
  orderId: Array<{
    _id: string
    delivery_type: string
    userId: {
      _id: string
      username: string
      email: string
      phoneNumber?: string
    }
    shopId: {
      _id: string
      name: string
      addressId: {
        _id: string
        line1: string
        city: string
        state: string
      }
    }
    orderItemsId: Array<{
      _id: string
      quantity: number
      unit_price: number
      productId: {
        _id: string
        name: string
        base_price: number
        discount: number
      }
    }>
    subscriptionId?: {
      _id: string
      status: string
      start_date: string
      remaining_cycle: number
      subscription_planId: {
        _id: string
        frequency: number
        price_per_cycle: number
        active: boolean
        productId: Array<{
          _id: string
          name: string
          description: string
          base_price: number
          discount: number
        }>
        quantity: number
      }
      userId: string
      shopId: string
    }
  }>
}

interface InvoiceItem {
  productName: string
  quantity: number
  discount: number
  price: number
  totalPrice: number
}

interface Invoice {
  paymentId: string
  type: 'Order' | 'Subscription'
  date: string
  userName: string
  shopName: string
  userEmail: string
  shopAddress: string
  items: InvoiceItem[]
}

const transformPaymentToInvoices = (payments: Payment[]): Invoice[] => {
  const invoices: Invoice[] = []
  
  payments.forEach((payment) => {
    const items: InvoiceItem[] = []
    let userName = ''
    let userEmail = ''
    let shopName = ''
    let shopAddress = ''
    let type: 'Order' | 'Subscription' = 'Order'

    payment.orderId.forEach((order, index) => {
      if (index === 0) {
        userName = order.userId.username
        userEmail = order.userId.email
        shopName = order.shopId.name
        shopAddress = `${order.shopId.addressId.line1}, ${order.shopId.addressId.city}, ${order.shopId.addressId.state}`
      }

      // Check if it's a subscription (subscriptionId exists and orderItemsId is empty)
      if (order.subscriptionId && order.orderItemsId.length === 0) {
        type = 'Subscription'
        const products = order.subscriptionId.subscription_planId.productId
        products.forEach((product) => {
          items.push({
            productName: product.name,
            quantity: order.subscriptionId?.subscription_planId.quantity || 0,
            discount: product.discount,
            price: product.base_price,
            totalPrice: order.subscriptionId?.subscription_planId.price_per_cycle || 0,
          })
        })
      }
      // Otherwise it's an order
      else if (order.orderItemsId.length > 0) {
        type = 'Order'
        order.orderItemsId.forEach((item) => {
          items.push({
            productName: item.productId.name,
            quantity: item.quantity,
            discount: item.productId.discount,
            price: item.productId.base_price,
            totalPrice: item.unit_price,
          })
        })
      }
    })

    invoices.push({
      paymentId: payment._id,
      type,
      date: new Date(payment.createdAt).toISOString().split('T')[0],
      userName,
      shopName,
      userEmail,
      shopAddress,
      items,
    })
  })

  return invoices
}

export default function InvoicesPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [selectedShops, setSelectedShops] = useState<string[]>([])
  const [shops, setShops] = useState<Array<{ _id: string; name: string }>>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])

  const fetchShops = async () => {
    const res = await handleGetAllShopsOfAUser()
    if (res.success) {
      setShops(res.data)
    }
  }

  const fetchInvoices = async () => {
    const res = await handleGetPaymentsOfShop()
    console.log(res)
    if (res.success) {
      const transformedInvoices = transformPaymentToInvoices(res.data)
      setInvoices(transformedInvoices)
    }
  }

  useEffect(() => {
    fetchShops()
    fetchInvoices()
  }, [])


  const toggleExpand = (paymentId: string) => {
    setExpandedId(expandedId === paymentId ? null : paymentId)
  }

  const handleShopToggle = (shop: string) => {
    setSelectedShops((prev) =>
      prev.includes(shop) ? prev.filter((s) => s !== shop) : [...prev, shop]
    )
  }

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const shopMatch = selectedShops.length === 0 || selectedShops.includes(invoice.shopName)
      return shopMatch
    })
  }, [selectedShops, invoices])

  const calculateTotal = (items: InvoiceItem[]) => {
    return items.reduce((total, item) => {
      return total + item.totalPrice
    }, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 w-full">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Invoices</h1>
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="mb-6">
            <Label className="block text-sm font-medium text-gray-700 mb-4">Filter by Shop</Label>
            <div className="grid grid-cols-4 gap-4">
              {shops.map((shop) => (
                <div key={shop._id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`shop-${shop._id}`}
                    checked={selectedShops.includes(shop.name)}
                    onChange={() => handleShopToggle(shop.name)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 cursor-pointer"
                  />
                  <label htmlFor={`shop-${shop._id}`} className="ml-3 text-sm text-gray-700 cursor-pointer">
                    {shop.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-6 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-900 text-sm items-center">
            <div>Payment ID</div>
            <div>Type</div>
            <div>Date</div>
            <div>User Name</div>
            <div>Shop Name</div>
            <div className="text-right">Action</div>
          </div>

          <div>
            {filteredInvoices.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">
                No invoices found matching the selected filters.
              </div>
            ) : (
              filteredInvoices.map((invoice) => (
                <React.Fragment key={invoice.paymentId}>
                  <div
                    onClick={() => toggleExpand(invoice.paymentId)}
                    className="w-full grid grid-cols-6 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors border-b border-gray-200"
                  >
                    <div className="text-sm font-medium text-gray-900">{invoice.paymentId}</div>
                    <div className="text-sm text-gray-900">{invoice.type}</div>
                    <div className="text-sm text-gray-900">{invoice.date}</div>
                    <div className="text-sm text-gray-900">{invoice.userName}</div>
                    <div className="text-sm text-gray-900">{invoice.shopName}</div>
                    <div className="flex justify-end">
                      {expandedId === invoice.paymentId ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {expandedId === invoice.paymentId && (
                    <div className="px-6 py-6 bg-gray-50 border-b border-gray-200">
                      <div className="flex justify-between gap-8 mb-8">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase">From</h3>
                          <div className="space-y-2 text-sm text-gray-600">
                            <p className="font-medium text-gray-900">{invoice.shopName}</p>
                            <p>{invoice.shopAddress}</p>
                          </div>
                        </div>
                      <div />
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase">To</h3>
                          <div className="space-y-2 text-sm text-gray-600">
                            <p className="font-medium text-gray-900">{invoice.userName}</p>
                            <p>{invoice.userEmail}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mb-8">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase">Items</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-gray-900">Product Name</th>
                                <th className="text-right py-3 px-4 font-semibold text-gray-900">Quantity</th>
                                <th className="text-right py-3 px-4 font-semibold text-gray-900">Price</th>
                                <th className="text-right py-3 px-4 font-semibold text-gray-900">Discount (%)</th>
                                <th className="text-right py-3 px-4 font-semibold text-gray-900">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {invoice.items.map((item, idx) => {
                                return (
                                  <tr key={idx} className="border-b border-gray-100">
                                    <td className="py-3 px-4 text-gray-900">{item.productName}</td>
                                    <td className="text-right py-3 px-4 text-gray-600">{item.quantity}</td>
                                    <td className="text-right py-3 px-4 text-gray-600">Rs.{item.price.toFixed(2)}</td>
                                    <td className="text-right py-3 px-4 text-gray-600">{item.discount}%</td>
                                    <td className="text-right py-3 px-4 font-medium text-gray-900">
                                      Rs.{item.totalPrice.toFixed(2)}
                                    </td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="w-64">
                          <div className="flex justify-between py-2 border-t-2 border-gray-200">
                            <span className="font-semibold text-gray-900">Invoice Total:</span>
                            <span className="font-bold text-lg text-gray-900">
                              Rs.{calculateTotal(invoice.items).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
