import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:"https://localhost:3001/api",
    withCredentials:true,
});