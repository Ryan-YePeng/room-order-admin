import {axiosG} from "./request";

export const getSignInApi = (data) => axiosG("meetingsSignIn", data); // 签到

