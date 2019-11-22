<template>
  <div class="home">
    <!-- header -->
    <div class="header">
      <div class="search">
        <i class="iconfont iconicon_search"></i>
        <input type="text" placeholder="搜索插件" autofocus v-model="keyWords" @keyup="searchExts" />
        <i class="iconfont iconguanbi" v-show="keyWords" @click="getExtsData"></i>
      </div>
      <i
        :class="[
          'changeListBtn',
          'iconfont',
          viewList ? 'iconviewlist' : 'iconviewgallery'
        ]"
        @click="switchListView"
      ></i>
    </div>
    <!-- 主要面板 -->
    <div :class="['content', { list: viewList }]">
      <transition-group tag="div" class="enabledExts">
        <Item
          v-for="(v, i) in enabledExts"
          :key="v.id"
          :detail="v"
          :list="viewList"
          :index="i"
          @switch="changeEnable(i, true)"
          @update="getExtsData"
        ></Item>
      </transition-group>
      <!-- 当无已启动插件时 -->
      <p class="noEnableExt" v-show="!enabledExts.length">还没有启动中的插件QAQ</p>
      <transition-group tag="div" class="disabledExts">
        <Item
          v-for="(v, i) in disabledExts"
          :key="v.id"
          :detail="v"
          :list="viewList"
          :index="i"
          @switch="changeEnable(i, false)"
          @update="getExtsData"
        ></Item>
      </transition-group>
    </div>
  </div>
</template>

<script>
import Item from "../components/Items.vue";
import { appId, getAll, setEnabled } from "./service/management";
import { nameSort } from "./service/utils";

export default {
  data() {
    return {
      selfId: null, // 自身id
      viewList: false, //  列表视图
      enabledExts: [], //  已激活插件
      disabledExts: [], //  未激活插件
      keyWords: null, //  搜索关键字
      currentItem: {
        //  当前会下拉的item
        show: false,
        value: null,
        index: null
      }
    };
  },
  components: {
    Item
  },
  mounted() {
    this.viewList = this.$store.state.listStyle;
    this.getExtsData();
  },
  methods: {
    // 获取并筛选素有插件
    getExtsData() {
      appId()
        .then(id => {
          this.selfId = id;
          return getAll();
        })
        .then(data => {
          console.log(data);
          const noThemeAndSelf = data
            .filter(v => v.type !== "theme")
            .filter(v => v.id !== this.selfId)
            .map(v => ({ ...v, icon: v.icons[v.icons.length - 1].url }));

          this.enabledExts = nameSort(noThemeAndSelf.filter(v => v.enabled));
          this.disabledExts = nameSort(noThemeAndSelf.filter(v => !v.enabled));
          this.$store.dispatch("setEnabledExts", this.enabledExts);
          this.$store.dispatch("setDisabledExts", this.disabledExts);

          // 若处于搜索状态 则清除关键字
          this.keyWords = null;
        });
    },
    // 切换列表视图
    switchListView() {
      this.viewList = !this.viewList;
      this.$store.commit("setListStyle", this.viewList);
      // 持久化处理
    },
    // 激活&关闭
    changeEnable(index, enabled) {
      const temp = enabled ? this.enabledExts : this.disabledExts;
      const data = { id: temp[index].id, enabled: !enabled };

      setEnabled(data).then(() => {
        temp.splice(index, 1);
        /* 
          有少部分插件自动更新后会需要用户确认跟多的权限
          此处没有用于判断用户操作的功能
          只能重新获取一次数据
        */
        this.getExtsData();
      });
    },
    // 搜索框查询插件 (只查询插件名)
    searchExts() {
      let words = this.keyWords;
      // 轻微模糊查询
      const filterExt = arr =>
        arr.filter(v => {
          if (v.name.toLowerCase().search(words) >= 0) {
            return v;
          }
        });

      if (words) {
        words = words.toLowerCase();
        this.enabledExts = filterExt(this.enabledExts);
        this.disabledExts = filterExt(this.disabledExts);
      } else {
        this.enabledExts = [...this.$store.state.enabledExts];
        this.disabledExts = [...this.$store.state.disabledExts];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px 0 0;
  .header {
    $headerHeight: 40px;
    height: $headerHeight;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    margin-bottom: 10px;
    .search {
      width: 70%;
      height: 100%;
      border-radius: 5px;
      background-color: rgb(242, 242, 242);
      display: flex;
      align-items: center;
      justify-content: space-between;
      i {
        width: $headerHeight;
        height: $headerHeight;
        cursor: pointer;
      }
      input {
        flex: 1;
        height: 100%;
        background-color: transparent;
        font-size: 14px;
      }
    }
    .changeListBtn {
      width: $headerHeight;
      height: $headerHeight;
      background-color: rgb(242, 242, 242);
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.1s ease;
      &:hover {
        background-color: #1b93fb;
        &::before {
          color: #fff;
        }
      }
      &::before {
        transition: all 0.1s ease;
      }
      &:active::before {
        transform: scale(0.9);
      }
    }
  }
  .content {
    height: 445px;
    overflow: overlay;
    position: relative;
    .enabledExts {
      width: 100%;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      padding: 10px 20px 20px;
    }
    .noEnableExt {
      height: 40px;
      font-size: 14px;
      color: #333;
    }
    .disabledExts {
      @extend .enabledExts;
      padding: 20px;
      position: relative;
      &::before {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        content: "";
        width: calc(100% - 40px);
        border-top: 1px dashed #999;
      }
    }
    &.list {
      .enabledExts {
        flex-wrap: nowrap;
        flex-direction: column;
      }
    }
  }
}
</style>
