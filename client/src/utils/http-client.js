import axios from "axios";

const httpClient = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
});

httpClient.interceptors.request.use((request) => {
    request.headers['Authorization'] = `Bearer ${window.localStorage.getItem("auth_token")}`;
    return request;
});

export default httpClient;
