'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { handleGetAllShopCategory } from '@/lib/actions/shop-category-action'

type CATEGORY = {
  _id: string;
  name: string;
  image: string;
}

const image = [
  "/images/TANDE.jpg",
  "/images/fastfashion.jpg",
  "/images/home.webp",
  "/images/FB.jpg",
  "/images/s&f.png",
  "/images/images.jpg",
  "/images/images (1).jpg",
  "/images/toys.webp",
  "/images/automation.png",
]

export default function CategoriesSection() {
  const [categories, setCategories] = useState<CATEGORY[]>([])

  const getAllCategories = async () => {
    const res = await handleGetAllShopCategory()
    if(res.success) {
      setCategories(
        res.data.map((cat:CATEGORY, index:number) => ({
          ...cat,
          image: image[index]
        }))
      )
    }
  }

  useEffect(() => {
      getAllCategories()
  }, [])


  return (
    <section className="w-full bg-secondary py-12">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-3xl font-bold text-foreground mb-8">Categories</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5  gap-4">
          {categories.map((category) => (
            <div
              key={category._id}
              className="flex flex-col items-center text-center cursor-pointer group"
            >
              <div className="w-full aspect-square bg-card rounded-lg p-4 mb-3 overflow-hidden group-hover:shadow-md transition-shadow">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={150}
                  height={150}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm font-medium text-foreground line-clamp-2 hover:text-accent transition-colors">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
