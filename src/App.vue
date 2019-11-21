<template>
  <div id="app">
    <!-- <Tabs></Tabs> -->
    <router-view />
  </div>
</template>

<script>
// import Tabs from "./components/Tabs.vue";

export default {
  components: {
    // Tabs
  }
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #fff;
  width: 495px;
  height: 545px;
  box-shadow: rgba(#000, 0.25) 0 0 20px 0;
  margin: 0 auto;
  overflow: hidden;
}
</style>
