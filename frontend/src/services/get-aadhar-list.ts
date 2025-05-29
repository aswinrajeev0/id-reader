import axios from "axios"
const BASE_URL = import.meta.env.VITE_BASE_URL

export const fetchAadharList = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/aadhar-list`);
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
        const response = await axios.delete(`${BASE_URL}/delete-data`, {
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