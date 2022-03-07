<template>
  <div>
    <div v-for="(comment, index) in activeComment" :key="comment.commentId">
      <div>
        {{ comment.username }}评论了:{{ comment.commentContent }}
        <span class="reply"><a @click.stop="reply(index)">回复</a></span>
      </div>
      <ul>
        <li v-for="reply in comments(comment.commentId)" :key="reply.replyId">
          {{ reply.username }}回复{{ comment.username }}:{{
            reply.replyContent
          }}
        </li>
      </ul>
      <div v-show="isShowArray[index]">
        <el-input
          ref="reply-input"
          v-model.trim="replyContent"
          class="reply-input"
        />
        <div>
          <el-button type="primary" @click.stop="reply(index)"
            >取消回复</el-button
          >
          <el-button type="success" @click.stop="postReply(comment.commentId)"
            >发表</el-button
          >
        </div>
      </div>
    </div>
    <div class="comment">
      <el-input
        v-model.trim="commentContent"
        class="comment-input"
        ref="comment"
      ></el-input>
      <el-button type="primary" @click="postComment">评论</el-button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      commentContent: "",
      replyContent: "",
      lastClick: null,
      isShowArray: new Array(this.activeComment.length).fill(false),
    };
  },
  props: {
    activeComment: {
      type: Array,
      required: true,
    },
    //当前文章的所有评论
    activeReply: {
      type: Array,
      required: true,
    },
    //如果这两个数组没序，则要先对他们排个序
    activeArticle: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },

  computed: {
    comments() {
      return function (commentId) {
        const index = this.activeReply.findIndex(
          //因为这里每个评论对应的回复是数组，所以value[0]
          (value) => value[0].commentId == commentId
        );
        return this.activeReply[index];
      };
    },
  },

  methods: {
    async postComment() {
      //发送一个post请求，将评论存入数据库,然后res.send（）将刚刚存入的数据返回回来
      //如果有数据就发送
      if (this.commentContent.length) {
        const res = await axios.post("/article/comment", {
          commentUserId: this.user.uid,
          username: this.user.username,
          articleId: this.activeArticle.articleId,
          commentContent: this.commentContent,
        });
        this.commentContent = "";
        const comment = res.data;
        this.activeComment.push(comment);
      }
    },

    //回复的按钮
    reply(index) {
      if (this.lastClick == null) {
        this.lastClick = index;
      } else if (index !== this.lastClick) {
        //当这一次点击的按钮和上一次的不一样时，清除上一个，让上一个隐藏
        this.isShowArray.splice(this.lastClick, 1, false);
        this.replyContent = "";
        this.lastClick = index;
      }
      this.isShowArray.splice(index, 1, !this.isShowArray[index]);
    },

    //发表回复
    //post请求将评论发送到数据库
    // commentId,replyUserId,username,replyContent
    async postReply(commentId) {
      //有内容
      if (this.replyContent.length) {
        //找到对应这个回复是在哪个评论下的
        const index = this.activeReply.findIndex(
          //因为这里每个评论对应的回复是数组，所以value[0]
          (value) => value[0].commentId == commentId
        );

        const newReply = await axios.post("/article/reply", {
          commentId,
          replyUserId: this.user.uid,
          username: this.user.username,
          replyContent: this.replyContent,
        });
        //这个评论以前有回复
        if (this.activeReply[index]) {
          this.activeReply[index].push(newReply.data);
        } else {
          //创建一个数组，再this.activeReply将这个数组放进去
          const arr = [];
          arr.push(newReply.data);
          this.activeReply.push(arr);
        }
        // 将服务器回来的数据push进去
        this.replyContent = "";
      }
    },
  },
};
</script>
<style lang="less" scoped>
.reply-input {
  width: 400px;
}
.comment {
  display: flex;
  position: relative;
  right: 80px;
  .comment-input {
    width: 400px;
    border: 1px solid #ccc;
  }
  .reply {
    :hover {
      cursor: pointer;
    }
    a {
      text-decoration: underline;
      color: skyblue;
    }
  }
}
</style>