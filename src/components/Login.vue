<template>
  <div class="login">
    <el-form status-icon :rules="loginRules" ref="loginForm" :model="loginForm">
      <el-form-item prop="username">
        <el-input
          prefix-icon="el-icon-user-solid"
          size="medium"
          class="input-login"
          v-model="loginForm.username"
          placeholder="用户名"
          :validate-event="false"
          @focus="clearErrorMessage('loginForm')"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          class="input-login"
          v-model="loginForm.password"
          placeholder="密码"
          :validate-event="false"
          @focus="clearErrorMessage('loginForm')"
        >
          <i slot="prefix" class="icon iconfont icon-password"> </i>
        </el-input>
      </el-form-item>
      <el-form-item
        ><el-button
          type="success"
          class="button-login"
          @click="login('loginForm')"
        >
          登录</el-button
        ></el-form-item
      >
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import { Message } from "element-ui";
export default {
  data() {
    const confirmUser = (_, value, callback) => {
      if (value && this.loginForm.password) {
        axios
          .post("http://localhost:8000/login", {
            ...this.loginForm,
          })
          .then((res) => {
            const { code } = res.data;
            localStorage.setItem("user", JSON.stringify(res.data));
            if (code == 0) {
              callback(new Error("用户名或密码错误"));
            } else {
              callback();
            }
          });
      }
    };

    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
          },

          {
            validator: confirmUser,
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
          },
        ],
      },
    };
  },

  methods: {
    login(fromName) {
      //验证用户名
      this.$refs[fromName].validateField("username", (errMessage) => {
        if (!errMessage) {
          this.$router.replace("/home");
          Message({
            message: "登录成功",
            type: "success",
            duration: 1000,
          });
        } else {
          Message({
            message: "登录失败",
            type: "error",
            duration: 1000,
          });
        }
      });
      //验证密码
      this.$refs[fromName].validateField("password");
    },
    //清除验证的信息
    clearErrorMessage(formName) {
      this.$refs[formName].clearValidate();
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 300px;
  margin: 10px auto;
  .input-login {
    width: 250px;
  }
  .button-login {
    margin-top: 30px;
    margin-left: 95px;
  }
}
</style>