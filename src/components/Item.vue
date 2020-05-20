<template>
  <div :class="['wrapper', { 'listMode': mode }]">
    <div :class="['card', { disabled: !item.enabled }]" v-if="!mode">
      <div class="cardBox" @click="switchStatus">
        <img v-if="item.icons && item.icons.length" :src="item.icons[item.icons.length - 1].url" :title="item.shortName" />
        <p v-else>{{ splitName }}</p>
        <!-- 来源类型icon -->
        <i class="devIcon iconfont iconother" v-if="item.installType === 'development'"></i>
        <i class="devIcon iconfont iconapp1 app" v-else-if="item.isApp"></i>
        <i class="devIcon iconfont icondev" v-else-if="!item.updateUrl"></i>
      </div>
      <div class="dropBtn iconfont iconcaidan" @click="$emit('options', item)"></div>
    </div>
    <div :class="['list', { disabled: !item.enabled }]" @click="switchStatus" v-else>
      <div class="listBox">
        <img :src="extLogo" :title="item.shortName" />
        <!-- 来源类型icon -->
        <i class="devIcon iconfont iconother" v-if="item.installType === 'development'"></i>
        <i class="devIcon iconfont iconapp1 app" v-else-if="item.isApp"></i>
        <i class="devIcon iconfont icondev" v-else-if="!item.updateUrl"></i>
      </div>
      <p>{{ item.shortName }}</p>
      <!-- btnlist -->
      <ul>
        <li
          v-for="v in listOptions"
          :key="v.name"
          :class="['iconfont', v.icon, { 'warn': v.name==='卸载' }]"
          @click.stop="handlerOption(v.name)"
        ></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { setEnabled, uninstall } from "../services/management";
import { create } from "../services/tabs";

export default Vue.extend({
  data() {
    return {
      listOptions: [
        { name: "简介", icon: "iconjianjie" },
        { name: "卸载", icon: "iconxiezai" }
      ]
    };
  },
  props: {
    item: Object,
    mode: Boolean
  },
  computed: {
    extLogo(): string {
      interface Ext {
        icons: Array<Object>;
        [propName: string]: any;
      }

      const icons: Ext = this.item.icons;
      return icons && icons.length ? icons[icons.length - 1].url : "";
    },
    splitName(): string {
      const {shortName} = this.item
      return shortName.substr(0, 1)
    }
  },
  mounted() {
    this.initOptions();
  },
  methods: {
    switchStatus() {
      console.log("[当前插件]:", this.item);
      const { id, enabled } = this.item;
      setEnabled({ id, enabled: !enabled }).then(_ => {
        this.$emit("refresh");
      });
    },
    initOptions() {
      if (this.item.enabled) {
        this.listOptions.splice(1, 0, {
          name: "配置",
          icon: "iconpeizhi"
        });
      }
    },
    handlerOption(name: string) {
      const HandlerMap = new Map([
        ["简介", () => this.openProfile()],
        ["配置", () => this.openItemSetting()],
        ["背景页", () => this.openBackground()],
        ["卸载", () => this.unInstall()]
      ]);

      const F: any = HandlerMap.get(name);
      F();
    },
    openProfile() {
      this.$emit("profile");
    },
    openItemSetting() {
      const url: string = this.item.optionsUrl;
      create({ url, active: true });
    },
    openBackground() {
      const url: string = `chrome://extension://${this.item.id}/background.html`;
      create({ url, active: true });
    },
    unInstall() {
      const id: string = this.item.id;
      uninstall({ id });
    }
  }
});
</script>

<style lang="scss" scoped>
.wrapper {
  &.listMode {
    width: 100%;
  }
  .card {
    width: 55px;
    height: 55px;
    cursor: pointer;
    margin: 0 10px 15px 0;
    transition: all 0.2s;
    position: relative;

    .cardBox {
      width: 55px;
      height: 55px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 35px;
        transition: transform 0.2s;
      }

      & > p {
        display: block;
        width: 35px;
        height: 35px;
        background-color: rgb(88, 88, 88);
        text-align: center;
        line-height: 35px;
        font-size: 20px;
        font-weight: bold;
        border-radius: 6px;
        color: #fff;
      }
      
      .devIcon {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 20px;
        height: 20px;
        background-color: var(--theme-devIcon);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        &::before {
          font-size: 12px;
          color: var(--theme-Icon-font);
        }
        &.app {
          background-color: var(--theme-appIcon);
          &::before {
            font-size: 16px;
          }
        }
      }
    }

    .dropBtn {
      position: absolute;
      top: 10px;
      right: 0;
      width: 4px;
      height: 12px;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.2s;
      &::before {
        font-size: 14px;
      }
    }

    &:nth-of-type(7n) {
      margin-right: 0;
    }
    &:hover {
      img {
        transform: scale(1.1);
      }
      .dropBtn {
        opacity: 1;
      }
      &.disabled img {
        filter: grayscale(0);
      }
    }
    &.disabled {
      img {
        filter: grayscale(1);
      }
    }
  }

  .list {
    width: 100%;
    height: 35px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding-left: 10px;
    transition: all 0.2s;

    &.disabled {
      img {
        filter: grayscale(1);
      }
    }

    .listBox {
      width: 35px;
      height: 35px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      img {
        width: 30px;
        transition: transform 0.2s;
      }
      .devIcon {
        position: absolute;
        bottom: -5px;
        right: -5px;
        width: 20px;
        height: 20px;
        background-color: var(--theme-devIcon);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: scale(0.8);
        &::before {
          font-size: 12px;
          color: var(--theme-Icon-font);
        }
        &.app {
          background-color: var(--theme-appIcon);
          &::before {
            font-size: 16px;
          }
        }
      }
    }

    p {
      font-size: 16px;
      font-weight: bold;
      margin-right: auto;
      flex: 1;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    ul {
      width: auto;
      height: 100%;
      display: flex;
      align-items: center;
      margin-left: 10px;
      li {
        width: 28px;
        height: 28px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        margin-right: 1px;
        transition: all 0s;
        &::before {
          width: 14px;
          height: 14px;
          font-size: 14px;
        }
        &:hover {
          background-color: var(--theme-hover-color);
          &::before {
            color: var(--theme-settingEnter-hover);
          }
          &.warn {
            background-color: var(--theme-warning);
          }
        }
      }
    }

    &:hover {
      box-shadow: rgba(var(--theme-boxShadow), 0.65) 0 0 8px;
      img {
        transform: scale(1.1);
      }
      &.disabled {
        img {
          filter: grayscale(0);
        }
      }
    }
  }
}
</style>
