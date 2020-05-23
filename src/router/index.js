import router from "./routers";
import store from "../store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import {isEmpty} from "../utils/common";
import {menu_admin} from "./menu_admin";
import {menu_company} from "./menu_company";

// 关闭头顶蓝色进度条自动递增行为。(默认值是true)
NProgress.configure({showSpinner: false});


const layout = {
  path: "/index",
  component: () => import("../views/index"),
  children: [
    {path: "/home", name: "home", component: () => import("../views/home")},
    {path: "/person", name: "person", component: () => import("../views/person")}
  ]
};

//动态添加路由
function generateRouter(menu) {
  let list = layout.children;
  menu.forEach(fistItem => {
    //一级菜单
    let firstObj = {};
    firstObj.path = `/${fistItem.path}`;
    firstObj.name = fistItem.path;
    firstObj.component = () => {
      return import(`@/views${firstObj.path}/index`);
    };
    //二级菜单
    if (fistItem.children && fistItem.children.length !== 0) {
      fistItem.children.forEach(secondItem => {
        let secondObj = {};
        secondObj.path = `/${fistItem.path}/${secondItem.path}`;
        secondObj.name = secondItem.path;
        secondObj.component = () => {
          return import(`@/views${secondObj.path}/index`);
        };
        //三级菜单
        if (secondItem.children && secondItem.children.length !== 0) {
          secondItem.children.forEach(thirdItem => {
            let thirdObj = {};
            thirdObj.path = `/${fistItem.path}/${secondItem.path}/${thirdItem.path}`;
            thirdObj.name = thirdItem.path;
            thirdObj.component = () => {
              return import(`@/views${thirdObj.path}/index`);
            };
            //三级菜单
            list.push(thirdObj);
          });
        } else {
          //二级菜单
          list.push(secondObj);
        }
      });
    } else {
      //一级菜单
      list.push(firstObj);
    }
  });
}

export function getRouter() {
  return new Promise(resolve => {
    window.setTimeout(() => {
      let menu;
      if (store.getters.user.role === "ROLE_SUPER") {
        menu = menu_admin
      } else {
        menu = menu_company
      }
      store.dispatch("setMenu", menu);
      generateRouter(menu);
      router.addRoutes([layout]);
      router.addRoutes([
        {
          path: "*",
          redirect: "/404"
        }
      ]);
      router.addRoutes([
        {
          path: "",
          redirect: "/home"
        }
      ]);
      resolve();
    }, 100);
  });
}

//添加路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  let isLogin = !isEmpty(store.getters.token);
  if (to.path === "/") {
    isLogin ? next("/home") : next("/login");
    return;
  }
  if (to.path === "/login") {
    next();
  } else {
    if (isLogin) {
      if (layout.children.length === 2) {
        getRouter();
        next();
      } else {
        next();
      }
    } else {
      next("/login");
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
