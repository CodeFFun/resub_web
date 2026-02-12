"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { handleDeleteProduct, handleGetProductsByShopId } from "@/lib/actions/product-action";
import { handleGetAllShopsOfAUser } from "@/lib/actions/shop-action";
import { MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { ProductEditForm } from "./product-edit-form";
import { toast } from "sonner";

export interface Product {
  _id: string;
  name: string;
  base_price: number;
  stock_quantity: number;
  discount: number;
  description: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [shops, setShops] = useState<{ _id: string; name: string }[]>([]);
  const [selectedShops, setSelectedShops] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);

  const fetchShops = async () => {
    const res = await handleGetAllShopsOfAUser();
    if (res.success) {
      setShops(res.data);
    }
  };
  const fetchProducts = async () => {
    const res = await handleGetProductsByShopId(selectedShops as string);
    if (res.success) {
      setProducts(res.data);
      setCategories(res.data[0].categoryId)
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  useEffect(() => {
    if (!selectedShops) {
      setProducts([]);
      return;
    }

    fetchProducts();
  }, [selectedShops]);

  const handleShopToggle = (shopId: string) => {
    setSelectedShops((prev) => (prev === shopId ? null : shopId));
  };

  const onEdit = (productId: string) => {
    const prod = products.find((s) => s._id === productId);
    if (prod) {
      setSelectedProduct(prod);
      setEditDialogOpen(true);
    }
  };
  const onDelete =async  (productId: string) => {
    const res = await handleDeleteProduct(productId)
    if(res.success){
        toast.success("Product deleted successfully")
        fetchProducts()
    } else {
        toast.error("Failed to delete product")
    }
  };

  return (
    <div className="w-full">
      {editDialogOpen ? (
        <ProductEditForm
          categories={categories}
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          selectedProduct={selectedProduct}
        />
      ) : (
        <div className="mt-12 px-10 w-full">
          <div className="mb-8">
            <Label className="block text-sm font-medium text-gray-700 mb-4">
              Select Shops
            </Label>
            <div className="grid grid-cols-4 gap-6">
              {shops.map((shop) => (
                <div key={shop._id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`shop-${shop._id}`}
                    checked={selectedShops === shop._id}
                    onChange={() => handleShopToggle(shop._id)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 cursor-pointer"
                  />
                  <label
                    htmlFor={`shop-${shop._id}`}
                    className="ml-3 text-sm text-gray-700 cursor-pointer"
                  >
                    {shop.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Your Products
          </h2>

          <div className="grid grid-cols-6 gap-8 px-4 py-3 bg-gray-50 border border-gray-200 rounded-t-lg font-semibold text-gray-700 text-sm">
            <div>Product Name</div>
            <div>Product Description</div>
            <div>Base Price</div>
            <div>Stock Quantity</div>
            <div>Discount Price</div>
            <div className="text-right">Actions</div>
          </div>

          <div className="border-b border-l border-r border-gray-200 divide-y divide-gray-200">
            {products.map((product) => (
              <div
                key={product._id}
                className="grid grid-cols-6 gap-8 px-4 py-4 items-center hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {product.description?.split(" ").slice(0, 10).join(" ")}
                    {product.description?.split(" ").length > 10 && "..."}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">
                    ${product.base_price.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    {product.stock_quantity}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-green-600">{product.discount}</p>
                </div>

                {/* Three Dot Menu */}
                <div className="flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(product._id)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(product._id)}
                        className="text-red-600"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
