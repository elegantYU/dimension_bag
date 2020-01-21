<template>
  <div id="app" :class="$store.state.nightMode ? 'night' : 'light'">
    <transition name="scale">
      <router-view @updateMode="initState" />
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { syncGet } from "./services/storage";

export default Vue.extend({
  mounted() {
    console.log("[created]");
    this.initState();
  },
  methods: {
    initState() {
      const ModeList: Promise<any>[] = [
        "nightMode",
        "listMode",
        "developMode"
      ].map((v: string) => syncGet(v));

      Promise.all(ModeList).then((data: Array<{ [index: string]: any }>) => {
        console.log("[初始化状态...]", data);
        this.$store.dispatch("setNightMode", data[0].nightMode);
        this.$store.dispatch("setListMode", data[1].listMode);
        this.$store.dispatch("setDevMode", data[2].developMode);
        console.log("所有状态", this.$store.state);
      });
    }
  }
});
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: var(--theme-background-default);
  width: 495px;
  height: 545px;
  overflow: hidden;
  margin: 0 auto;
  color: var(--theme-fontColor-default);
}
.scale-enter,
.scale-leave-to {
  transform: scale(0.8);
}
.scale-ente-active,
.scale-leave-active {
  transition: all 0.2s;
}
</style>
