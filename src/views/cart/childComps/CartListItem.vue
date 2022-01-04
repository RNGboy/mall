<template>
  <div id="shop-item">
    <!-- 勾选按钮 -->
    <div class="item-selector">
      <check-button
        :is-checked="product.checked"
        @click.native="checkClick"
      ></check-button>
    </div>
    <!-- 展示图片 -->
    <div class="item-img">
      <img :src="product.image" alt="商品图片" />
    </div>
    <!-- 展示文字信息 -->
    <div class="item-info">
      <div class="item-title">
        {{ product.title }}
      </div>
      <div class="item-desc">
        {{ product.desc }}
      </div>
      <div class="info-bottom">
        <!-- 左边价格 -->
        <div class="item-price left">￥{{ product.price }}</div>
        <!-- 右边购物数量 -->
        <div class="item-count right">x{{ product.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/CheckButton/CheckButton";

export default {
  name: "CartListItem",
  components: {
    CheckButton
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    checkClick() {
      this.product.checked = !this.product.checked;
    }
  },

  mounted() {
    // console.log(this.product);
  }
};
</script>
<style lang="css" scoped>
#shop-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.item-selector {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-img {
  padding: 5px;
}

.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}

.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}

.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info-bottom .item-price {
  color: orangered;
}
</style>
