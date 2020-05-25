import {axiosD, axiosG, axiosJ, axiosU} from "./request";

// 普通用户管理
export const getUserApi = (data) => axiosG("userManage", data);
export const editUserApi = (data) => axiosU("userManage", data);
export const delUserApi = (data) => axiosD("userManage", data);

// 企业用户管理
export const getCompanyApi = (data) => axiosG("companyInfo", data);
export const addOrEditCompanyApi = (data) => axiosJ("companyInfo", data);
export const delCompanyApi = (data) => axiosD("companyInfo", data);
