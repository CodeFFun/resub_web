'use client'

import Image from 'next/image'

const CATEGORIES = [
  { id: '1', name: 'Breast Pump Accessories', image: '/placeholder.svg?height=150&width=150' },
  { id: '2', name: '360 Cameras', image: '/placeholder.svg?height=150&width=150' },
  { id: '3', name: 'Vinegar & Cooking Wine', image: '/placeholder.svg?height=150&width=150' },
  { id: '4', name: 'Convertible', image: '/placeholder.svg?height=150&width=150' },
  { id: '5', name: 'Teaching Clocks', image: '/placeholder.svg?height=150&width=150' },
  { id: '6', name: 'Replacement', image: '/placeholder.svg?height=150&width=150' },
  { id: '7', name: 'Toilet Paper', image: '/placeholder.svg?height=150&width=150' },
  { id: '8', name: 'Habitats & Accessories', image: '/placeholder.svg?height=150&width=150' },
  { id: '9', name: 'Christening', image: '/placeholder.svg?height=150&width=150' },
  { id: '10', name: 'Ergonomic Accessories', image: '/placeholder.svg?height=150&width=150' },
  { id: '11', name: 'Dishwashers', image: '/placeholder.svg?height=150&width=150' },
  { id: '12', name: 'Bathroom', image: '/placeholder.svg?height=150&width=150' },
  { id: '13', name: 'Still Water', image: '/placeholder.svg?height=150&width=150' },
  { id: '14', name: 'Hall Stands & Shelving', image: '/placeholder.svg?height=150&width=150' },
  { id: '15', name: 'Airport Routers', image: '/placeholder.svg?height=150&width=150' },
  { id: '16', name: 'Ethnic Wear', image: '/placeholder.svg?height=150&width=150' },
]

export default function CategoriesSection() {
  return (
    <section className="w-full bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Categories</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="flex flex-col items-center text-center cursor-pointer group"
            >
              <div className="w-full aspect-square bg-white rounded-lg p-4 mb-3 overflow-hidden group-hover:shadow-md transition-shadow">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={150}
                  height={150}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
