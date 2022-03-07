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
      <el-form-item prop="verifyCode">
        <div class="verify-code">
          <div>
            <el-input
              placeholder="验证码"
              v-model="loginForm.verifyCode"
              :validate-event="false"
              @focus="clearErrorMessage('loginForm')"
            ></el-input>
          </div>

          <div><img :src="codeSrc" @click="changeCode" alt="图片验证码" /></div>
        </div>
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
import baseUrl from "../config/baseUrl";
export default {
  data() {
    //用户名和密码自定义验证
    const confirmUser = (_, value, callback) => {
      if (value && this.loginForm.password) {
        axios
          .post(
            "/login",
            {
              username: this.loginForm.username,
              password: this.loginForm.password,
            },
            { withCredentials: true }
          )
          .then((res) => {
            const { code, message } = res.data;
            sessionStorage.setItem("user", JSON.stringify(res.data));
            if (code === 0) {
              return callback(new Error(message));
            }
            return callback();
          });
      }
    };
    //验证码自定义验证
    const checkVerifyCode = function (_, value, callback) {
      if (value.length > 0) {
        axios
          .post(
            "/login/code",
            {
              verifyCode: value,
            },
            { withCredentials: true }
          )
          .then((res) => {
            const { code, message } = res.data;
            if (code === 0) {
              return callback(new Error(message));
            }
            return callback();
          });
      }
    };

    return {
      loginForm: {
        username: "",
        password: "",
        verifyCode: "",
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

        verifyCode: [
          {
            required: true,
            message: "请输入验证码",
          },
          {
            validator: checkVerifyCode,
          },
        ],
      },
      codeSrc: `${baseUrl}/code?t=${new Date().getTime()}`,
    };
  },

  methods: {
    login(fromName) {
      //验证用户名
      this.$refs[fromName].validateField("verifyCode", (errMessage) => {
        if (errMessage) {
          Message({
            message: "登录失败",
            type: "error",
            duration: 1000,
          });
          return;
        }
        //验证用户名和密码
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
      });
    },
    //清除验证的信息
    clearErrorMessage(formName) {
      this.$refs[formName].clearValidate();
    },
    changeCode() {
      this.codeSrc = `${baseUrl}/code?t=${new Date().getTime()}`;
      this.loginForm.verifyCode = "";
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
  .verify-code {
    display: flex;
  }
  .button-login {
    margin-top: 30px;
    margin-left: 95px;
  }
}
</style>