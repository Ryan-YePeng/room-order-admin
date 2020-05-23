import {axiosG, axiosD} from "./request";

export const getFeedbackApi = data => axiosG("feedback", data); // 获取反馈
export const delFeedbackApi = data => axiosD("feedback", data); // 删除反馈
