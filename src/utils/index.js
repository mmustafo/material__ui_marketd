import axios from "axios";
const baseURL = "http://dummyjson.com"
export const axiosInstance = axios.create({
     baseURL
})