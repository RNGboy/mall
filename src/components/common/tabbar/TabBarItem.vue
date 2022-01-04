<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 利用div包裹,不能在插槽里放绑定类名,会被完全替换 -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text" /></div>

    <!-- <img src="@/assets/img/tabbar/home.svg" alt="" /> -->
    <!-- <div>首页</div> -->
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red",
    },
  },
  data() {
    return {
      // isActive: true,
    };
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    // 动态绑定首页底部当行字体颜色
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemClick() {
      // console.log('itemClick')
      this.$router.replace(this.path);
    },
  },
};
</script>

<style lang="css" scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
}
</style>