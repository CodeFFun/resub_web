'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MapPin } from 'lucide-react'

interface ShopDetailsProps {
  id: string
}

// Mock shop data
const SHOPS_DATA: { [key: string]: any } = {
  '1': {
    id: '1',
    name: 'Fire And Ice Pizzeria',
    banner: '/placeholder.svg?height=400&width=1200',
    logo: '/placeholder.svg?height=100&width=100',
    category: 'Italian',
    address: 'Thamel',
    minimumOrder: 0,
    additionalServiceCharge: 'N/A',
    additionalVat: 'N/A',
    description: 'This is firstly opened its doors in January 1995. It immediately became a very popular restaurant among travelers, climbers and local residents as the place to meet for a morning cup of Italian espresso, or later on in the day to share stories and travel tales with friends whilst savoring delicious Pizza, Pastas, Organic Salads, Deserts and even a Grappa after Dinner.',
    branches: [
      {
        id: '1-1',
        name: 'Fire And Ice Pizzeria - Sanepa',
        image: '/placeholder.svg?height=200&width=300',
        address: 'Sanepa Marg, International Club Surendra Bhawan - 40',
      },
      {
        id: '1-2',
        name: 'Fire And Ice Pizzeria - Thamel',
        image: '/placeholder.svg?height=200&width=300',
        address: 'Thamel Marg, Kathmandu',
      },
      {
        id: '1-3',
        name: 'Fire And Ice Pizzeria - Boudha',
        image: '/placeholder.svg?height=200&width=300',
        address: 'Boudha Circle, Kathmandu',
      },
    ],
    products: [
      {
        id: 'p1',
        name: 'L\'Americana',
        category: 'Pizza',
        image: '/placeholder.svg?height=200&width=200',
        price: 1320,
      },
      {
        id: 'p2',
        name: 'Margherita Pizza',
        category: 'Pizza',
        image: '/placeholder.svg?height=200&width=200',
        price: 890,
      },
      {
        id: 'p3',
        name: 'Signature Pizza',
        category: 'Pizza',
        image: '/placeholder.svg?height=200&width=200',
        price: 1100,
      },
      {
        id: 'p4',
        name: 'Garlic Bread',
        category: 'Sides',
        image: '/placeholder.svg?height=200&width=200',
        price: 250,
      },
      {
        id: 'p5',
        name: 'Caesar Salad',
        category: 'Salads',
        image: '/placeholder.svg?height=200&width=200',
        price: 450,
      },
      {
        id: 'p6',
        name: 'Tiramisu',
        category: 'Desserts',
        image: '/placeholder.svg?height=200&width=200',
        price: 350,
      },
    ],
  },
}

export default function ShopDetail({ id }: ShopDetailsProps) {
  const [activeTab, setActiveTab] = useState('products')
  const shop = SHOPS_DATA[id]

  if (!shop) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-600">Shop not found</p>
      </div>
    )
  }

  const categories = [...new Set(shop.products.map((p: any) => p.category))]

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Hero Image Section */}
      <div className="relative w-full h-96">
        <Image
          src={shop.banner || '/placeholder.svg'}
          alt={shop.name}
          fill
          className="object-cover"
        />

        {/* Shop Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-8">
          <div className="flex items-end gap-6">
            <Image
              src={shop.logo || '/placeholder.svg'}
              alt={shop.name}
              width={80}
              height={80}
              className="rounded-lg border-4 border-white"
            />
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">{shop.name}</h1>
              <p className="text-sm mb-1 flex items-center gap-1">
                <span className="text-yellow-400">●</span> {shop.category}
              </p>
              <p className="text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {shop.address}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="max-w-6xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full rounded-none border-b border-gray-200 bg-white">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="branches">Other Branches</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Categories Sidebar */}
              <div className="lg:col-span-1">
                <h3 className="text-sm font-semibold text-green-600 mb-4">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Products Grid */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {shop.products.map((product: any) => (
                    <div
                      key={product.id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="relative h-48 bg-gray-100">
                        <Image
                          src={product.image || '/placeholder.svg'}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-gray-500 mb-1">
                          {product.category}
                        </p>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          {product.name}
                        </h4>
                        <p className="text-lg font-semibold text-green-600">
                          Rs. {product.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="p-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {shop.name}
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {shop.description}
              </p>
            </div>
          </TabsContent>

          {/* Other Branches Tab */}
          <TabsContent value="branches" className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Other Branches of this member.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shop.branches.map((branch: any) => (
                <div
                  key={branch.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48 bg-gray-100">
                    <Image
                      src={branch.image || '/placeholder.svg'}
                      alt={branch.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                      {branch.name}
                    </h3>
                    <p className="text-xs text-gray-600 flex items-start gap-2">
                      <MapPin className="w-3 h-3 mt-0.5 shrink-0" />
                      <span>{branch.address}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
