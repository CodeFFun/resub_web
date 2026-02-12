'use client'

import Image from 'next/image'
import { useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

// Generate 20 dummy products
const ALL_PRODUCTS = Array.from({ length: 20 }, (_, i) => ({
  id: (i + 1).toString(),
  name: `Product ${i + 1}`,
  category: ['Electronics', 'Fashion', 'Home & Garden', 'Beauty', 'Sports'][i % 5],
  image: '/placeholder.svg?height=200&width=200',
}))

const ITEMS_PER_PAGE = 8

export default function ShopSection() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(ALL_PRODUCTS.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentProducts = ALL_PRODUCTS.slice(startIndex, endIndex)

  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">All Products</h2>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer"
            >
              <div className="bg-gray-100 rounded-lg p-4 mb-4 h-48 relative overflow-hidden group-hover:shadow-lg transition-shadow">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600">
                {product.category}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      e.preventDefault()
                      if (currentPage > 1) setCurrentPage(currentPage - 1)
                    }}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first 2, last 2, and current page with neighbors
                  const showPage = 
                    page <= 2 || 
                    page >= totalPages - 1 || 
                    (page >= currentPage - 1 && page <= currentPage + 1)

                  if (!showPage && page > 2 && page < totalPages - 1) {
                    return (
                      <PaginationItem key={`ellipsis-${page}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )
                  }

                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        isActive={page === currentPage}
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                          e.preventDefault()
                          setCurrentPage(page)
                        }}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                })}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      e.preventDefault()
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                    }}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </section>
  )
}
