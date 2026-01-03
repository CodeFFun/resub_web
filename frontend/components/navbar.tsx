"use client"

import { Search, Heart, ShoppingCart, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()

  const isAuthPage =
    pathname.startsWith("/(auth)") ||
    pathname.includes("/login") ||
    pathname.includes("/register") ||
    pathname.includes("/forgot-password") 

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <span className="text-2xl font-bold text-black">ReSub</span>
          </Link>

          {!isAuthPage && (
            <>
              {/* Search Bar */}
              <div className="flex-1 max-w-md mx-auto">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    className="w-full px-4 py-2 bg-gray-100 rounded-lg text-sm placeholder-gray-500 focus:outline-none"
                  />
                  <button className="absolute right-3 text-gray-400 hover:text-gray-600">
                    <Search size={20} />
                  </button>
                </div>
              </div>

              {/* Right Icons */}
              <div className="flex items-center gap-6">
                {/* Wishlist */}
                <Link href="/wishlist" className="relative hover:text-gray-600">
                  <Heart size={24} className="text-black" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    4
                  </span>
                </Link>

                {/* Cart */}
                <Link href="/cart" className="relative hover:text-gray-600">
                  <ShoppingCart size={24} className="text-black" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    2
                  </span>
                </Link>

                {/* Profile */}
                <Link href="/profile" className="hover:text-gray-600">
                  <User size={24} className="text-black" />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
