"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { handleGetAllShopCategory } from "@/lib/actions/shop-category-action";
import { handleGetAllShops } from "@/lib/actions/shop-action";
import { BASE_URL } from "@/lib/api/axios";

interface Shop {
  _id: string;
  name: string;
  shop_banner?: string;
  categoryId: {
    _id: string;
    name: string;
  };
}

interface Category {
  _id: string;
  name: string;
  shops?: string[];
}

export default function AllShops() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);

  const getAllCategories = async () => {
    const res = await handleGetAllShopCategory();
    if (res.success) {
      setCategories(res.data);
    }
  };
  const fetchShops = async () => {
    const res = await handleGetAllShops();
    if (res.success) {
      setShops(res.data);
    } else {
      console.error("Failed to fetch shops:", res.message);
    }
  };

  useEffect(() => {
    getAllCategories();
    fetchShops();
  }, []);

  const filteredShops = useMemo(() => {
    if (!selectedCategory) {
      return shops;
    }
    return shops.filter((shop) => shop.categoryId._id === selectedCategory);
  }, [selectedCategory, shops]);

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className="bg-white ">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">All Shops</h1>
          <p className="text-gray-600 mt-2">
            Browse all available shops and explore their products
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar - Category Filter */}
          <div className="w-64 shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Filter by Category
              </h2>
              <div className="space-y-3">
                {categories.map((category) => (
                  <label
                    key={category._id}
                    className="flex items-center cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategory === category._id}
                      onChange={() => handleCategoryToggle(category._id)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300"
                    />
                    <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                      {category.name}
                    </span>
                  </label>
                ))}
              </div>
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="mt-6 w-full px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Clear Filter
                </button>
              )}
            </div>
          </div>

          {/* Middle Content - Shop Grid */}
          <div className="flex-1 min-w-0">
            {filteredShops.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <p className="text-gray-500 text-lg">
                  No shops found for the selected category.
                </p>
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-600 mb-6">
                  Showing {filteredShops.length} shop
                  {filteredShops.length !== 1 ? "s" : ""}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredShops.map((shop) => (
                    <Link
                      key={shop._id}
                      href={`${shop._id}`}
                      className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="relative h-48 bg-gray-100 overflow-hidden">
                        <Image
                        unoptimized
                          src={shop.shop_banner ? `${BASE_URL}${shop.shop_banner}` : "/placeholder.svg"}
                          alt={shop.name}
                          height={0}
                          width={0}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-gray-500 mb-2">
                          {shop.categoryId.name}
                        </p>
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600">
                          {shop.name}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
