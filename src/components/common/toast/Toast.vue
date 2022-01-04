<template>
  <div v-show="isShow" class="toast">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "",
      isShow: false
    };
  },
  methods: {
    show(message = "默认文字", duration = "2000") {
      console.log("执行");
      this.isShow = true;
      this.message = message;

      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    }
  }
};
</script>
<style lang="css" scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /*修正位置,使其居中*/
  padding: 8px 10px;
  z-index: 999;

  background-color: rgba(0, 0, 0, 0.75);
  color: #fff;
}
</style>
