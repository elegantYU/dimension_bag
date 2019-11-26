<template>
  <div class="wrapper" id="profile">
    <div class="mask" @click="close"></div>
    <!-- dialog -->
    <transition name="fade">
      <div class="dialog" v-if="show">
        <div class="head">
          <div class="avatar">
            <img :src="info.icons[info.icons.length - 1].url" alt />
          </div>
          <div class="title">
            <p :class="info.homepageUrl && 'hoverLink'" @click="openHomepage">
              <i class="iconfont icondemo17" v-if="info.homepageUrl"></i>
              <span>{{ info.shortName }}</span>
              <span>v{{ info.version }}</span>
            </p>
            <!-- 首页、是否可离线、n种权限、安卓可用 -->
            <div class="detail">
              <span class="default" v-show="info.offlineEnabled">可离线</span>
              <span class="default" v-show="info.isApp">安卓可用</span>
              <span class="default">{{ info.permissions.length }} 种权限</span>
            </div>
          </div>
        </div>
        <div class="desc" v-if="info.description">
          <p>{{ info.description }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { get } from "../../service/management";
import { create } from "../../service/tabs";

export default {
  data() {
    return {
      id: null,
      info: {},
      show: false
    };
  },
  watch: {
    "$store.state.currentItemId": {
      handler(curr) {
        if (curr) {
          this.id = curr;
          this.getInfo();
        } else {
          this.show = false;
        }
      },
      // deep: true,
      immediate: true
    }
  },
  methods: {
    getInfo() {
      get({ id: this.id }).then(info => {
        this.info = info;
        this.show = true;
      });
    },
    openHomepage() {
      this.info.homepageUrl &&
        create({ url: this.info.homepageUrl, active: true });
    },
    close() {
      this.$store.commit("setBlur", false);
      this.$destroy();
      document
        .getElementById("app")
        .removeChild(document.getElementById("profile"));
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 360px;
    height: auto;
    background-color: #fff;
    box-shadow: rgba(#000, 0.15) 0 0 10px 0;
    box-sizing: content-box;
    padding: 30px;
    border-radius: 5px;
    .head {
      height: 50px;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .avatar {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-right: 20px;
        img {
          width: 100%;
        }
      }
      .title {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        & > p {
          display: flex;
          align-items: center;
          &.hoverLink:hover {
            text-decoration: underline;
            cursor: pointer;
          }
          i {
            width: 16px;
            height: 16px;
            margin-right: 4px;
            &::before {
              font-size: 16px;
              color: #1b93fb;
            }
          }
          span {
            &:nth-of-type(1) {
              font-size: 18px;
              font-weight: bold;
              margin-right: 10px;
            }
            &:nth-of-type(2) {
              font-size: 14px;
              color: #a0afbd;
            }
          }
        }
        .detail {
          height: 20px;
          display: flex;
          .default {
            padding: 3px;
            background-color: #e2e0e0;
            color: #909090;
            border-radius: 2px;
            margin-right: 5px;
            font-size: 14px;
          }
        }
      }
    }
    .desc {
      text-align: left;
      p {
        font-size: 16px;
        line-height: 1.2;
      }
    }
  }
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  top: 10%;
  will-change: top;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
</style>
