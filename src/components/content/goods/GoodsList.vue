<template>
  <div class="goods">
    <!-- 商品列表-->
    <goods-list-item
      v-for="(item, index) in goods"
      :key="index"
      :goodsItem="item"
    />
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

export default {
  name: "GoodsList",
  props: {
    // home组件传值给该组件
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  components: {
    GoodsListItem,
  },
};
</script>

<style lang="css" scoped>
  .goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }
</style>