<template>
  <div :class="['item', { disabled: !detail.enabled }, { list: list }]">
    <div class="iconWrapper">
      <img
        :src="detail.icon"
        alt
        :title="detail.shortName"
        @click="switchStatus"
      />
      <!-- 类型icon -->
      <div class="devIcon" v-if="detail.installType === 'development'">
        <i class="iconfont iconother"></i>
      </div>
      <div class="devIcon app" v-else-if="detail.isApp">
        <i class="iconfont iconapp1"></i>
      </div>
      <div class="devIcon" v-else-if="!detail.updateUrl">
        <i class="iconfont icondev"></i>
      </div>
      <!-- 下拉按钮 -->
      <div
        class="dropBtn iconfont iconcaidan"
        v-show="!list"
        @click="isDrop = true"
      ></div>
    </div>
    <!-- menu mask -->
    <div class="mask" v-show="isDrop" @click="isDrop = false"></div>
    <!-- 下拉菜单 -->
    <DropMenu
      v-show="isDrop"
      :detail="detail"
      :index="index"
      @getProfile="getProfile"
      @uninstall="uninstall"
    ></DropMenu>
    <!-- 列表视图 -->
    <span v-show="list">{{ detail.shortName }}</span>
    <ListMenu
      v-show="list"
      :detail="detail"
      @getProfile="getProfile"
      @uninstall="uninstall"
    ></ListMenu>
    <!-- 简介 -->
    <Profile
      :id="detail.id"
      v-if="profileShow"
      @close="profileShow = false"
    ></Profile>
  </div>
</template>

<script>
import DropMenu from "../components/DropMenu.vue";
import ListMenu from "../components/ListMenu.vue";
import Profile from "../components/Profile.vue";

export default {
  data() {
    return {
      isDrop: false,
      profileShow: false
    };
  },
  props: {
    detail: Object,
    list: Boolean,
    index: Number,
    dropOptions: Boolean
  },
  components: {
    DropMenu,
    ListMenu,
    Profile
  },
  methods: {
    switchStatus() {
      this.$emit("switch");
    },
    uninstall() {
      this.isDrop = false;
      this.$emit("update");
    },
    getProfile() {
      this.$store.commit("setBlur", true);
      this.profileShow = true;
      this.isDrop = false;
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
  position: relative;
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
      i::before {
        font-size: 12px;
        color: #fff;
      }
      &.app {
        background-color: #1e8ef0;
        i::before {
          font-size: 16px;
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
      flex: 1;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 16px;
      color: rgb(46, 48, 49);
    }
  }
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
}
</style>
