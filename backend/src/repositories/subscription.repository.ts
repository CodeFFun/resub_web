import { ISubscription, SubscriptionModel } from "../model/subscription.model";

export interface ISubscriptionRepository {
    createSubscription(subscriptionData: Partial<ISubscription>): Promise<ISubscription>;
    getSubscriptionById(id: string): Promise<ISubscription | null>;
    getAllSubscriptions(): Promise<ISubscription[]>;
    getSubscriptionsByUserId(userId: string): Promise<ISubscription[]>;
    getSubscriptionsByStatus(status: string): Promise<ISubscription[]>;
    updateSubscription(id: string, updateData: Partial<ISubscription>): Promise<ISubscription | null>;
    deleteSubscription(id: string): Promise<boolean>;
}

export class SubscriptionRepository implements ISubscriptionRepository {
    async createSubscription(subscriptionData: Partial<ISubscription>): Promise<ISubscription> {
        const subscription = new SubscriptionModel(subscriptionData);
        return await subscription.save();
    }

    async getSubscriptionById(id: string): Promise<ISubscription | null> {
        const subscription = await SubscriptionModel.findById(id);
        return subscription;
    }

    async getAllSubscriptions(): Promise<ISubscription[]> {
        const subscriptions = await SubscriptionModel.find();
        return subscriptions;
    }

    async getSubscriptionsByUserId(userId: string): Promise<ISubscription[]> {
        const subscriptions = await SubscriptionModel.find({ userId: userId });
        return subscriptions;
    }

    async getSubscriptionsByStatus(status: string): Promise<ISubscription[]> {
        const subscriptions = await SubscriptionModel.find({ status: status });
        return subscriptions;
    }

    async updateSubscription(id: string, updateData: Partial<ISubscription>): Promise<ISubscription | null> {
        const updatedSubscription = await SubscriptionModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );
        return updatedSubscription;
    }

    async deleteSubscription(id: string): Promise<boolean> {
        const result = await SubscriptionModel.findByIdAndDelete(id);
        return result ? true : false;
    }
}
