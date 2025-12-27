"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main
      className="min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: "url(/images/home_image.webp)" }}
    >
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        {/* Centered content section */}
        <div className="max-w-2xl w-full text-center space-y-8">
          <h1 className="text-3xl md:text-4xl font-medium text-[#C05800]">
            Order product from the widest range of restaurants.
          </h1>

          <div className="flex gap-4 justify-center max-w-lg mx-auto">
            <Link href="/login" className="flex-1">
              <Button className="w-full bg-[#3d3d1f] hover:bg-[#2d2d15] text-white font-semibold px-6 py-3 rounded">
                Login
              </Button>
            </Link>
            <Link href="/register" className="flex-1">
              <Button className="w-full bg-[#3d3d1f] hover:bg-[#2d2d15] text-white font-semibold px-6 py-3 rounded">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
