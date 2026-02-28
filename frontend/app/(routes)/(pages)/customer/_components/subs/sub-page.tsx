'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Trash2, Minus, Plus } from 'lucide-react'
import { handleDeleteSubscription, handleGetAllSubscriptionOfAUser, handleUpdateSubscription } from '@/lib/actions/subscription-action'
import { handleUpdateSubscriptionPlan } from '@/lib/actions/subscrition-plan-action'
import { toast } from 'sonner'

interface SubscriptionItem {
  _id: string
  status: 'active' | 'paused' | 'cancelled'
  remaining_cycle: number
  subscription_planId: {
    _id: string
    productId: [{
      name: string
      quantity: number
      base_price: number
    }]
    price_per_cycle: number
    frequency: number
    quantity: number
  }
  start_date: string
  shopId:{
    _id: string
    name: string
  }
}


export default function SubPage() {
  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const fetchSubscriptions = async () => {
    
    const res = await handleGetAllSubscriptionOfAUser()
    console.log(res)
    if(res.success){
      setSubscriptions(res.data)
    } else {
      console.error("Failed to fetch subscriptions:", res.message)
    }
  }

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  const handleSelectAll = () => {
    const newSelectAll = !selectAll
    setSelectAll(newSelectAll)
    if (newSelectAll) {
      setSelectedIds(new Set(subscriptions.map((item) => item._id)))
    } else {
      setSelectedIds(new Set())
    }
  }

  const handleSelectItem = (id: string) => {
    const newSelectedIds = new Set(selectedIds)
    if (newSelectedIds.has(id)) {
      newSelectedIds.delete(id)
    } else {
      newSelectedIds.add(id)
    }
    setSelectedIds(newSelectedIds)
    setSelectAll(newSelectedIds.size === subscriptions.length && subscriptions.length > 0)
  }

  const handleQuantityChange = async (id: string, change: number) => {
    const currentId = subscriptions.find(item => item._id === id)?.subscription_planId._id
    if(currentId === undefined) return
    const current = subscriptions.find(item => item._id === id)?.subscription_planId.quantity
    if(current === undefined) return
    const newPrice = subscriptions.find(item => item._id === id)?.subscription_planId.productId[0].base_price
    if(newPrice === undefined) return
   
    const res = await handleUpdateSubscriptionPlan(currentId, {
      quantity: Math.max(1, current + change),
      price_per_cycle: newPrice * Math.max(1, current + change)
    })
    if(res.success){
      console.log(res)
      fetchSubscriptions()
    }
  }

  const handleFrequencyChange = async (id: string, change: number) => {
    const currentId = subscriptions.find(item => item._id === id)?.subscription_planId._id
    if(currentId === undefined) return
    const newFrequency = subscriptions.find(item => item._id === id)?.subscription_planId.frequency
    if(newFrequency === undefined) return
    const res = await handleUpdateSubscriptionPlan(currentId, {
      frequency: Math.max(1, newFrequency + change)
    })
    if(res.success){
      fetchSubscriptions()
    }
    
  }

  const handleStartDateChange = async (id: string, date: string) => {
    const newDate = new Date(date)
    // setSubscriptions(
    //   subscriptions.map((item) =>
    //     item._id === id ? { ...item, start_date: date } : item
    //   )
    // )
    const res = await handleUpdateSubscription(id, {
      start_date: newDate
    })
    if(res.success){
      fetchSubscriptions()
    }
  }

  const handleStatusChange = async (id: string, status: SubscriptionItem['status']) => {
    const res = await handleUpdateSubscription(id, {
      status
    })
    if(res.success){
      fetchSubscriptions()
    }
  }

  const handleRemove = async (id: string) => {
    // setSubscriptions(subscriptions.filter((item) => item._id !== id))
    const res = await handleDeleteSubscription(id)
    if(res.success){
      toast.success("Subscription removed")
      fetchSubscriptions()
    }else {
      toast.error("Failed to remove subscription")
    }
  }

  const selectedItems = subscriptions.filter((item) => selectedIds.has(item._id))
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.subscription_planId.price_per_cycle, 0)
  const estimatedTotal = totalPrice * Math.max(...selectedItems.map((item) => item.remaining_cycle), 0)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Subscriptions</h1>
          <p className="text-gray-600 mt-2">Manage your recurring orders</p>
        </div>

        {subscriptions.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-gray-500 text-lg">No subscriptions yet</p>
            <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
              Start a Subscription
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-8">
            {/* Subscriptions List */}
            <div className="col-span-2">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                {/* Check All */}
                <div className="p-6 border-b border-gray-200 flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="w-5 h-5 text-blue-600 rounded cursor-pointer"
                  />
                  <label className="text-sm font-medium text-gray-700 cursor-pointer">
                    Select All Subscriptions
                  </label>
                </div>

                {/* Subscription Items */}
                <div className="divide-y divide-gray-200">
                  {subscriptions.map((subscription) => (
                    <div
                      key={subscription._id}
                      className="p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex gap-4">
                        {/* Checkbox */}
                        <input
                          type="checkbox"
                          checked={selectedIds.has(subscription._id)}
                          onChange={() => handleSelectItem(subscription._id)}
                          className="w-5 h-5 text-blue-600 rounded cursor-pointer mt-1 shrink-0"
                        />

                        {/* Subscription Details */}
                        <div className="grow">
                          <div className="mb-4">
                            <p className="text-xs text-gray-500 uppercase tracking-wide">
                              {subscription.shopId.name}
                            </p>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {subscription.subscription_planId.productId[0].name}
                            </h3>
                          </div>

                          {/* Details Grid */}
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-4">
                            {/* Quantity */}
                            <div>
                              <label className="text-sm text-gray-600 block mb-2">
                                Quantity
                              </label>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleQuantityChange(subscription._id, -1)}
                                  className="p-1 rounded hover:bg-gray-200 transition-colors"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-8 text-center font-semibold">
                                  {subscription.subscription_planId.quantity}
                                </span>
                                <button
                                  onClick={() => handleQuantityChange(subscription._id, 1)}
                                  className="p-1 rounded hover:bg-gray-200 transition-colors"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            <div>
                              <label className="text-sm text-gray-600 block mb-2">
                                Price per Cycle
                              </label>
                              <p className="text-lg font-semibold text-gray-900">
                                Rs.{subscription.subscription_planId.price_per_cycle}
                              </p>
                            </div>
                            <div>
                              <label className="text-sm text-gray-600 block mb-2">
                                Frequency (days)
                              </label>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleFrequencyChange(subscription._id, -1)}
                                  className="p-1 rounded hover:bg-gray-200 transition-colors"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-8 text-center font-semibold">
                                  {subscription.subscription_planId.frequency}
                                </span>
                                <button
                                  onClick={() => handleFrequencyChange(subscription._id, 1)}
                                  className="p-1 rounded hover:bg-gray-200 transition-colors"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Start Date + Status */}
                          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm text-gray-600 block mb-2">
                                Start Date
                              </label>
                              <input
                                type="date"
                                value={subscription.start_date ? new Date(subscription.start_date).toISOString().split('T')[0] : ''}
                                onChange={(e) =>
                                  handleStartDateChange(subscription._id, e.target.value)
                                }
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                              />
                            </div>
                            <div>
                              <label className="text-sm text-gray-600 block mb-2">
                                Status
                              </label>
                              <select
                                value={subscription.status}
                                onChange={(e) =>
                                  handleStatusChange(subscription._id, e.target.value as SubscriptionItem['status'])
                                }
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                              >
                                {['active', 'paused', 'cancelled'].map((status) => (
                                  <option key={status} value={status}>
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Product Price Display */}
                          <div className="text-sm text-gray-600">
                            Base Price: Rs.{subscription.subscription_planId.productId[0].base_price} × {subscription.subscription_planId.quantity}{' '}
                            items = Rs.{subscription.subscription_planId.price_per_cycle}/cycle
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemove(subscription._id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition-colors shrink-0"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="col-span-1">
              <div className="bg-white rounded-lg p-6 sticky top-8 h-fit shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subscriptions Selected:</span>
                    <span className="font-semibold">{selectedItems.length}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Price per Cycle:</span>
                    <span className="font-semibold">Rs.{totalPrice}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Max Occurrences:</span>
                    <span className="font-semibold">
                      {selectedItems.length > 0
                        ? Math.max(...selectedItems.map((item) => item.remaining_cycle))
                        : 0}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <span className="font-semibold text-gray-900">Estimated Total:</span>
                    <span className="font-bold text-xl text-blue-600">
                      Rs.{estimatedTotal}
                    </span>
                  </div>
                </div>

                <Button
                  disabled={selectedItems.length === 0}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Checkout
                </Button>

                <button className="w-full mt-3 text-blue-600 hover:text-blue-700 font-medium">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
