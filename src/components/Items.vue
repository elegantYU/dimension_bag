<template>
  <div :class="['item', { disabled: !enabled }, { 'list': list }]" @click="switchStatus">
    <img :src="src" alt :title="title" />
    <!-- 列表视图 -->
    <span v-show="list">{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: {
    src: String,
    title: String,
    enabled: Boolean,
    list: Boolean
  },
  methods: {
    switchStatus() {
      this.$emit("switch");
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  width: 55px;
  height: 55px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  cursor: pointer;
  margin: 0 11px 15px 0;
  &:nth-of-type(7n) {
    margin-right: 0;
  }
  img {
    width: 100%;
  }
  &.disabled {
    img {
      filter: grayscale(1);
    }
  }
  &:hover {
    img {
      transition: all 0.2 linear;
      transform: scale(1.05);
    }
    &.disabled img {
      filter: grayscale(0);
    }
  }
  &.list {
    width: 100%;
    height: 40px;
    justify-content: flex-start;
    margin: 0 0 10px;
    padding: 10px 0;
    &:hover {
      background-color: rgba(#1b93fb, 0.05);
    }
    img {
      width: 34px;
      margin-right: 10px;
    }
    span {
      width: 360px;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 16px;
      color: rgb(46, 48, 49);
    }
  }
}
</style>
