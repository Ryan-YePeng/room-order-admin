import {axiosF} from "./request";

export const uploadFileApi = (data) => axiosF("file", data); // 上传文件
