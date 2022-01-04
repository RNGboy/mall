<template>
  <!-- 二次封装better-scroll，解耦对插件的依赖，只基于对Scroll组件依赖 -->
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
// import MouseWheel from "@better-scroll/mouse-wheel";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null,
      mouseWheel: {
        speed: 20,
        invert: false,
        easeTime: 300
      }
    };
  },
  mounted() {
    // 创建scroll实例对象,
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType | 2,
      pullUpLoad: this.pullUpLoad | true,
      click: true,
      mouseWheel: this.mouseWheel
    });

    // 监听上拉加载事件
    this.scroll.on("pullingUp", () => {
      // 自定义上拉加载请求事件
      this.$emit("pullingUp");

      // 重新计算 BetterScroll，当 DOM 结构发生变化的时候调用确保滚动的效果正常。
      this.refresh();
    });

    // 监听滚动位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        // 自定义scroll事件，把position发送出去
        this.$emit("scroll", position);
      });
    }

    // 监听scroll滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // console.log('监听滚动到底部')
        this.$emit("pullingUp");
      });
    }
  },

  methods: {
    // 对scrollTo方法进行二次封装，参数time=300是es6写法
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },

    // 对finishPullUp二次封装
    finishPullUp() {
      this.scroll.finishPullUp();
    },

    // 对refresh二次封装
    refresh() {
      console.log("防抖函数");
      this.scroll && this.scroll.refresh();
    }
  }
};
</script>

<style lang="css" scoped></style>
