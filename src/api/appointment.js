import {axiosG, axiosP} from "./request";

export const getMeetingApi = data => axiosG("meetings/" + data); // 获取会议审核列表
export const getOldMeetingApi = data => axiosG("meetingsOld", data); // 获取会议历史列表
export const changeMeetingStateApi = data => axiosP("meetingsState", data); // 修改会议状态
export const getStatisticsApi = data => axiosG("statistics", data); // 获取会议统计信息
