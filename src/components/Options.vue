<template>
  <div class="wrapper">
    <h6>{{ item.name }}</h6>
    <ul>
      <li
        v-for="v in options"
        :key="v.name"
        @click="handlerOption(v.name)"
        :class="{'warn': v.name==='卸载'}"
      >
        <i :class="['iconfont', v.icon]"></i>
        <p>{{ v.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { create } from "../services/tabs";
import { uninstall } from "../services/management";

export default Vue.extend({
  data() {
    return {
      options: [
        { name: "简介", icon: "iconjianjie" },
        { name: "卸载", icon: "iconxiezai" }
      ]
    };
  },
  props: {
    item: Object,
    show: Boolean
  },
  created() {
    this.initState();
  },
  methods: {
    initState() {
      if (this.item.enabled && this.item.optionsUrl) {
        this.options.splice(1, 0, { name: "配置", icon: "iconpeizhi" });
        /* if (this.$store.state.developMode) {
          this.options.splice(this.options.length - 1, 0, {
            name: "背景页",
            icon: "iconbeijing"
          });
        } */
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
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -40%);
  opacity: 0;
  width: 260px;
  height: auto;
  padding: 20px 0;
  background-color: var(--theme-background-default);
  border-radius: 5px;
  box-shadow: rgba(var(--theme-boxShadow), 0.15) 0 0 8px;
  animation: slideDown 0.1s ease-in 0.1s forwards;

  h6 {
    font-size: 16px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 20px;
    line-height: 50px;
  }
  ul {
    width: 160px;
    margin: 0 auto;
    li {
      width: 100%;
      height: 30px;
      margin-bottom: 10px;
      border-radius: 5px;
      border: 1px solid var(--theme-readOnly-bg);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0s;
      i {
        width: 16px;
        margin-right: 10px;
        &::before {
          font-size: 16px;
          color: var(--theme-fontColor-default);
        }
      }
      p {
        font-size: 14px;
        color: var(--theme-fontColor-default);
      }
      &:hover {
        background-color: var(--theme-hover-color);
        border: 1px solid transparent;
        i::before {
          color: var(--theme-settingEnter-hover);
        }
        p {
          color: var(--theme-settingEnter-hover);
        }
        &.warn {
          background-color: var(--theme-warning);
        }
      }
    }
  }
}

@keyframes slideDown {
  from {
    transform: translate(-50%, -40%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
}
</style>
