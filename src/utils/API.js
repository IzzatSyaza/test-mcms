import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:30001", 
    withCredentials: true,
    credentials: "include"
})