import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// axiosClient.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     ({ response }) => {
//         if (response.status === 401) {
//             localStorage.removeItem("accessToken");
//         }
//     }
// );

export default axiosClient;
