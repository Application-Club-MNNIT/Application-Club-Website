import axios from "axios";

const BASE_URL: string = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

export const backend = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});
