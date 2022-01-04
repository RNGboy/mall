import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from "./store/index"

// 导入解决移动端300ms延迟插件
import FastClick from "fastclick"

// 导入vue图片懒加载插件
import VueLazyload from "vue-lazyload"

// 导入自定义提示插件toast
import toast from "components/common/toast"


Vue.config.productionTip = false

// 赋值$bus,Vue实例是能作为事件总线的
Vue.prototype.$bus = new Vue()

// 安装vue-lazyload插件
Vue.use(VueLazyload, {
    loading: require('assets/img/common/placeholder.png'),
})

// 安装toast插件
Vue.use(toast)

// 使用解决移动端300ms延迟插件
FastClick.attach(document.body)


new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')