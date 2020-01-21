<template>
  <div class="wrapper">
    <div class="search">
      <i class="iconfont iconicon_search"></i>
      <input type="text" placeholder="搜索本地插件" v-model="keyWords" @keyup="$emit('search', keyWords)" />
      <i class="iconfont iconguanbi" v-show="keyWords" @click="cancle"></i>
    </div>
    <i class="iconfont iconshezhi" @click="$emit('setting')"></i>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      keyWords: ""
    };
  },
  methods: {
    cancle() {
      this.keyWords = "";
      this.$emit("search", "");
    }
  }
});
</script>

<style lang="scss" scoped>
.wrapper {
  $height: 40px;
  height: $height;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 10px;
  .search {
    width: 80%;
    height: $height;
    border-radius: 5px;
    background-color: var(--theme-search-bg);
    display: flex;
    align-items: center;
    justify-content: space-between;
    i {
      cursor: pointer;
      margin: 0 10px;
      &::before {
        color: var(--theme-fontColor-default);
        font-size: 20px;
      }
    }

    input {
      flex: 1;
      height: $height;
      background-color: transparent;
      font-size: 14px;
    }
  }

  & > i {
    width: $height;
    height: $height;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      background-color: var(--theme-hover-color);
      &::before {
        color: var(--theme-settingEnter-hover);
      }
    }
  }
}
</style>
