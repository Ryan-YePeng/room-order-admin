module.exports = {
  /**
   * @description 后台管理系统菜单
   */
  menu_company: [
    {
      name: "预约管理",
      icon: "appointment",
      path: "appointment",
      component: "appointment",
      hidden: false,
      children: [
        {
          name: "预约列表",
          icon: "",
          path: "appointment_list",
          component: "appointment_list",
          hidden: false,
          children: []
        },
        {
          name: "预约统计",
          icon: "",
          path: "appointment_statistics",
          component: "appointment_statistics",
          hidden: false,
          children: []
        }
      ]
    },
    {
      name: "会议室管理",
      icon: "room",
      path: "room",
      component: "room",
      hidden: false,
      children: []
    },
    {
      name: "用户管理",
      icon: "user_maintain",
      path: "user_maintain",
      component: "user_maintain",
      hidden: false,
      children: [
        {
          name: "普通用户",
          icon: "common_user",
          path: "user",
          component: "user",
          hidden: false,
          children: []
        }
      ]
    },
    {
      name: "反馈管理",
      icon: "feedback",
      path: "feedback",
      component: "feedback",
      hidden: false,
      children: []
    },
    {
      name: "签到详情",
      icon: "sign_in",
      path: "sign_in",
      component: "sign_in",
      hidden: false,
      children: []
    }
  ]
};
