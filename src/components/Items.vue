<template>
  <div :class="['item', { disabled: !detail.enabled }, { list: list }]">
    <div class="iconWrapper">
      <img :src="detail.icon" alt :title="detail.name" @click="switchStatus" />
      <div class="devIcon" v-show="detail.installType === 'development'">
        <i class="iconfont iconxiangji"></i>
      </div>
      <!-- 下拉选项 -->
      <div class="dropBtn iconfont iconcaidan" v-show="!list">
        <div class="dropMenu">
          <p>{{ detail.name }}</p>
          <ul>
            <li v-for="(v, i) in menu" :key="i">
              <i :class="['iconfont', v.icon]"></i>
              <span>{{ v.name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 列表视图 -->
    <span v-show="list">{{ detail.name }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        { icon: "", name: "简介" },
        { icon: "", name: "配置" },
        { icon: "", name: "卸载" }
      ]
    };
  },
  props: {
    detail: Object,
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
  cursor: pointer;
  margin: 0 11px 15px 0;
  &:nth-of-type(7n) {
    margin-right: 0;
  }
  .iconWrapper {
    width: 55px;
    height: 55px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    img {
      width: 100%;
    }
    .devIcon {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 20px;
      height: 20px;
      background-color: #f1592b;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        width: 100%;
        height: 100%;
        &::before {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          font-size: 12px;
        }
      }
    }
  }
  .dropBtn {
    display: none;
    position: absolute;
    top: 10px;
    right: 0;
    width: 3px;
    height: 10px;
    cursor: pointer;
    &::before {
      font-size: 12px;
    }
    .dropMenu {
      position: absolute;
      width: 130px;
      height: 120px;
      top: 0;
      left: 0;
      background-color: #fff;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      padding: 0 10px;
      font-size: 14px;
      box-shadow: rgba(#000, 0.05) 0 0 10px 0;
      z-index: 10;
      p {
        width: 100%;
        height: 30px;
        line-height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      ul {
        li {
          height: 30px;
          line-height: 30px;
        }
      }
    }
  }
  &.disabled {
    img {
      filter: grayscale(1);
    }
  }
  &:hover {
    img {
      transition: all 0.2s linear;
      transform: scale(1.05);
    }
    .dropBtn {
      display: block;
    }
    &.disabled img {
      filter: grayscale(0);
    }
  }
  &.list {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0 0 10px;
    &:hover {
      transition: background 0.2s ease;
      background-color: rgba(#1b93fb, 0.05);
    }
    .iconWrapper {
      width: 40px;
      height: 40px;
      padding: 0;
      margin-right: 10px;
      img {
        width: 34px;
      }
      .devIcon {
        transform: translate(20%, 20%);
      }
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
