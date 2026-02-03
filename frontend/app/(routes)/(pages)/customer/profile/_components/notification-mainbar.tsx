"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function NotificationMainbar() {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: true,
    orderUpdates: true,
    newsAndOffers: false,
  })

  const handleToggle = (key: string) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSaveNotifications = () => {
    console.log("Saving notifications:", notifications)
  }

  return (
    <main className="flex-1 p-8">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Notification Settings</h1>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="space-y-6">
            {/* Email Notifications */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Email Notifications</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Receive email updates about your account activity
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications.emailNotifications}
                onChange={() => handleToggle("emailNotifications")}
                className="w-5 h-5 rounded cursor-pointer"
              />
            </div>

            {/* SMS Notifications */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">SMS Notifications</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Receive SMS alerts for important updates
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications.smsNotifications}
                onChange={() => handleToggle("smsNotifications")}
                className="w-5 h-5 rounded cursor-pointer"
              />
            </div>

            {/* Push Notifications */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Push Notifications</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Receive push notifications on your devices
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications.pushNotifications}
                onChange={() => handleToggle("pushNotifications")}
                className="w-5 h-5 rounded cursor-pointer"
              />
            </div>

            {/* Marketing Emails */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Marketing Emails</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Receive promotional offers and marketing emails
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications.marketingEmails}
                onChange={() => handleToggle("marketingEmails")}
                className="w-5 h-5 rounded cursor-pointer"
              />
            </div>

            {/* Order Updates */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Order Updates</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Get notified about your order status changes
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications.orderUpdates}
                onChange={() => handleToggle("orderUpdates")}
                className="w-5 h-5 rounded cursor-pointer"
              />
            </div>

            {/* News and Offers */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">News and Offers</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Stay updated with latest news and special offers
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications.newsAndOffers}
                onChange={() => handleToggle("newsAndOffers")}
                className="w-5 h-5 rounded cursor-pointer"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              onClick={handleSaveNotifications}
              className="bg-gray-800 text-white hover:bg-gray-900"
            >
              Save Preferences
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
