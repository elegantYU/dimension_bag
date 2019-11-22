<template>
  <div class="wrapper">
    <div class="mask" @click="close"></div>
  </div>
</template>

<script>
import { get } from "../views/service/management";

export default {
  data() {
    return {
      info: {}
    };
  },
  props: {
    id: String
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      get({ id: this.id }).then(info => {
        this.info = info;
      });
    },
    close() {
      this.$emit("close");
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
}
</style>
