import { axiosJ, axiosU} from "./request";

export const login = data => axiosJ("backLogin", data); // 登陆
export const updateInfoApi = data => axiosU("backUserinfo", data); // 修改用户信息
export const resetApi = data => axiosU("reset", data); // 修改密码
