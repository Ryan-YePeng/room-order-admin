import {axiosD, axiosF, axiosG, axiosM} from "./request";

// 普通用户管理
export const getUserApi = (data) => axiosG("userManage", data);
export const delUserApi = (data) => axiosD("userManage", data);

// 企业用户管理
export const getCompanyApi = (data) => axiosG("companyInfo", data);
export const delCompanyApi = (data) => axiosD("companyInfo", data);
