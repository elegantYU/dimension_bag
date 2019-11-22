<template>
  <div class="wrapper">
    <ul>
      <li
        v-for="(v, i) in menu"
        :key="i"
        :class="[
          'iconfont',
          v.icon,
          {
            readonly: v.name === '配置' && !detail.optionsUrl,
            warn: v.name === '卸载'
          }
        ]"
        :title="v.name"
        @click="switchOptions(v)"
      ></li>
    </ul>
  </div>
</template>

<script>
import { create } from "../views/service/tabs";
import { uninstall } from "../views/service/management";

export default {
  data() {
    return {
      menu: [
        { icon: "iconjianjie", name: "简介" },
        { icon: "iconpeizhi", name: "配置" },
        { icon: "iconxiezai", name: "卸载" }
      ]
    };
  },
  props: {
    detail: Object
  },
  methods: {
    switchOptions({ name }) {
      const nameMap = new Map([
        ["简介", () => this.getProfile()],
        ["配置", () => this.getOptionsUrl()],
        ["卸载", () => this.unInstall()]
      ]);
      nameMap.get(name)();
    },
    getProfile() {
      this.$emit("getProfile");
    },
    getOptionsUrl() {
      create({ url: this.detail.optionsUrl, active: true });
    },
    unInstall() {
      const data = { id: this.detail.id };
      uninstall(data).then(() => {
        this.$emit("uninstall");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  margin-left: auto;
  ul {
    width: 100%;
    display: flex;
    align-content: center;
    justify-content: space-around;
    li {
      width: 25px;
      height: 25px;
      cursor: pointer;
      transition: all 0.1s ease;
      border-radius: 50%;
      background-color: #fff;
      box-shadow: rgba(#000, 0.1) 0 0 10px 0;
      &:hover {
        background-color: #1b93fb;
        &::before {
          color: #fff;
        }
      }
      &::before {
        width: 100%;
        height: 100%;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #1b93fb;
        transition: all 0.1s ease;
      }
      &.readonly {
        pointer-events: none;
        background-color: #e0e0e0;
        &::before {
          color: #fff;
        }
        &:hover {
          background-color: #e0e0e0;
        }
      }
      &.warn {
        &:hover {
          background-color: #f56c6c;
        }
      }
    }
  }
}
</style>
