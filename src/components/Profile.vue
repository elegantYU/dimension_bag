<template>
  <div class="wrapper">
    <div class="header">
      <img v-if="logo" :src="logo" alt />
      <p v-else>{{ splitName }}</p>
      <div class="detail" @click="openHome">
        <h6>{{ item.name }}</h6>
        <p>{{ item.version }}</p>
      </div>
      <span class="permission" @click="openExtension">{{ permission }}</span>
    </div>
    <div class="content">{{ item.description }}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { create } from "../services/tabs";

export default Vue.extend({
  data() {
    return {
      detail: {
        homepageUrl: "",
        id: ""
      },
      splitName: "",
      logo: ""
    };
  },
  props: {
    item: Object
  },
  computed: {
    // extLogo(): string {
    //   interface Ext {
    //     icons: Array<Object>;
    //     [propName: string]: any;
    //   }

    //   const icons: Ext = this.item.icons;
    //   return icons && icons[icons.length - 1].url;
    // },
    permission(): string {
      return `${this.item.permissions.length}种权限`;
    }
  },
  mounted() {
    this.detail = Object.assign({}, this.item);
    this.splitName = this.item.shortName.substr(0, 1);
    this.logo = this.item.icons[this.item.icons.length - 1].url;
  },
  methods: {
    openHome() {
      const url: string = this.detail.homepageUrl;
      create({ url, active: true });
    },
    openExtension() {
      const id: string = this.detail.id;
      const url = `https://chrome.google.com/webstore/detail/${id}`;
      create({ url, active: true });
    }
  }
});
</script>

<style lang="scss" scoped>
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
