import dotenv from "dotenv";
dotenv.config();
export const PORT = process.env.PORT || 8080;
export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/resub_db";
export const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// eSewa Payment Gateway Configuration
export const ESEWA_MERCHANT_ID = process.env.ESEWA_MERCHANT_ID || "EPAYTEST";
export const ESEWA_SECRET_KEY = process.env.ESEWA_SECRET_KEY || "8gBm/:&EnhH.1/q";
export const ESEWA_SUCCESS_URL = process.env.ESEWA_SUCCESS_URL || "http://localhost:8080/payment/esewa/success";
export const ESEWA_FAILURE_URL = process.env.ESEWA_FAILURE_URL || "http://localhost:8080/payment/esewa/failure";
export const ESEWA_PAYMENT_URL = process.env.ESEWA_PAYMENT_URL || "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
export const ESEWA_VERIFY_URL = process.env.ESEWA_VERIFY_URL || "https://rc-epay.esewa.com.np/api/epay/main/v2/form";