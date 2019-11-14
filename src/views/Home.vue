<template>
  <div class="home">
    <!-- header -->
    <div class="header">
      <div class="search">
        <i class="iconfont iconicon_search"></i>
        <input type="text" placeholder="搜索插件" />
      </div>
      <div class="searchBtn">搜索</div>
      <i
        :class="['changeListBtn', 'iconfont', viewList ? 'iconviewlist' : 'iconviewgallery']"
        @click="switchListView"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      viewList: false
    };
  },
  methods: {
    switchListView() {
      this.viewList = !this.viewList;
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px 20px;
  .header {
    $headerHeight: 40px;
    height: $headerHeight;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .search {
      width: 70%;
      height: 100%;
      border-radius: 5px;
      background-color: rgb(242, 242, 242);
      display: flex;
      align-items: center;
      justify-content: space-between;
      i {
        width: $headerHeight;
        height: $headerHeight;
      }
      input {
        flex: 1;
        height: 100%;
        background-color: transparent;
        font-size: 14px;
      }
    }
    .searchBtn {
      width: 18%;
      height: 100%;
      border-radius: 5px;
      background-color: rgb(242, 242, 242);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .changeListBtn {
      width: $headerHeight;
      height: $headerHeight;
      background-color: rgb(242, 242, 242);
      border-radius: 50%;
      cursor: pointer;
      &::before {
        transition: all 0.2s ease;
      }
      &:active::before {
        transform: scale(0.9);
      }
    }
  }
}
</style>
