<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="titles"
      @tabClick="tabClick"
      class="tab-control"
      v-show="isTabFixed"
      ref="tabControl1"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="probeType"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="titles" @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="showGoods" />
    </scroll>

    <!-- 组件监听点击（不是组件内部，而是整个组件本身）需要添加native修饰符 -->
    <back-top @click.native="backClick" v-show="isShoeBackTop" />
  </div>
</template>

<script>
// home相关子组件模块
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

// 公共组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/content/backTop/BackTop.vue";

// 网络请求数据模块
import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      probeType: 3,
      isShoeBackTop: false, //回到顶部按钮展示判断
      isPullUpLoad: false, //上拉加载判断
      tabOffsetTop: 0,
      isTabFixed: false
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },

  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },

  mounted() {
    // 1.图片加载完成的事件监听
    // 防抖函数  （功能性函数抽离到utils.js文件中）
    const refresh = debounce(this.$refs.scroll.refresh, 500);

    // 监听item中图片加载完成
    this.$bus.$on("itemImgLoad", () => {
      // console.log("图片加载完成");
      refresh();
    });
  },
  destroyed() {
    // console.log('销毁')
  },

  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 回到顶部按钮
    backClick() {
      // console.log("回到顶部");
      this.$refs.scroll.scrollTo(0, 0, 1000);
      // console.log(this.$refs);
    },
    // 监听滚动
    contentScroll(position) {
      // 1.判断backTop是否显示
      this.isShoeBackTop = -position.y > 1000;

      // 2.决定tabControl是否吸顶(position:fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    // 监听上拉加载请求更多
    loadMore() {
      // console.log("加载更多");
      // this.isPullUpLoad = true;
      this.getHomeGoods(this.currentType);
      // this.$refs.scroll.finishPullUp();
      // this.$refs.scroll.refresh();
      // this.isPullUpLoad = false;
    },
    // 监听轮播图加载
    swiperImageLoad() {
      // 赋值
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.tabOffsetTop);
    },

    /**
     * 网络请求相关方法
     */
    // 对getHomeMultidata方法进行再次包装
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res)
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },

    // 对getHomeGoods方法进行再次包装
    getHomeGoods(type) {
      // 主要逻辑
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style lang="css" scoped>
#home {
  height: 100vh;
  /* padding-top: 44px; */
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;

  /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

/* 方案一 */
.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
  background: #fff;
}

/* 方案二 */
/* .content{
  height: calc(100% - 49px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>
