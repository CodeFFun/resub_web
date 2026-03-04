'use client'

import { useState, useEffect } from 'react'
import { handleGetPaymentsByUserId } from '@/lib/actions/payment-action'
import { CartItem } from './cart-page'

export interface Payment{
  _id: string
  amount: number
  orderId: CartItem[]
  createdAt: string
}

export default function MyOrderPage() {
  const [orderPayments, setOrderPayments] = useState<Payment[]>([])

  const fetchPayments = async () => {
    const res = await handleGetPaymentsByUserId();
    console.log(res)
    if(res.success){
      // Filter payments that have orderItemsId (cart orders, not subscription orders)
      const filteredPayments = res.data.filter((payment: Payment) => 
        payment.orderId.some((order: any) => 
          order.orderItemsId && order.orderItemsId.length > 0
        )
      )
      setOrderPayments(filteredPayments)
    }
  }

  useEffect(() => {
    fetchPayments()
  },[])

  return (
    <div className="min-h-screen bg-gray-50 py-8 w-full">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700 text-sm">
            <div>Product Name</div>
            <div>Order Date</div>
            <div>Quantity</div>
            <div>Price</div>
            <div>Shop Name</div>
          </div>

          <div className="divide-y divide-gray-200">
            {orderPayments.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">
                No orders yet
              </div>
            ) : (
              orderPayments.flatMap((payment) => 
                payment.orderId
                  .filter((order: any) => order.orderItemsId && order.orderItemsId.length > 0)
                  .flatMap((order: any) => 
                    order.orderItemsId.map((orderItem: any, itemIndex: number) => (
                      <div
                        key={`${payment._id}-${order._id}-${itemIndex}`}
                        className="grid grid-cols-5 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors"
                      >
                        <div className="font-medium text-gray-900">
                          {orderItem?.productId?.name || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-600">
                          {payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : 'N/A'}
                        </div>
                        <div className="text-sm text-gray-600">
                          {orderItem?.quantity || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-600">
                          Rs.{orderItem?.productId?.price ? (orderItem.quantity * orderItem.productId.price) : payment.amount}
                        </div>
                        <div className="text-sm text-gray-600">
                          {order?.shopId?.name || 'N/A'}
                        </div>
                      </div>
                    ))
                  )
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
