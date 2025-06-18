import { API_ROUTES } from "@/lib/apiRoutes"
import axiosInstance from "@/api/axios.interceptor"
import axios from "axios"

export const fetchAadharList = async () => {
    try {
        const response = await axiosInstance.get(API_ROUTES.AADHAR_LIST);
        return response.data
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

export const deleteData = async (id: string) => {
    try {
        const response = await axiosInstance.delete(API_ROUTES.DELETE_DATA, {
            params: {
                id
            }
        })

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