// import { debouce } from "./utils"
// 导入回到顶部组件
import BackTop from "components/content/backTop/BackTop";


export const itemListenerMixin = {

    methods: {
        colo() {
            console.log("我是混入中的内容")
        }
    },

}

// 回到顶部按钮功能抽离混入
export const backTopMixin = {
    // 混入对象中注册组件
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false //控制回到顶部按钮显示隐藏变量
        }
    },
    methods: {
        showBackTop(position) {
            this.isShopBackTop = (-position.y) > 1000 ? true : false
        },
        backTop() {
            // 回到顶部功能实现
            this.$refs.scroll.scrollTo(0, 0, 300)
        },
        // 监听滚动
        contentScroll(position) {
            // 1.判断backTop是否显示
            this.isShoeBackTop = -position.y > 1000;

            // 2.决定tabControl是否吸顶(position:fixed)
            this.isTabFixed = -position.y > this.tabOffsetTop;
        },
    },
}