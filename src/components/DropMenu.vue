<template>
  <div :class="['dropMenu', position]">
    <p>{{ detail.shortName }}</p>
    <ul>
      <li
        v-for="(v, i) in menu"
        :key="i"
        @click="checkOption(v.name)"
        :class="{
          readonly: v.name === '配置' && !detail.optionsUrl,
          warn: v.name === '卸载'
        }"
      >
        <i :class="['iconfont', v.icon]"></i>
        <span>{{ v.name }}</span>
      </li>
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
  computed: {
    position() {
      return this.index % 7 < 4 ? "right" : "left";
    }
  },
  props: {
    detail: Object,
    index: Number
  },
  methods: {
    checkOption(name) {
      const nameMap = new Map([
        ["简介", () => this.getProfile()],
        ["配置", () => this.getOptionsUrl()],
        ["卸载", () => this.unInstall()]
      ]);
      nameMap.get(name)();
    },
    // 简介
    getProfile() {
      this.$emit("getProfile");
    },
    // 配置
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
.dropMenu {
  position: absolute;
  width: 130px;
  height: 120px;
  top: 10px;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  box-shadow: rgba(#000, 0.1) 0 0 10px 0;
  z-index: 10;
  &.left {
    left: -130px;
  }
  &.right {
    right: -140px;
  }
  p {
    width: 100%;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background-color: #fff;
    padding: 0 15px;
    position: relative;
    &::before {
      position: absolute;
      top: 50%;
      left: 50%;
      content: "";
      width: 150%;
      height: 200%;
      transform: translate(-50%, -50%) scale(0.5);
      border-bottom: 1px solid #333;
    }
  }
  ul {
    li {
      height: 30px;
      line-height: 30px;
      color: #333;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      i {
        margin-right: 10px;
        &::before {
          width: 20px;
          height: 20px;
          font-size: 12px;
        }
      }
      &.readonly {
        color: #999;
        pointer-events: none;
      }
      &:hover {
        background-color: #fafafa;
        &.warn {
          color: #f56c6c;
        }
      }
    }
  }
}
</style>
