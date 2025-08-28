import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.31.113:3000/api",   // 根据你的后端接口前缀
    timeout: 5000
});

// 请求拦截器
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// 响应拦截器
api.interceptors.response.use(
    response => response.data,   // 直接返回 data
    error => Promise.reject(error)
);

export default api;
