import axiosInstance from "@/api/axios.interceptor";
import { API_ROUTES } from "@/lib/apiRoutes";
import axios from "axios"

export const getImageData = async (frontImage: string | null, backImage: string | null) => {
    try {
        const response = await axiosInstance.post(API_ROUTES.PARSE_AADHAR, {
            frontImage,
            backImage
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