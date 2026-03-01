import {
  createPayment,
  deletePayment,
  getPayment,
  getPaymentByOrderId,
  updatePaymentStatus,
} from "../api/payment";

export const handleCreatePayment = async (payment: any) => {
  try {
    const res = await createPayment(payment);
    if (res.success) {
      return {
        success: true,
        data: res.data,
        message: res.message,
      };
    }
    return {
      success: false,
      data: null,
      message: res.message,
    };
  } catch (error) {
    console.error("Error in handleCreatePayment:", error);
    return {
      success: false,
      data: null,
      message: "An error occurred while creating payment.",
    };
  }
};

export const handleGetPayment = async (paymentId: string) => {
  try {
    const res = await getPayment(paymentId);
    if (res.success) {
      return {
        success: true,
        data: res.data,
        message: res.message,
      };
    }
    return {
      success: false,
      data: null,
      message: res.message,
    };
  } catch (error) {
    console.error("Error in handleGetPayment:", error);
    return {
      success: false,
      data: null,
      message: "An error occurred while fetching payment.",
    };
  }
};

export const handleGetPaymentByOrderId = async (orderId: string) => {
  try {
    const res = await getPaymentByOrderId(orderId);
    if (res.success) {
      return {
        success: true,
        data: res.data,
        message: res.message,
      };
    }
    return {
      success: false,
      data: null,
      message: res.message,
    };
  } catch (error) {
    console.error("Error in handleGetPaymentByOrderId:", error);
    return {
      success: false,
      data: null,
      message: "An error occurred while fetching payment by order ID.",
    };
  }
};

export const handleUpdatePaymentStatus = async (
  paymentId: string,
  updateData: any,
) => {
  try {
    const res = await updatePaymentStatus(paymentId, updateData);
    if (res.success) {
      return {
        success: true,
        data: res.data,
        message: res.message,
      };
    }
    return {
      success: false,
      data: null,
      message: res.message,
    };
  } catch (error) {
    console.error("Error in handleUpdatePaymentStatus:", error);
    return {
      success: false,
      data: null,
      message: "An error occurred while updating payment status.",
    };
  }
};

export const handleDeletePayment = async (paymentId: string) => {
  try {
    const res = await deletePayment(paymentId);
    if (res.success) {
      return {
        success: true,
        data: res.data,
        message: res.message,
      };
    }
    return {
      success: false,
      data: null,
      message: res.message,
    };
  } catch (error) {
    console.error("Error in handleDeletePayment:", error);
    return {
      success: false,
      data: null,
      message: "An error occurred while deleting payment.",
    };
  }
};
