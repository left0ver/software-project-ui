<template>
  <div id="first">
    <div class="container">
      <div id="welcome">欢迎来到软件学习平台</div>
      <el-tabs v-model="activeName" type="card" stretch>
        <el-tab-pane label="用户登录" name="login">
          <login></login>
        </el-tab-pane>
        <el-tab-pane label="用户注册" name="register">
          <register @changePage="toLogin"></register>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

 <script>
import Login from "../../components/Login.vue";
import Register from "../../components/Register/Register.vue";
export default {
  data() {
    return {
      activeName: "login",
    };
  },

  methods: {
    //切换登录和注册的标签页
    toLogin(value) {
      this.activeName = value;
    },
  },
  components: { Login, Register },
};
</script>
<style lang="less" scoped>
#first {
  width: 100%;
  height: 800px;
  background: url("../../image/bg.jpg") no-repeat;
}
.container {
  width: 450px;
  height: 500px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f5f5f5;
  border-radius: 10px;
  #welcome {
    margin: 20px 100px 10px;
    font-weight: bold;
    font-size: 20px;
    font-family: "SimSun";
    color: #707074;
  }
}
</style>