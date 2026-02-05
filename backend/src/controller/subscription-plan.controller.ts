import { SubscriptionPlanService } from "../services/subscription-plan.service";
import { CreateSubscriptionPlanDTO, UpdateSubscriptionPlanDTO } from "../dtos/subscription-plan.dtos";
import { Request, Response } from "express";
import z from "zod";
import { SubscriptionService } from "../services/subscription.service";

const subPlanService = new SubscriptionPlanService();
const subService = new SubscriptionService()

export class SubscriptionPlanController {
    async createSubscriptionPlan(req: Request, res: Response) {
        try {
            const shopId = req.body.shopId;
            const productId = req.body.productId;
            const subId = req.params.subId;
            if (!shopId) {
                return res.status(400).json(
                    { success: false, message: "Shop Id is Required" }
                );
            }
            const sub = await subService.getSubscriptionById(subId);
            if(!sub){
                return res.status(404).json(
                    { success: false, message: "Subscription Not Found" }
                );
            }
            if(!(sub as any)._id.equals(shopId)){
                return res.status(403).json(
                    { success: false, message: "Forbidden: You don't have access to create plan for this shop" }
                );
            }
            const parsedData = CreateSubscriptionPlanDTO.safeParse(req.body);
            if (!parsedData.success) {
                return res.status(400).json(
                    { success: false, message: z.prettifyError(parsedData.error) }
                );
            }
            const subscriptionPlanData: Partial<CreateSubscriptionPlanDTO> = parsedData.data;
            const newSubscriptionPlan = await subPlanService.createSubscriptionPlan({ ...subscriptionPlanData, shopId, productId });
            return res.status(201).json(
                { success: true, message: "Subscription Plan Created", data: newSubscriptionPlan }
            );
        } catch (error) {
            return res.status(500).json(
                { success: false, message: "Internal Server Error" }
            );
            
        }
    }

    async getSubscriptionPlanById(req: Request, res: Response) {
        try {
            const subscriptionPlanId = req.params.id;
            const subscriptionPlan = await subPlanService.getSubscriptionPlanById(subscriptionPlanId);
            return res.status(200).json(
                { success: true, message: "Subscription Plan Retrieved", data: subscriptionPlan }
            );
        }
        catch (error) {
            return res.status(500).json(
                { success: false, message: "Internal Server Error" }
            );
        }
    }
    async getSubscriptionPlansByShopId(req: Request, res: Response) {
        try {
            const shopId = req.params.shopId;
            const subscriptionPlans = await subPlanService.getSubscriptionPlansByShopId(shopId);
            return res.status(200).json(
                { success: true, message: "Subscription Plans Retrieved", data: subscriptionPlans }
            );
        }
        catch (error) {
            return res.status(500).json(
                { success: false, message: "Internal Server Error" }
            );
        }
    }

    async getActiveSubscriptionPlansByActiveStatus(req: Request, res: Response) {
        try {
            const shopId = req.params.shopId;
            const activeStatus = req.query.active === 'true' ? true : false;
            const subscriptionPlans = await subPlanService.getActiveSubscriptionPlansByActiveStatus(shopId, activeStatus);
            return res.status(200).json(
                { success: true, message: "Active Subscription Plans Retrieved", data: subscriptionPlans }
            );
        }
        catch (error) {
            return res.status(500).json(
                { success: false, message: "Internal Server Error" }
            );
        }
    }

    async updateSubscriptionPlan(req: Request, res: Response) {
        try {
            const shopId = req.body.shopId;
            const subscriptionPlanId = req.params.id;
            if (!shopId) {
                return res.status(400).json(
                    { success: false, message: "Shop Id is Required" }
                );
            }
            const parsedData = UpdateSubscriptionPlanDTO.safeParse(req.body);
            if (!parsedData.success) {
                return res.status(400).json(
                    { success: false, message: z.prettifyError(parsedData.error) }
                );
            }
            const updateData: Partial<UpdateSubscriptionPlanDTO> = parsedData.data;
            const updatedSubscriptionPlan = await subPlanService.updateSubscriptionPlan(subscriptionPlanId, shopId, updateData);
            return res.status(200).json(
                { success: true, message: "Subscription Plan Updated", data: updatedSubscriptionPlan }
            );
        } catch (error) {
            return res.status(500).json(
                { success: false, message: "Internal Server Error" }
            );
        }
    }

    async deleteSubscriptionPlan(req: Request, res: Response) {
        try {
            const subscriptionPlanId = req.params.id;
            await subPlanService.deleteSubscriptionPlan(subscriptionPlanId);
            return res.status(200).json(
                { success: true, message: "Subscription Plan Deleted" }
            );
        }
        catch (error) {
            return res.status(500).json(
                { success: false, message: "Internal Server Error" }
            );
        }
    }
}