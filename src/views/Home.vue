<template>
  <div class="home">
    <!-- 第一层 -->
    <div class="content">
      <Header @search="search" @setting="isSetting = true"></Header>
      <div :class="['main', { list: listMode }]">
        <transition-group tag="div" class="enableExts" name="scale">
          <Item
            v-for="v in enabledExt"
            :key="v.id"
            :item="v"
            :mode="listMode"
            @options="openOptions(v)"
            @refresh="getExtsData"
            @profile="getProfile(v)"
          ></Item>
        </transition-group>
        <transition-group
          tag="div"
          class="disableExts"
          name="scale"
          v-show="disabledExt.length"
        >
          <Item
            v-for="v in disabledExt"
            :key="v.id"
            :item="v"
            :mode="listMode"
            @options="openOptions(v)"
            @refresh="getExtsData"
            @profile="getProfile(v)"
          ></Item>
        </transition-group>
        <!-- 若无插件 -->
        <transition name="fade">
          <div class="noMore" v-if="!allExts.length" @click="download">您的插件空空如也...快去下载吧～</div>
        </transition>
        <!-- 搜索结果为空 -->
        <transition name="fade">
          <div
            class="noMore"
            v-if="!enabledExt.length && !disabledExt.length"
            @click="download"
          >找不到想要的插件QAQ...前往下载</div>
        </transition>
      </div>
    </div>
    <!-- 第二层 高斯模糊蒙版 + 弹出层 -->
    <transition name="fade">
      <div class="maskBox" v-if="isSetting || isOptions || isProfile || isIntro">
        <div class="mask" @click="closePop"></div>
        <!-- 设置 -->
        <Setting v-show="isSetting" @updateMode="$emit('updateMode')" @chrome="download" @intro="openIntro"></Setting>
        <!-- item 设置 -->
        <Options v-show="isOptions" :item="currItem" @profile="getProfile(v)"></Options>
        <!-- profile -->
        <Profile v-show="isProfile" :item="currItem"></Profile>
        <!-- introduce -->
        <Intro v-show="isIntro"></Intro>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue from "vue";
import Header from "../components/Header.vue";
import Item from "../components/Item.vue";
import Setting from "../components/Setting.vue";
import Options from "../components/Options.vue";
import Profile from "../components/Profile.vue";
import Intro from "../components/Introduce.vue";
import { appId, getAll } from "../services/management";
import { create } from "../services/tabs";
import { nameSort } from "../services/utils";

interface Ext {
  id: string;
  type?: string;
  name: string;
  enabled: boolean;
  [propName: string]: any;
}

interface AllExts {
  [index: number]: Ext;
  [propName: string]: any;
}

export default Vue.extend({
  data() {
    return {
      id: "", //  自身id
      allExts: [], //  所有插件
      enabledExt: [],
      disabledExt: [],
      currItem: {},
      listMode: false,
      isSetting: false,
      isOptions: false,
      isProfile: false,
      isIntro: false
    };
  },
  watch: {
    "$store.state.listMode": {
      handler(curr): void {
        this.listMode = curr;
      },
      immediate: true
    }
  },
  components: {
    Header,
    Item,
    Setting,
    Options,
    Profile,
    Intro
  },
  mounted() {
    this.getExtsData();
  },
  methods: {
    getExtsData() {
      appId()
        .then((id: string) => {
          console.log("[selfId]:", id);
          this.id = id;
          return getAll();
        })
        .then((data: AllExts): void => {
          console.log("[所有插件]:", data);
          this.allExts = data
            .filter((v: Ext) => v.type !== "theme")
            .filter((v: Ext) => v.id !== this.id);

          this.enabledExt = nameSort(
            this.allExts.filter((v: Ext) => v.enabled)
          );
          this.disabledExt = nameSort(
            this.allExts.filter((v: Ext) => !v.enabled)
          );
        });
    },
    search(k: string) {
      console.log("[查询中]:", k);
      const keyword: string = k.toLowerCase();
      const filterExt = (arr: any) =>
        arr.filter((v: Ext) => {
          if (v.name.toLowerCase().search(keyword) >= 0) {
            return v;
          }
        });

      if (k) {
        this.enabledExt = filterExt(
          nameSort(this.allExts.filter((v: Ext) => v.enabled))
        );
        this.disabledExt = filterExt(
          nameSort(this.allExts.filter((v: Ext) => !v.enabled))
        );
      } else {
        this.getExtsData();
      }
    },
    // 跳转应用市场
    download() {
      console.log("[前往谷歌商店]");
      create({
        url: "https://chrome.google.com/webstore/category/extensions?hl=zh-CN",
        active: true
      });
    },
    openOptions(data: any) {
      this.isOptions = true;
      this.currItem = Object.assign({}, data);
    },
    // 打开插件简介
    getProfile(data: Object) {
      this.currItem = Object.assign({}, data);
      this.isOptions = false;
      this.isProfile = true;
    },
    // 打开简介
    openIntro() {
      this.isSetting = false;
      this.isIntro = true;
    },
    // 清除所有弹窗类
    closePop() {
      this.isSetting = false;
      this.isOptions = false;
      this.isProfile = false;
      this.isIntro = false;
    }
  }
});
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;

  .content {
    width: 100%;
    height: 100%;
    padding: 20px 0 0;

    .main {
      width: 100%;
      height: auto;
      max-height: 475px;
      padding: 0 20px;
      overflow: overlay;
      scroll-behavior: smooth;

      .enableExts {
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 10px 0;
      }

      .disableExts {
        @extend .enableExts;
        position: relative;
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          border-top: 1px dashed var(--theme-fontColor-readOnly);
        }
      }

      .noMore {
        width: 100%;
        height: 350px;
        line-height: 350px;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
        color: var(--theme-fontColor-default);
        &:hover {
          text-decoration: underline;
        }
      }

      &.list {
        .enableExts {
          flex-direction: column;
        }
        .disableExts {
          flex-direction: column;
        }
      }
    }
  }

  .maskBox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .mask {
      @extend .maskBox;
      backdrop-filter: blur(5px);
    }
  }
}

.scale-enter,
.scale-leave-to {
  transform: scale(0);
}
.scale-enter-active,
.scale-leave-active {
  transition: all 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.1s;
}
</style>
