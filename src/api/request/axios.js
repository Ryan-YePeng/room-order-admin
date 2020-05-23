import axios from "axios";
import {errorMessage, successMsg, errorMsg, msgBox} from "@/utils/EUI";
import {isEmpty} from "@/utils/common";
import router from "@/router";
import store from "@/store";

let errorStatus = null;

const service = axios.create({
  timeout: 120000,
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true
});

// 请求拦截
service.interceptors.request.use(
  config => {
    let token = store.getters.token;
    let url = config.url;
    if (isAddToken(url))
      config.headers.Authorization = token;
    return config;
  },
  error => {
    errorMessage("请求错误！");
    return Promise.reject(error);
  }
);

// 响应拦截
service.interceptors.response.use(
  response => {
    const {message, code} = response.data;
    if (!isEmpty(message) && code === 200 && typeof message == "string") {
      if (message !== "请求成功") {
        successMsg(message);
      }
    }
    if (!isEmpty(message) && code !== 200 && typeof message == "string") {
      errorMsg(message);
    }
    return response.data;
  },
  error => {
    if (error.toString().includes("timeout")) {
      errorMessage("请求超时！");
      return Promise.reject(error);
    }
    if (
      error.hasOwnProperty("message") &&
      error.message === "Request Interruption"
    ) {
      return Promise.reject(error);
    }
    if (
      error.response.hasOwnProperty("statusText") &&
      error.response.statusText === "Internal Server Error"
    ) {
      errorMessage("无法连接到服务器！");
      return Promise.reject(error);
    }
    const {message} = error.response.data;
    const {status} = error.response;
    if (status === 401) {
      if (errorStatus === status) return;
      errorStatus = status;
      msgBox("登录状态已过期，您可以继续留在该页面，或者重新登录", "重新登录", "系统提示")
        .then(() => router.push({name: "login"}))
        .catch(() => (errorStatus = null))
    } else if (status === 403) {
      if (errorStatus === status) return;
      errorStatus = status;
      msgBox("登录状态已过期，您可以继续留在该页面，或者重新登录", "重新登录", "系统提示")
        .then(() => router.push({name: "login"}))
        .catch(() => (errorStatus = null))
    } else {
      if (!isEmpty(message)) errorMsg(message);
    }
    return Promise.reject(error);
  }
);

/**
 * @description 白名单，不添加token的接口
 * */
const isAddToken = url =>
  ["backLogin"].every(item => url !== item);

export default service;
