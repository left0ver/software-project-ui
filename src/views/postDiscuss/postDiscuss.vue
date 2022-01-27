<template>
  <div>
    <div class="postDiscuss">
      <div class="title">
        <span>标题</span>
        <el-input
          class="title-input"
          placeholder="输入标题"
          v-model.trim="title"
        ></el-input>
      </div>
      <div class="content">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="articleContent"
          resize="none"
          class="content-input"
          :rows="25"
        >
        </el-input>
      </div>
      <el-button type="success" class="post" @click="post">发布</el-button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { Message } from "element-ui";
export default {
  data() {
    return {
      title: "",
      articleContent: "",
    };
  },
  methods: {
    async post() {
      this.articleContent = this.articleContent.replace(/(^\s*|\s*$)/g, "");
      if (!this.articleContent.length) {
        Message({
          message: "内容不能为空且不能全是空格",
          type: "error",
          duration: 800,
        });
        return;
      }
      if (this.title.length) {
        const res = await axios.post("http://localhost:8000/article", {
          title: this.title,
          articleContent: this.articleContent,
          like: 0,
          collection: 0,
        });
        if (res.data.code == 1) {
          this.title = "";
          this.articleContent = "";
          Message({
            message: "发布成功",
            type: "success",
            duration: 1500,
          });
          this.$router.push("/article");
        }
      } else {
        Message({
          message: "标题不能为空",
          type: "error",
          duration: 800,
        });
        return;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.postDiscuss {
  position: relative;
  top: 0;
  left: 0;
  .title {
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    .title-input {
      width: 300px;
    }
  }
  .content {
    position: absolute;
    top: 100px;
    left: 30%;
    .content-input {
      width: 380%;
    }
  }
  .post {
    position: absolute;
    top: 654px;
    left: 50%;
  }
}
</style>