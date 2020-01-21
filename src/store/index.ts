import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nightMode: false, //  夜间模式
    developMode: false, //  开发者模式
    listMode: false //  列表模式
  },
  mutations: {
    setNightMode: (state, b) => (state.nightMode = b),
    setDevMode: (state, b) => (state.developMode = b),
    setListMode: (state, b) => (state.listMode = b)
  },
  actions: {
    setNightMode: ({ commit }, b) => commit("setNightMode", b),
    setDevMode: ({ commit }, b) => commit("setDevMode", b),
    setListMode: ({ commit }, b) => commit("setListMode", b)
  },
  modules: {}
});
