import { axiosInstance } from './axios'; 
import { API } from './endpoints';

export const register = async(registerData: any) => {
    try{
        const response = await axiosInstance.post(API.AUTH.REGISTER, registerData);
        return response.data; 
    }catch(err: Error | any){
       
        throw new Error(
            err.response?.data?.message  
            || err.message 
            || "Registration failed" 
        )
    }
}
export const login = async(loginData: any) => {
    try{
        const response = await axiosInstance.post(API.AUTH.LOGIN, loginData);
        return response.data; 
    }catch(err: Error | any){
       
        throw new Error(
            err.response?.data?.message  
            || err.message 
            || "Login failed" 
        )
    }
}