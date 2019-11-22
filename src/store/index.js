import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    blurMask: false, //  高斯模糊
    listStyle: false, //  列表视图
    enabledExts: [], //  启用列表
    disabledExts: [] //  关闭列表
  },
  mutations: {
    setListStyle: (state, boolean) => (state.listStyle = boolean),
    setEnabledExts: (state, arr) => (state.enabledExts = [...arr]),
    setDisabledExts: (state, arr) => (state.disabledExts = [...arr]),
    setBlur: (state, boolean) => (state.blurMask = boolean)
  },
  actions: {
    setEnabledExts: ({ commit }, arr) => commit("setEnabledExts", arr),
    setDisabledExts: ({ commit }, arr) => commit("setDisabledExts", arr)
  },
  modules: {}
});
