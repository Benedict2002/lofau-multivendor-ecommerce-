import axios from "axios"

const API_URL ="https://lofau-multivendor-ecommerce.onrender.com"


export const api = axios.create({
    baseURL:API_URL,
    headers:{
        "Content-Type":"application/json"
    }
})
