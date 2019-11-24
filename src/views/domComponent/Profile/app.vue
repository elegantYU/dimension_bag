<template>
  <div class="wrapper" id="profile">
    <div class="mask" @click="close"></div>
    <!-- dialog -->
    <transition name="fade">
      <div class="dialog" v-if="show">
        <div class="head">
          <div class="avatar"></div>
          <div class="title">
            <p>
              <span>{{ info.name }}</span>
              <span>v{{ info.version }}</span>
            </p>
            <div class="detail"></div>
          </div>
        </div>
        <div class="desc"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import { get } from "../../service/management";

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
        console.log("插件信息", info);
        this.info = info;
        this.show = true;
      });
    },
    close() {
      this.$store.commit("setBlur", false);
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
  }
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  top: 30%;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
</style>
