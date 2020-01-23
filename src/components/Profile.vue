<template>
  <div class="wrapper">
    <div class="header">
      <img :src="extLogo" alt />
      <div class="detail" @click="openHome">
        <h6>{{ item.name }}</h6>
        <p>{{ item.version }}</p>
      </div>
      <span class="permission" @click="openExtension">{{ permission }}</span>
    </div>
    <div class="content">{{ item.description }}</div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { create } from "../services/tabs";

export default Vue.extend({
  props: {
    item: Object
  },
  computed: {
    extLogo(): string {
      interface Ext {
        icons: Array<Object>;
        [propName: string]: any;
      }

      const icons: Ext = this.item.icons;
      console.log("[item]:", this.item.icons);
      return icons[icons.length - 1].url;
    },
    permission(): string {
      return `${this.item.permissions.length}种权限`;
    }
  },
  methods: {
    openHome() {
      const url: string = this.item.homepageUrl;
      create({ url, active: true });
    },
    openExtension() {
      const url = "chrome://extensions";
      create({ url, active: true });
    }
  }
});
</script>

<style lang='scss' scoped>
.wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 340px;
  height: auto;
  transform: translate(-50%, -40%);
  opacity: 0;
  border-radius: 5px;
  padding: 15px 20px;
  background-color: var(--theme-background-default);
  animation: slideDown 0.1s ease-in 0.1s forwards;

  .header {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    img {
      display: block;
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
    .detail {
      width: 120px;
      flex: 1;
      cursor: pointer;
      margin-right: auto;
      h6 {
        font-size: 16px;
        margin-bottom: 4px;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p {
        font-size: 12px;
        text-align: left;
      }
    }

    .permission {
      height: 20px;
      padding: 2px 4px;
      line-height: 20px;
      font-size: 12px;
      color: #000;
      cursor: pointer;
      margin-left: 10px;
      background-color: var(--theme-readOnly-bg);
    }
  }

  .content {
    width: 100%;
    height: auto;
    font-size: 14px;
    text-align: left;
    color: var(--theme-fontColor-sub);
    line-height: 1.5;
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
