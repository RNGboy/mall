<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <keep-alive exclude="Detail">
      <!-- exclude="Detail"表示Detail组件不会被缓存 -->
      <router-view/>
    </keep-alive>
    <main-tab-bar class="tab-item"/>

  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar'
export default {
  name: "App",
  components: {
    MainTabBar
  },
};
</script>

<style>
@import 'assets/css/base.css';

/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

.tab-item{
  position: relative;
  z-index: 10;
}

</style>
