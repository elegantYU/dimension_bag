<template>
  <div :class="['wrapper', 'in']">
    <ul>
      <li
        v-for="v in settingList"
        :key="v.field"
        :class="{ activated: v.active }"
        @click="invokeSetting(v)"
      >
        <i :class="['iconfont', v.active ? v.icon2 : v.icon1]"></i>
        <p>{{ v.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { syncSet } from "../services/storage";

export default Vue.extend({
  data() {
    return {
      settingList: [
        {
          name: "夜间模式",
          field: "nightMode",
          icon1: "iconsunshine",
          icon2: "iconyejianmoshi",
          active: false
        },
        {
          name: "列表视图",
          field: "listMode",
          icon1: "iconviewgallery",
          icon2: "iconviewlist",
          active: false
        },
        // {
        //   name: "开发者模式",
        //   field: "developMode",
        //   icon1: "icondevelop",
        //   icon2: "icondevelop",
        //   active: false
        // },
        {
          name: "谷歌商店",
          field: "chromeWebStore",
          icon1: "iconiconfontdianpu",
          icon2: "iconiconfontdianpu",
          active: false
        },
        {
          name: "插件简介",
          field: "introduce",
          icon1: "iconjianjie2",
          icon2: "iconjianjie2",
          active: false
        }
      ]
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.initStatus();
  },
  methods: {
    initStatus() {
      // 定义对象键名格式
      interface ModeList {
        [key: string]: boolean;
      }

      const { nightMode, listMode, developMode } = this.$store.state;
      const modeList: ModeList = { nightMode, listMode, developMode };
      this.settingList.forEach(v => {
        const keys = Object.keys(modeList);
        if (keys.includes(v.field)) {
          v.active = modeList[v.field];
        }
      });
    },
    invokeSetting({ field, active }: { field: string; active: boolean }) {
      const handlerMap = new Map([
        ["nightMode", (active: boolean): void => this.nightMode(!active)],
        ["listMode", (active: boolean): void => this.listMode(!active)],
        ["developMode", (active: boolean): void => this.developMode(!active)],
        ["chromeWebStore", () => this.$emit("chrome")],
        ["introduce", () => this.$emit("intro")]
      ]);

      const F: any = handlerMap.get(field);
      F(active);
      this.initStatus();
    },
    nightMode(active: boolean): void {
      this.$store.dispatch("setNightMode", active);
      syncSet({ nightMode: active }).then(_ => this.$emit("updateMode"));
    },
    listMode(active: boolean): void {
      this.$store.dispatch("setListMode", active);
      syncSet({ listMode: active }).then(_ => this.$emit("updateMode"));
    },
    developMode(active: boolean): void {
      this.$store.dispatch("setDevMode", active);
      syncSet({ developMode: active }).then(_ => this.$emit("updateMode"));
    },
    i18n() {
      this.settingList[0].name = chrome.i18n.getMessage("nightMode")
      this.settingList[1].name = chrome.i18n.getMessage("listMode")
      this.settingList[2].name = chrome.i18n.getMessage("googleStore")
      this.settingList[3].name = chrome.i18n.getMessage("profile")
    }
  }
});
</script>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  bottom: 20px;
  left: 50%;
  width: 90%;
  height: auto;
  transform: translate(-50%, 150%);
  background-color: var(--theme-background-default);
  border-radius: 8px;
  padding: 20px;

  ul {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    li {
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      cursor: pointer;
      opacity: 0.5;

      i {
        width: 30px;
        height: 30px;
        margin-bottom: 10px;
        &::before {
          transition: color 0.1s;
          font-size: 30px;
        }
      }
      p {
        font-size: 14px;
      }
      &:hover {
        opacity: 1;
        color: var(--theme-hover-color);
        i::before {
          color: var(--theme-hover-color);
        }
      }
      &.activated {
        opacity: 1;
        color: var(--theme-hover-color);
        i::before {
          color: var(--theme-hover-color);
        }
      }
    }
  }

  &.in {
    animation: slideIn 0.2s ease-in 0.1s forwards;
  }
}

@keyframes slideIn {
  from {
    transform: translate(-50%, calc(100% + 20px));
  }
  to {
    transform: translate(-50%, 0);
  }
}
</style>
