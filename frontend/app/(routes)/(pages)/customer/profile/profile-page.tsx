"use client"

import { useState } from "react"
import { Sidebar } from "./_components/sidebar"
import { Profile } from "./_components/profilepage"
import { NotificationMainbar } from "./_components/notification-mainbar"

export default function ProfilePage({user}:{user: any}) {
  const [activeTab, setActiveTab] = useState("My Profile")

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "My Profile" && <Profile user={user} />}
      {activeTab === "Notification" && <NotificationMainbar />}
    </div>
  )
}
