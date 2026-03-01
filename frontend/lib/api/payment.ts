import { getAuthToken } from "../cookie";
import { axiosInstance } from "./axios";
import { API } from "./endpoints";

export const createPayment = async (payment: any) => {
  try {
    const token = await getAuthToken();
    const response = await axiosInstance.post(API.AUTH.PAYMENT, payment, {
      headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
};

export const getPayment = async (paymentId: string) => {
  try {
    const token = await getAuthToken();
    const response = await axiosInstance.get(`${API.AUTH.PAYMENT}/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
  }
    catch (error) {
    console.error("Error fetching payment:", error);
    throw error;
  }
};

export const getPaymentByOrderId = async (orderId: string) => {
  try {
    const token = await getAuthToken();
    const response = await axiosInstance.get(`${API.AUTH.PAYMENT}/order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching payment by order ID:", error);
    throw error;
  }
};

export const updatePaymentStatus = async (paymentId: string, updateData: any) => {
  try {
    const token = await getAuthToken();
    const response = await axiosInstance.patch(`${API.AUTH.PAYMENT}/${paymentId}/status`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating payment status:", error);
    throw error;
  }
};

export const deletePayment = async (paymentId: string) => {
  try {
    const token = await getAuthToken();
    const response = await axiosInstance.delete(`${API.AUTH.PAYMENT}/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting payment:", error);
    throw error;
  }
};