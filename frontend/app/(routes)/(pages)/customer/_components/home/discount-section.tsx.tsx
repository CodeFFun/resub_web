'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'



const FLASH_SALE_PRODUCTS = [
  {
    id: '1',
    name: 'Perfectx Intensive Concentrate Cream',
    category: 'Skincare',
    image: '/placeholder.svg?height=200&width=200',
    price: 189,
    originalPrice: 1520,
    discount: 88,
  },
  {
    id: '2',
    name: 'Green Airbeat-520 Dual Mic ENC Earbuds',
    category: 'Electronics',
    image: '/placeholder.svg?height=200&width=200',
    price: 999,
    originalPrice: 2599,
    discount: 62,
  },
  {
    id: '3',
    name: 'BO Condom Mix flavour',
    category: 'Health',
    image: '/placeholder.svg?height=200&width=200',
    price: 42,
    originalPrice: 147,
    discount: 71,
  },
  {
    id: '4',
    name: 'Nawam Child Nutri Food',
    category: 'Food',
    image: '/placeholder.svg?height=200&width=200',
    price: 546,
    originalPrice: 595,
    discount: 8,
  },
  {
    id: '5',
    name: 'Jina Alchemy Flower of Life Cleansing Balm',
    category: 'Beauty',
    image: '/placeholder.svg?height=200&width=200',
    price: 1085,
    originalPrice: 1340,
    discount: 19,
  },
  {
    id: '6',
    name: 'PAXMOLY KOREA Brightening Vitamin C',
    category: 'Skincare',
    image: '/placeholder.svg?height=200&width=200',
    price: 72,
    originalPrice: 90,
    discount: 20,
  },
]

export default function DiscountSection() {

  return (
    <section className="w-full bg-white py-8">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Flash Sale</h2>
            <p className="text-orange-500 font-semibold">On Sale Now</p>
          </div>
          <Button 
            variant="outline" 
            className="border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent"
          >
            SHOP ALL PRODUCTS
          </Button>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {FLASH_SALE_PRODUCTS.map((product) => (
            <div key={product.id} className="flex flex-col">
              <div className="bg-gray-100 rounded-lg p-4 mb-4 h-48 relative shrink-0">
                <Image
                  src={product.image || '/placeholder.svg'}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-xs text-gray-500 mb-1">{product.category}</p>
              <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-3 grow">
                {product.name}
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-orange-500">
                  Rs.{product.price}
                </span>
                <span className="text-xs text-gray-400 line-through">
                  Rs.{product.originalPrice}
                </span>
                <span className="text-xs text-orange-500 font-semibold">
                  -{product.discount}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
