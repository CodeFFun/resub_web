import { IShop, ShopModel } from "../model/shop.model";

export interface IShopRepository {
    getShopById(id: string): Promise<IShop | null>;
    createShop(shopData: Partial<IShop>): Promise<IShop>;
    getAllShopsOfAUser(userId: string): Promise<IShop[]>;
    updateShop(id: string, userId: string, updateData: Partial<IShop>): Promise<IShop | null>;
    deleteShop(id: string): Promise<boolean>;
}

export class ShopRepository implements IShopRepository {
    async getShopById(id: string): Promise<IShop | null> {
        return await ShopModel.findById(id);
    }
    async createShop(shopData: Partial<IShop>): Promise<IShop> {
        const shop = new ShopModel(shopData);
        return await shop.save();
    }
    async getAllShopsOfAUser(userId: string): Promise<IShop[]> {
        return await ShopModel.find({ userId });
    }
    async updateShop(id: string, userId: string, updateData: Partial<IShop>): Promise<IShop | null> {
        return await ShopModel.findByIdAndUpdate({ _id: id, userId }, updateData, { new: true });
    }
    async deleteShop(id: string): Promise<boolean> {
        return await ShopModel.findByIdAndDelete(id).then(result => result ? true : false);
    }
}