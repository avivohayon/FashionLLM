import axios from "axios";

const BASE_URL = 'http://localhost:8123'

export default axios.create({
    baseURL: BASE_URL
});

// we will attach interceptor to this axiosPrivate to send and receive the jwt access tokens and retry to refresh the tokens
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
});
