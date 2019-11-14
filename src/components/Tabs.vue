<template>
  <div class="tab">
    <div v-for="v in tabs" :key="v.title" :class="[{'active': v.active}, 'items']">
      <span>{{ v.title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { title: "首页", active: true },
        { title: "设置", active: false }
      ]
    };
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
  }
}
</style>
