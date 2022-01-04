// 封装全局组件Toast
import Toast from "./Toast"

const obj = {
    // 该函数会将Vue作为参数传递过来
    install: function(Vue) {

        // 1.创建组件构造器,并传入组件
        const toastContrustor = Vue.extend(Toast)
            // 2.new的方式，根据组件构造器，可以创建出来一个组件对象
        const toast = new toastContrustor()

        // 3.将组件对象，手动的挂载到某一个元素上
        toast.$mount(document.createElement('div'))

        // 4.toast.$el对应的就是div
        document.body.appendChild(toast.$el)

        Vue.prototype.$toast = toast;
    }
};



export default obj