<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :product="item"
      ></cart-list-item>
    </scroll>
    <cart-computed-bar></cart-computed-bar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";
import CartComputedBar from "./CartComputedBar";



export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
    CartComputedBar
  },
  // 子组件直接使用vuex，懒得使用组件通信
  computed: {
    ...mapGetters(["cartList"])
  },
  activated(){
    //   进入该组件时做一次滚动高度刷新
      this.$refs.scroll.refresh()
  }
};
</script>

<style lang="css" scoped>
.cart-list {
  height: calc(100vh - 49px - 40px);
}
.content {
  margin-top: 44px;
  height: calc(100% - 49px);
  overflow: hidden;
}
</style>
