"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { handleGetAllShops } from "@/lib/actions/shop-action";
import { BASE_URL } from "@/lib/api/axios";
import Link from "next/link";

type SUBSCRIPTION_SHOP = {
  _id: string;
  categoryId: {
    _id: string;
    name: string;
  };
  shop_banner: string;
  name: string;
  accepts_subscription: boolean;
};

export default function DiscountSection() {
  const [subscriptionShops, setSubscriptionShops] = useState<
    SUBSCRIPTION_SHOP[]
  >([]);
  const fetchShops = async () => {
    const res = await handleGetAllShops();
    const filteredShops = res.data.filter(
      (shop: SUBSCRIPTION_SHOP) => shop.accepts_subscription === true,
    );
    setSubscriptionShops(filteredShops);
    console.log("Subscription Shops:", filteredShops);
  };

  useEffect(() => {
    fetchShops();
  }, []);

  return (
    <section className="w-full bg-white py-8">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Automatic Restock
            </h2>
            <p className="text-orange-500 font-semibold">
              Shops that automatically restock your favorite products
            </p>
          </div>
          <Button
            variant="outline"
            className="border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent"
          >
            SHOP ALL PRODUCTS
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {subscriptionShops.map((product) => (
            <div  className="flex flex-col" key={product._id}>
            <Link
              href={`/customer/shop/${product._id}`}
              className="group cursor-pointer"
            >
                <div className="bg-gray-100 rounded-lg p-4 mb-4 h-48 relative shrink-0">
                  <Image
                    src={BASE_URL + product.shop_banner}
                    unoptimized
                    alt={product.name}
                    height={0}
                    width={0}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <p className="text-xs text-gray-500 mb-1">
                  {product.categoryId?.name}
                </p>
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-3 grow">
                  {product.name}
                </h3>
            </Link>
              </div>
          ))}
        </div>
      </div>
    </section>
  );
}
