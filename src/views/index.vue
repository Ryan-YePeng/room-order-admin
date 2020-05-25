<template>
  <div class="index" ref="index" id="index" v-title data-title="会议室预约小程序后台">
    <el-container style="flex: 1">
      <div style="display: flex;justify-content: space-between;background-color: white">
        <div style="display: flex">
          <h1 style="line-height: 60px;font-size: 23px;margin: 0 15px;min-width: 250px">会议室预约小程序后台</h1>
          <LeftMenu :isCollapse="isCollapse" :isSmall="isSmall"></LeftMenu>
        </div>
        <el-dropdown trigger="click" style="cursor: pointer">
          <div class="avatar-box">
            <el-avatar shape="square" :size="45" :src="user.icon">
              <img src="../assets/notFound.png" alt="头像"/>
            </el-avatar>
            <i class="el-icon-caret-bottom el-icon--right"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="navigateTo('person')"
              >个人中心
              </el-dropdown-item
              >
              <div class="line"></div>
              <el-dropdown-item @click.native="logout"
              >退出登录
              </el-dropdown-item
              >
            </el-dropdown-menu>
          </div>
        </el-dropdown>
      </div>
      <el-header style="height: 50px;" v-show="false"/>
      <div class="tabs">
        <Tag @reload="reloadRouter"></Tag>
      </div>
      <el-main class="top" id="top" style="overflow-x: hidden">
        <transition name="xz-animation">
          <keep-alive v-if="isRouterAlive">
            <router-view></router-view>
          </keep-alive>
        </transition>
        <div class="back-top">
          <el-button
              type="primary"
              icon="el-icon-top"
              circle
              class="to-top"
              @click="backTop"
              v-show="isShowBackTop"
          />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import Tag from "../components/tag/index";
  import LeftMenu from "../components/left_menu/index";
  import Drawer from "../components/drawer/index";

  export default {
    name: "index",
    components: {Tag, LeftMenu, Drawer},
    data() {
      return {
        isRouterAlive: true,
        isCollapse: false,
        isSmall: false,
        isMenuCollapse: false,
        isShowBackTop: false
      };
    },
    mounted() {
      // 监听
      this.initialListener();
      // 获取视窗大小
      this.getWindowWidth();
    },
    computed: {
      active: function () {
        return this.$storeGet.active;
      },
      user() {
        return this.$storeGet.user;
      }
    },
    watch: {
      active() {
        this.isMenuCollapse = false;
      }
    },
    methods: {
      // 获取滚动高度
      getScrollTop(obj) {
        obj.scrollTop >= 100
          ? (this.isShowBackTop = true)
          : (this.isShowBackTop = false);
        this.$storeSet("setScrollTop", obj.scrollTop);
      },
      // 事件监听
      initialListener() {
        const _this = this;
        window.addEventListener("resize", () => {
          this.getWindowWidth();
        });
        document.querySelector(".top").addEventListener("scroll", function () {
          _this.getScrollTop(this);
        });
      },
      // 返回顶部
      backTop(delay = 500) {
        this.$$(".top").animate({scrollTop: 0}, delay);
      },
      // 退出登录
      logout() {
        this.$msgBox("确定注销并退出系统吗？", "确定").then(() => {
          // 清除缓存
          this.$removeLocalStorage("meetingRoomUser");
          this.$removeCookiesStorage("meetingRoomToken");
          this.$removeSessionStorage("meetingRoomLayout");
          this.$router.push({name: "login"});
          location.reload();
        });
      },
      // 移除所有标签
      removeAllTags() {
        // 清空面包屑
        this.$storeSet("setBreadcrumb", null);
        // 清空标签
        this.$storeSet("setTags", null);
        // 改变激活菜单
        this.$storeSet("setActive", "首页");
        this.$router.push({name: "home"});
      },
      // 跳转路由
      navigateTo(path) {
        if (this.$route.path.endsWith("person")) return;
        // 改变面包屑
        this.$storeSet("setBreadcrumb", ["个人中心"]);
        // 添加tags
        this.$storeSet("addTags", {
          title: "个人中心",
          path: "person",
          index: ["个人中心"]
        });
        // 改变当前激活菜单
        this.$storeSet("setActive", "个人中心");
        // 跳转
        this.$router.push({name: path});
      },
      // 获取屏幕宽度
      getWindowWidth() {
        if (window.innerWidth < 1100) {
          this.isSmall = true;
          this.isCollapse = true;
        } else {
          this.isSmall = false;
          this.isMenuCollapse = false;
        }
      },
      // 显示菜单
      showMenu() {
        if (this.isSmall) {
          this.isMenuCollapse = !this.isMenuCollapse;
        } else {
          this.isCollapse = !this.isCollapse;
        }
      },
      // 刷新子路由
      reloadRouter() {
        this.isRouterAlive = false;
        this.$nextTick(() => {
          this.isRouterAlive = true;
        });
      }
    }
  };
</script>

<style lang="scss">
  .index {
    position: relative;
    height: 100%;
    background: #eef0f3;

    .el-avatar > img {
      width: 100%;
    }

    .el-container {
      position: relative;
      height: 100%;
    }

    .el-header {
      position: relative;
      background: #fefefe;
      padding: 0;
    }

    .navbar {
      position: relative;
      line-height: 50px;
      box-shadow: 0 2px 2px rgb(230, 230, 230);
    }

    .menu-button {
      position: relative;
      display: inline-block;
      margin-left: 1rem;
      height: 50px;
      line-height: 50px;
      font-size: 1.5rem;
      color: #686868;
      transition: 0.3s;
      cursor: pointer;
    }

    .breadcrumb {
      position: absolute;
      left: 70px;
      top: 21px;
    }

    .el-icon-s-unfold,
    .el-icon-circle-close {
      transition: 0.3s;
    }

    .el-icon-s-unfold:active {
      color: rgb(19, 180, 255);
    }

    .el-icon-circle-close {
      position: relative;
      margin-left: 0.8rem;
    }

    .el-icon-circle-close:active {
      color: rgb(19, 180, 255);
    }

    .el-dropdown {
      position: absolute;
      top: 2px;
      right: 0;
      width: 60px;
      height: 50px;
    }

    .line {
      position: relative;
      height: 0;
      border: 1px solid #eee;
    }

    .tabs {
      position: relative;
      background: #ffffff;
    }

    .el-icon-caret-bottom {
      position: absolute;
      right: 0;
      bottom: 3px;
    }

    .back-top {
      position: fixed;
      z-index: 1500;
      right: 20px;
      bottom: 100px;
    }

    .xz-animation-enter-active {
      transition: all 0.5s 0.6s;
    }

    .xz-animation-leave-active {
      transition: all 0.5s;
    }

    .xz-animation-enter {
      transform: translateX(-30px);
      opacity: 0;
    }

    .xz-animation-leave-to {
      transform: translateX(30px);
      opacity: 0;
    }
  }
</style>
