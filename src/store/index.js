import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";

Vue.use(Vuex);

const modulesFiles = require.context("./modules", true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

const plugins = [
  createPersistedState({
    key: "meetingRoomUser",
    storage: window.localStorage,
    reducer: val => ({user: val.user})
  }),
  createPersistedState({
    key: "meetingRoomLayout",
    storage: window.localStorage,
    reducer: val => ({layout: val.layout})
  }),
  createPersistedState({
    key: "meetingRoomToken",
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) =>
        Cookies.set(key, value, {expires: 7, secure: false}),
      removeItem: key => Cookies.remove(key)
    },
    reducer: val => ({token: val.token})
  })
];

const store = new Vuex.Store({
  modules,
  plugins
});

Vue.prototype.$storeGet = store.getters;
Vue.prototype.$storeSet = store.dispatch;

export default store;
