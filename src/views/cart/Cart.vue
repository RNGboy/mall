<template>
  <div>
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>

    <!-- 商品的列表 -->
    <cart-list></cart-list>

    <!-- 底部汇总 -->
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";

import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
  },
  computed: {
    //   cartLength(){
    //       return this.$store.getters.cartLength
    //   }
    // vuex中mapGetters提供将getters直接转换为计算属性
    ...mapGetters(["cartLength"])
  }
};
</script>

<style lang="css" scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
</style>
