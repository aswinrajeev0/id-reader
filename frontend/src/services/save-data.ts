import axiosInstance from "@/api/axios.interceptor";
import { API_ROUTES } from "@/lib/apiRoutes";
import type { AadharData } from "@/types/aadhar-data.type";
import axios from "axios";

export const saveData = async (data: AadharData) => {
    try {
        const response = await axiosInstance.post(API_ROUTES.SAVE_DATA, {data});
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || "Failed to parse data.";
            console.error(message)
            throw new Error(message);
        } else {
            throw new Error("An unexpected error occurred.");
        }
    }
}