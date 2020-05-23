module.exports = {
  /**
   * @description 后台管理系统菜单
   */
  menu_admin: [
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
        },
        {
          name: "企业用户",
          icon: "enterprise",
          path: "enterprise",
          component: "enterprise",
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
    }
  ]
};
