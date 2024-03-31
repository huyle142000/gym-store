import axios, { AxiosHeaders, AxiosRequestConfig } from "axios";
import { ACCESS_TOKEN, DOMAIN, setting } from "../utils/setting";

let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;

let arrFailedApi: AxiosRequestConfig<any>[] = [];

// Hàm gọi lại các API đã lưu trong arrFailedApi
async function retryFailedRequests() {
    // Lưu lại các request đang thực hiện gọi lại để tránh lặp vô tận
    const retryingRequests = [...arrFailedApi];
    arrFailedApi = []; // Đặt lại arrFailedApi

    // Thực hiện gọi lại từng request
    await Promise.all(retryingRequests.map(async (config) => {
        try {
            const response = await api(config);
            // Xử lý response nếu cần
            console.log("Retry success:", response);
        } catch (error) {
            // Xử lý lỗi nếu cần
            console.error("Retry failed:", error);
        }
    }));
}

// Khởi tạo instance axios
export const api = axios.create({
    baseURL: DOMAIN,
    timeout: 10000,
});

// Interceptors cho request
api.interceptors.request.use((config) => {
    (config.headers as AxiosHeaders).set(ACCESS_TOKEN, "Bearer " + setting.getStore(ACCESS_TOKEN));
    return config;
}, (error) => {
    // Xử lý lỗi khi gửi request
    return Promise.reject(error);
});

// Interceptors cho response
api.interceptors.response.use((response) => {
    // Xử lý response bình thường
    return response;
}, async (error) => {
    const originalRequest: AxiosRequestConfig = error.config;
    if (error.response && error.response.status === 401) {
        arrFailedApi.push(originalRequest);

        if (!isRefreshing) {
            isRefreshing = true;
            try {
                // Làm mới token
                const newAccessToken: {
                    access_token: string,
                    refresh_token: string
                } = await refreshAccessToken();
                // Cập nhật header của request gốc với token mới
                if (originalRequest?.headers) {
                    originalRequest.headers[ACCESS_TOKEN] = `Bearer ${newAccessToken.access_token}`;
                    setting.setStorage("access_token", newAccessToken.access_token);
                }
                // Sau khi làm mới token, gọi lại các request đang chờ trong arrFailedApi (nếu có)
                await retryFailedRequests();
                isRefreshing = false;
            } catch (refreshError) {
                // Xử lý lỗi khi làm mới token
                // Bạn có thể xóa tất cả dữ liệu lưu trữ và chuyển hướng người dùng đến trang đăng nhập
                isRefreshing = false;
                throw refreshError;
            }
        } else {
            // Nếu đang thực hiện làm mới token, thêm request vào arrFailedApi để gọi lại sau khi token đã được làm mới
        }
    }
    // Trả về một Promise rejection nếu mã trạng thái không phải là 401
    return Promise.reject(error);
});

// Hàm làm mới token
async function refreshAccessToken(): Promise<{
    access_token: string,
    refresh_token: string
}> {
    // Thực hiện gọi API để làm mới token và trả về token mới
    const result = await api.post('refresh-token', { refresh_token: setting.getStore('refresh_token') });
    return {
        access_token: result.data.access_token,
        refresh_token: result.data.refresh_token
    };
}
