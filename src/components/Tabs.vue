<template>
  <div class="tab">
    <div v-for="v in tabs" :key="v.title" class="items">
      <router-link :to="{ name: v.to }" replace active-class="active">{{v.title}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { title: "首页", to: "home" },
        { title: "推荐", to: "setting" },
        { title: "设置", to: "setting" }
      ]
    };
  },
  methdos: {
    changeRouter() {}
  }
};
</script>

<style lang="scss" scoped>
.tab {
  width: 100%;
  height: 40px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(#000, 0.15);
  .items {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    cursor: pointer;
    a {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      color: #333;
      &.active {
        color: #1b93fb;
      }
    }
  }
}
</style>
