import axios, { AxiosHeaders, AxiosRequestConfig } from "axios";
import { ACCESS_TOKEN, DOMAIN, setting } from "../utils/setting";

// Khai báo một interface để đại diện cho mỗi item trong hàng đợi gọi lại
interface RetryQueueItem {
    resolve: (value?: any) => void;
    reject: (error?: any) => void;
    config: AxiosRequestConfig;
}

// Tạo một mảng để lưu trữ các request trong hàng đợi gọi lại

// Biến đánh dấu để ngăn không gửi nhiều yêu cầu làm mới token cùng một lúc
let isRefreshing = false;

export const api = axios.create({
    baseURL: DOMAIN,
    timeout: 10000,
})

api.interceptors.request.use((config) => {
    (config.headers as AxiosHeaders).set(ACCESS_TOKEN, "Bearer " + setting.getStore(ACCESS_TOKEN))
    return config;
}, (error) => {
    // Xử lý lỗi khi gửi request
    return Promise.reject(error);
});

api.interceptors.response.use((response) => {
    // Xử lý response bình thường

    return response;
}, async (error) => {
    const originalRequest: AxiosRequestConfig = error.config;
    if (error.response && error.response.status === 401) {
        try {
            // Làm mới token
            const newAccessToken: {
                access_token: string,
                refresh_token: string
            } = await refreshAccessToken();

            // Cập nhật header của request gốc với token mới
            // error.config.headers[ACCESS_TOKEN] = `Bearer ${newAccessToken.access_token}`;
            if (originalRequest?.headers) {
                originalRequest.headers[ACCESS_TOKEN] = `Bearer ${newAccessToken.access_token}`;

                setting.setStorage("access_token", newAccessToken.access_token)
            }
            // Gọi lại request gốc
            return api(originalRequest);
        } catch (refreshError) {
            // Xử lý lỗi khi làm mới token
            // Bạn có thể xóa tất cả dữ liệu lưu trữ và chuyển hướng người dùng đến trang đăng nhập
            throw refreshError;
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
    const result = await api.post('refresh-token', { refresh_token: setting.getStore('refresh_token') })

    return {
        access_token: result.data.access_token,
        refresh_token: result.data.refresh_token
    }
}
