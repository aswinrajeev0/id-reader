import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || "Something went wrong!";
            console.error("Axios Error:", message);
            return Promise.reject(new Error(message));
        } else {
            console.error("Unexpected Error:", error);
            return Promise.reject(new Error("An unexpected error occurred."));
        }
    }
);

export default axiosInstance;