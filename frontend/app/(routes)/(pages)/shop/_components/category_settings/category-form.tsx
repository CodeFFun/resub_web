"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CategoryList, { type Category } from "./category-list";
import { handleGetAllShopsOfAUser } from "@/lib/actions/shop-action";
import {
  handleCreateProductCategory,
  handleDeleteProductCategory,
  handleGetAllProductCategories,
  handleupdateProductCategory,
} from "@/lib/actions/product-category-action";
import { toast } from "sonner";
// import { handleGetAllProductCategoriesOfAShop } from '@/lib/actions/product-category-action'

export default function CategoryForm() {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [shops, setShops] = useState<{ _id: string; name: string }[]>([]);
  const [filterShop, setFilterShop] = useState<string[]>([]);
  const [editCategory, setEditCategory] = useState({
    id: "",
    name: "",
    description: "",
  });

  const fetchShops = async () => {
    const res = await handleGetAllShopsOfAUser();
    console.log(res);
    if (res.success) {
      setShops(res.data);
    }
  };
  const fetchProductCategories = async () => {
    const res = await handleGetAllProductCategories();
    console.log(res);
    if (res.success) {
      setCategories(res.data);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchShops();
  }, []);

  useEffect(() => {
    fetchProductCategories();
  }, []);


  if (!mounted) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isUpdate) {
      const formData = {
        name: editCategory.name,
        description: editCategory.description,
      };
      const res = await handleupdateProductCategory(editCategory.id, formData);
      // const res = await Promise.all(filterShop.map(shopId => handleupdateProductCategory(editCategory.id, { ...formData, shopId })));
      if(res.success) {
        toast.success("Category updated successfully");
      }
      setIsUpdate(false);
      setEditCategory({ id: "", name: "", description: "" });
      setFilterShop([]);
      fetchProductCategories();
    } else {
      if (!name || !description) {
        alert("Please fill in all fields");
        return;
      }
      
      // Add new category
      const formData = {
        name,
        description,
      };
      // const res = await handleCreateProductCategory(formData);
      const res = await Promise.all(filterShop.map(shopId => handleCreateProductCategory({ ...formData, shopId })));
      if(res.every(r => r.success)) {
        toast.success("Category created successfully");
      } else {        
        toast.error("Failed to create category");
      }
      setName("");
      setDescription("");
      setFilterShop([]);
      fetchProductCategories();
    }
  };

  const handleEditCategory = (id: string) => {
    setIsUpdate(true);
    const category = categories.find((c) => c._id === id);
    if (category) {
      setEditCategory({
        id: category._id,
        name: category.name,
        description: category.description,
      });
    }
  };

  const handleDeleteCategory = async (id: string) => {
    const res = await handleDeleteProductCategory(id);
    if (res.success) {
      toast.success("Category deleted successfully");
      fetchProductCategories();
    } else {
      toast.error("Failed to delete category");
    }
  };

  const handleCancel = () => {
    setIsUpdate(false);
    setEditCategory({ id: "", name: "", description: ""});
    setName("");
    setDescription("");
    setFilterShop([]);
  }

  const handleShopFilter = (shopId: string) => {
    // setFilterShop((prev) => (prev === shopId ? null : shopId));
    setFilterShop((prev) => (prev.includes(shopId) ? prev.filter(id => id !== shopId) : [...prev, shopId]) );
  };

  return (
    <div className="mx-auto px-4 py-8 w-full">
      <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
        <div className="mb-8">
          <div className="bg-gray-100 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              Category Information
            </h2>
            <p className="text-sm text-gray-600">
              Create and manage product categories
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g., Electronics"
                value={isUpdate ? editCategory.name : name}
                onChange={(e) =>
                  isUpdate
                    ? setEditCategory({ ...editCategory, name: e.target.value })
                    : setName(e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <Label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Describe the category"
              value={isUpdate ? editCategory.description : description}
              onChange={(e) =>
                isUpdate
                  ? setEditCategory({
                      ...editCategory,
                      description: e.target.value,
                    })
                  : setDescription(e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className={`mb-6 ${isUpdate ? "hidden" : ""}`}>
            <div className="grid grid-cols-4 gap-6">
              {shops.map((shop) => (
                <div key={shop._id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`filter-shop-${shop._id}`}
                    checked={filterShop.includes(shop._id)}
                    onChange={() => handleShopFilter(shop._id)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 cursor-pointer"
                  />
                  <label
                    htmlFor={`filter-shop-${shop._id}`}
                    className="ml-3 text-sm text-gray-700 cursor-pointer"
                  >
                    {shop.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 flex gap-4">
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              {isUpdate ? "Update Category" : "Add Category"}
            </Button>
            {isUpdate && (
              <Button
                type="button"
                onClick={handleCancel}
                className="bg-gray-300 hover:bg-gray-400 text-gray-900 font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>

      <CategoryList
        shops={shops}
        categories={categories}
        onDelete={handleDeleteCategory}
        onEdit={handleEditCategory}
      />
    </div>
  );
}

