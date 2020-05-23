import {axiosD, axiosG, axiosJ} from "./request";

export const getRoomApi = (data) => axiosG("meetingRoom", data); // 获得会议室
export const addOrEditRoomApi = (data) => axiosJ("meetingRoom", data); // 创建或修改会议室
export const delRoomApi = (data) => axiosD("meetingRoom", data); // 删除会议室

