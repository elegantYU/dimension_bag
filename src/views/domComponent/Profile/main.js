/*
 * @Author: elegantYU
 * @Date: 2019-11-24 15:25:23
 * @Last Modified by: elegantYU
 * @Last Modified time: 2019-11-24 23:26:04
 */
// 插件简介组件
import Vue from "vue";
import App from "./app.vue";
import store from "../../../store/index";

export default () => {
  const dom = document.createElement("div");
  dom.id = "profile";
  document.getElementById("app").appendChild(dom);

  new Vue({
    el: "#profile",
    store,
    render: h => h(App)
  });
};
