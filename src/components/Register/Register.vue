<template>
  <div class="register">
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules">
      <el-form-item prop="username">
        <el-input
          prefix-icon="el-icon-user-solid"
          placeholder="用户名"
          v-model="registerForm.username"
          class="input-register"
        ></el-input
      ></el-form-item>
      <el-form-item prop="email">
        <el-input
          placeholder="邮箱"
          v-model="registerForm.email"
          class="input-register"
        >
          <i slot="prefix" class="icon iconfont icon-email"> </i> </el-input
      ></el-form-item>

      <el-form-item prop="password"
        ><el-input
          class="input-register"
          type="password"
          placeholder="密码"
          v-model="registerForm.password"
        >
          <i slot="prefix" class="icon iconfont icon-password"> </i></el-input
      ></el-form-item>

      <el-form-item prop="confirmPassword">
        <el-input
          class="input-register"
          type="password"
          placeholder="确认密码"
          v-model="registerForm.confirmPassword"
        >
          <i slot="prefix" class="icon iconfont icon-querenmima"> </i></el-input
      ></el-form-item>

      <el-form-item prop="sex">
        <div class="sex">
          <div>
            <i class="icon iconfont icon-male"></i>
            <el-radio
              v-model="registerForm.sex"
              label="male"
              size="small"
            ></el-radio>
          </div>
          <div>
            <i class="icon iconfont icon-nv"></i>
            <el-radio
              v-model="registerForm.sex"
              label="female"
              size="small"
            ></el-radio>
          </div>
        </div>
      </el-form-item>

      <el-form-item class="button-register">
        <el-button type="primary" @click="submit('registerForm')"
          >注册</el-button
        >
        <el-button type="danger" @click="reset('registerForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
import { Message } from "element-ui";
export default {
  name: "register",
  data() {
    const checkPassword = (_, value, callback) => {
      if (value && value === this.registerForm.password) {
        callback();
        return;
      }
      callback(new Error("两次输入的密码不一致"));
    };
    //判断用户名是否存在
    const checkUsername = (_, value, callback) => {
      axios
        .get(`http://localhost:8000/register?username=${value}`)
        .then((res) => {
          if (res.data.code == 0) {
            callback(new Error("用户名已经存在"));
            return;
          }
          callback();
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return {
      registerForm: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        sex: "male",
      },
      registerRules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
          {
            message: "用户名必须为5-11位的字母",
            trigger: "blur",
            pattern: /^[a-zA-Z]{5,11}$/,
          },
          {
            trigger: ["change", "blur"],
            validator: checkUsername,
          },
        ],
        email: [
          {
            required: true,
            message: "邮箱地址不能为空",
            trigger: "blur",
          },
          {
            message: "请输入正确的邮箱地址",
            trigger: "blur",
            pattern: /^[a-zA-Z0-9]{5,15}@[a-zA-Z0-9]{2,6}(\.com)$/,
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            message: "密码必须为8-20的数字或字母",
            pattern: /^[a-zA-Z0-9]{8,20}$/,
            trigger: ["change", "blur"],
          },
        ],
        confirmPassword: [
          {
            required: true,
            validator: checkPassword,
            trigger: ["change", "blur"],
          },
        ],
      },
    };
  },

  methods: {
    //提交注册表单
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
            .post("http://localhost:8000/register", {
              username: this.registerForm.username,
              email: this.registerForm.email,
              password: this.registerForm.password,
              sex: this.registerForm.sex,
            })
            .then((res) => {
              if (res.data.code == 1) {
                this.$emit("changePage", "login");
                Message({
                  message: "注册成功",
                  type: "success",
                  duration: 1000,
                });
                this.$refs[formName].resetFields();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },

    reset(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="less" scoped>
.register {
  width: 300px;
  margin: 20px 0 10px 60px;
  .input-register {
    width: 250px;
  }
  .sex {
    display: flex;
    div {
      margin-right: 20px;
    }
  }
  .button-register {
    margin-left: 50px;
  }
}
</style>