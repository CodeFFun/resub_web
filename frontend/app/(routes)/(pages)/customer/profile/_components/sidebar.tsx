"use client"

import { Bell, Lock } from "lucide-react"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-48 bg-white border-r border-gray-200 p-6">
      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Settings
        </h3>
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab("account")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "account"
                ? "bg-gray-100 text-black"
                : "text-gray-600 hover:text-black"
            }`}
          >
            <Lock size={18} />
            Account
          </button>
          <button
            onClick={() => setActiveTab("notification")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "notification"
                ? "bg-gray-100 text-black"
                : "text-gray-600 hover:text-black"
            }`}
          >
            <Bell size={18} />
            Notification
          </button>
        </nav>
      </div>
    </aside>
  )
}
