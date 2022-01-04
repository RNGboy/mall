<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" />
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-params-info :param-info="itemParams" />
      <detail-comment-info :comment-info="commentInfo" />
      <goods-list :goods="recommends" />
    </scroll>
    <!-- 底部工具栏 -->
    <detail-bottom-bar @addCart="addToCart" />
    <!-- 回到顶部组件 -->
    <back-top @click.native="backTop" @></back-top>

    <!-- toast组件 -->
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";

import { getDetail, Goods, Shop, getRecommend } from "network/detail";
import { itemListenerMixin, backTopMixin } from "common/mixin";

import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamsInfo from "./childComps/DetailParamsInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import GoodsList from "components/content/goods/GoodsList";
import DetailBottomBar from "./childComps/DetailBottomBar";

// toast组件
// import Toast from "components/common/toast/Toast";

import Scroll from "components/common/scroll/Scroll";

// 映射vuex中actions的方法
import { mapActions } from "vuex";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar
    // Toast
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: null,
      shop: {},
      detailInfo: {}, //封装独立组件展示该变量中的数据
      itemParams: {},
      commentInfo: {},
      recommends: [],
      offsetTopY: [], //效果联动
      currentIndex: 0 //效果联动

      // toast组件传递
      // message: "",
      // show: false
    };
  },
  mixins: [itemListenerMixin, backTopMixin],
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      const data = res.result;

      // 1.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(
        // 整合数据
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3.创建店铺信息
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5.取出参数的信息
      this.itemParams = data.itemParams;

      // 6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    // 3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });


  },
  methods: {
    // vuex中actions方法映射导入
    ...mapActions(["addCart"]),

    // 图片加载监听事件
    imageLoad() {
      this.$refs.ref.scroll.refresh();
      // console.log(this.$refs);
      // console.log("jianting");
    },

    // 监听添加购物车事件
    addToCart() {
      // console.log("-----");
      // 1.获取购物车需要展示的信息，然后添加进去
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车里。使用vuex   3.添加购物车成功  （第一种写法）
      // this.$store.commit(`addCart`, product);   //此写法是基于在vuex中mutations中操作，原则上不适合
      // this.$store
      //   .dispatch("addCart", product) //此写法是重构，vuex中在action中操作
      //   .then(res => {
      //     console.log(res);
      //   });

      // 直接调用vuex中映射的addCart方法  （算是代码重构，本质上还是会去调用dispatch函数）
      this.addCart(product).then(res => {
        // 拿到东西后，展示toast组件
        // this.show = true;
        // this.message = res;
        // console.log(res);

        // setTimeout(() => {
        //   this.show = false;
        //   this.message = "";
        // }, 1500);

        // 调用插件式封装组件
        this.$toast.show(res, 2000);
      });
    }
  },
};
</script>
<style lang="css" scoped>
#detail {
  position: relative;
  z-index: 11;
  height: 100vh;
  background-color: #fff;
}

.detail-nav {
  position: relative;
  z-index: 11;
  background-color: #fff;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
}
</style>
