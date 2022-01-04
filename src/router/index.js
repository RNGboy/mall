import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("../views/home/Home");
const Category = () => import("../views/category/Category");
const Cart = () => import("../views/cart/Cart");
const Profile = () => import("../views/profile/Profile");
const Detail = () => import("../views/detail/Detail");

// 1安装
Vue.use(VueRouter);

// 2创建路由对象
const routes = [
  //配置映射关系
  { path: "", redirect: "/home" },
  { path: "/home", component: Home },
  { path: "/category", component: Category },
  { path: "/cart", component: Cart },
  { path: "/profile", component: Profile },
  { path: "/detail/:iid", component: Detail }
];
const router = new VueRouter({
  routes,
  // 默认路由使用哈希模式，更改为history模式
  mode: "history"
});

// 3导出router
export default router;
