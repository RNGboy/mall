import Vue from "vue"
import Vuex from "vuex"
import getters from "./getters"


// 1.安装插件
Vue.use(Vuex)

// 2.创建Store实例对象
const store = new Vuex.Store({
    state: {
        cartList: [], //放一个变量用于存储
    },
    // mutations唯一的目的就是修改state中的状态
    // mutations中的每个方法尽可能完成的事件比较单一一点
    mutations: {
        // 该方法设计上不适合在mutations中做逻辑判断和异步操作，已在action中重构，故注释
        // addCart(state, payload) { //此时product就是payload
        //     // 实现方式一：
        //     // 做判断，遍历旧数组项跟要新添加的数据，
        //     // 对比，相同count+1，新的push进去
        //     let oldProduct = null
        //     for (let item of state.cartList) {
        //         if (item.iid === payload.iid) {
        //             // 此时旧数据和新数据是一样的
        //             oldProduct = item
        //         }
        //     }
        //     // 实现方式二：
        //     // let oldProduct = state.cartList.find(item => item.iid === payload.iid)

        //     // 判断oldProduct
        //     if (oldProduct) {
        //         oldProduct.count += 1
        //     } else {
        //         payload.count = 1
        //         state.cartList.push(payload)
        //     }
        //     console.log("已添加")
        // }


        // 重构代码
        addCounter(state, payload) {
            payload.count++
        },
        addToCart(state, payload) {
            payload.checked = true
            state.cartList.push(payload)
        }
    },

    actions: {
        addCart(context, payload) { //此时product就是payload
            return new Promise((resolve) => {
                // 查找之前数组中是否有该商品
                let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

                // 判断oldProduct
                // 任务分发
                if (oldProduct) {
                    context.commit('addCounter', oldProduct)
                    resolve("当前商品数量加1")
                } else {
                    payload.count = 1
                    context.commit('addToCart', payload)
                    resolve('添加新商品成功')
                }
            })
        }
    },

    getters //请求
})


// 3.导出挂载到Vue实例上
export default store