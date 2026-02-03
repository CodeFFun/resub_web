"use client"

import { useState } from "react"
import { Sidebar } from "./_components/sidebar"
import { MainContent } from "./_components/mainbar"
import { NotificationMainbar } from "./_components/notification-mainbar"

export default function ProfilePage({user}:{user: any}) {
  const [activeTab, setActiveTab] = useState("account")

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "account" && <MainContent user={user} />}
      {activeTab === "notification" && <NotificationMainbar />}
    </div>
  )
}
