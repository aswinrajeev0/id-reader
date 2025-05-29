import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL

export const getImageData = async (frontImage: string | null, backImage: string | null) => {
    try {
        const response = await axios.post(`${BASE_URL}/parse-aadhaar`, {
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