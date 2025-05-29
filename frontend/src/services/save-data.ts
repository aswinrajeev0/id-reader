import type { AadharData } from "@/types/aadhar-data.type";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL

export const saveData = async (data: AadharData) => {
    try {
        const response = await axios.post(`${BASE_URL}/save-data`, {data});
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