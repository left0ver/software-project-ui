<template>
  <div id="article">
    <Head></Head>
    <el-collapse accordion id="main-article">
      <el-collapse-item
        v-for="article in articles"
        :key="article.articleId"
        @click.native="articleClicked(article.articleId)"
        class="collapse"
      >
        <template slot="title">
          <div class="title">{{ article.title }}</div>
        </template>
        <div class="article-content">{{ activeArticle.articleContent }}</div>
        <div class="footer-father">
          <div class="footer">
            <div class="like footer-group">
              <span
                class="icon iconfont icon-dianzan-copy"
                :class="{ liked: isFavorite }"
                @click.stop="like(article.articleId)"
              >
              </span>
              <span>{{ activeArticle.like }}</span>
            </div>
            <div class="footer-group">
              <span
                class="el-icon-s-comment"
                @click.stop="comment(article.articleId)"
              ></span>
            </div>
            <div class="star footer-group">
              <span
                class="el-icon-star-on"
                :class="{ collected: isCollection }"
                @click.stop="collect(article.articleId)"
              ></span>
              <span>{{ activeArticle.collection }}</span>
            </div>
          </div>
        </div>
        <!-- 添加一个点击事件，防止冒泡 -->
        <div class="comment-father">
          <div class="comment" @click.stop="">
            <comment
              :activeComment="activeComment"
              :activeReply="activeReply"
              :activeArticle="activeArticle"
              :user="user"
              v-if="commentIsShow"
            ></comment>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import axios from "axios";
import Comment from "../../components/comment/Comment.vue";
import Head from "../../components/Head.vue";
export default {
  data() {
    return {
      //   article: {
      //     //文章的id
      //     articleId: 1,
      //     //文章标题
      //     title: "",
      //     // 文章的主体内容
      //     articleContent: "",
      //     //点赞数
      //     like: 0,
      //     //收藏数
      //     collection: 0,
      //   },

      //   comment: {
      //     //评论的编号
      //     commentId: 1,
      //     //评论的用户id
      //     commentUserId: 1,
      //     username:""
      //     //评论的文章的编号
      //     articleId: 1,
      //     //评论的的内容
      //     commentContent: "",
      //   },

      //   reply: {
      //     //回复的是哪条评论
      // replyId:
      //     commentId: 1,
      //     //哪个用户回复的
      //     replyUserId: 1,
      //     username:""
      //     //回复的内容
      //     replyContent: "",
      //   },

      //   //点赞，收藏的数据库
      //   like: {
      //     //文章编号
      //     articleId: 1,
      //     //用户id
      //     uid: 1,
      //     //是否点赞
      //     isFavorite: false,
      //     // 是否收藏
      //     isCollection: false,
      //   },
      //   user: {
      //     uid: 1,
      //     username: "zwczww",
      //     email: "",
      //     password: "",
      //     sex: "male",
      //   },
      //用户的数据
      user: {},
      //文章的数组
      articles: [],
      //用户点的那篇文章的点赞的数据
      activeLike: {},
      //用户点的那篇文章的数据
      activeArticle: {},
      //用户点的那篇文章的评论的数据
      activeComment: [],
      //每条评论对应的回复的数据
      activeReply: [],
      isFavorite: false,
      isCollection: false,
      commentIsShow: false,
    };
  },
  components: { Comment, Head },
  methods: {
    async like(articleId) {
      this.isFavorite = !this.isFavorite;
      //如果isFavorite为true，说明用户是点赞，否则则是用户取消点赞
      if (this.isFavorite) {
        this.activeArticle.like++;
      } else {
        this.activeArticle.like--;
      }
      //put请求将articleId和点赞数量,like (用来说明更新哪个字段)放请求体中，更新数据库对应文章的点赞数量
      //   axios.put("");
      //更新文章的点赞的数量
      axios.put("http://localhost:8000/article", {
        articleId,
        updateValue: this.activeArticle.like,
        updateFiled: "like",
      });

      // 这里
      //put请求将articleId和用户id isFavorite 和isFavorite的值  放请求体中，更新数据库对应文章的是否点赞的信息
      //更新数据库用户点赞数量的信息
      //更新点赞数据库是否点赞的的信息
      await axios.put("http://localhost:8000/article/like", {
        articleId,
        uid: this.user.uid,
        updateValue: this.isFavorite,
        updateFiled: "isFavorite",
      });
    },

    collect(articleId) {
      this.isCollection = !this.isCollection;
      if (this.isCollection) {
        this.activeArticle.collection++;
      } else {
        this.activeArticle.collection--;
      }
      axios.put("http://localhost:8000/article", {
        articleId,
        updateValue: this.activeArticle.collection,
        updateFiled: "collection",
      });
      axios.put("http://localhost:8000/article/like", {
        articleId,
        uid: this.user.uid,
        updateValue: this.isCollection,
        updateFiled: "isCollection",
      });
      //put请求将articleId和收藏数量,collection (用来说明更新哪个字段)放请求体中，更新数据库对应文章的点赞数量
      //   axios.put("");
      //put请求将articleId和用户id isCollection isCollection的值  放请求体中，更新数据库对应文章的是否点赞的信息
      //更新数据库用户收藏数量的信息
      //更新like数据库是否收藏的的信息
    },

    async articleClicked(articleId) {
      //根据articleId和uid请求文章点赞和收藏的数据
      //这里请求过去，后端需要根据articleId和uid查询对应的数据并返回
      this.commentIsShow = false;
      const activeLike = await axios.get("http://localhost:8000/article/like", {
        params: { articleId, uid: this.user.uid },
      });
      if (!activeLike.data) {
        //用户之前没有访问过这篇文章
        //发送请求，添加点赞和收藏的记录
        this.activeLike = {
          articleId,
          uid: this.user.uid,
          isFavorite: false,
          isCollection: false,
        };
        //添加数据
        axios.post("http://localhost:8000/article/like", {
          ...this.activeLike,
        });
      } else {
        //用户之前访问过这篇文章
        this.activeLike = activeLike.data;
        this.activeLike = {
          articleId: activeLike.data.articleId,
          uid: activeLike.data.uid,
          isFavorite: activeLike.data.isFavorite[0] == "t" ? true : false,
          isCollection: activeLike.data.isCollection[0] == "t" ? true : false,
        };
      }

      this.isFavorite = this.activeLike.isFavorite;
      this.isCollection = this.activeLike.isCollection;
      //根据articleId请求用户当前点的这篇文章的数据
      const activeArticle = await axios.get("http://localhost:8000/article", {
        params: {
          articleId,
        },
      });
      //将activeArticle赋值给this.activeArticle
      this.activeArticle = activeArticle.data;

      //根据文章编号请求对应文章所有的评论信息
      const activeComment = await axios.get(
        "http://localhost:8000/article/comment",
        {
          params: { articleId: this.activeArticle.articleId },
        }
      );
      //将请求过来的结果给this.activeComment  (一个数组）
      this.activeComment = activeComment.data;

      //遍历this.activeComment，根据评论的编号请求这条评论的回复信息
      for (let item of this.activeComment) {
        const activeReply = await axios.get(
          "http://localhost:8000/article/reply",
          {
            params: { commentId: item.commentId },
          }
        );
        //一条评论可能有多个回复，所以要把数组push 到this.activeReply
        //返回回来的可能是个空数组，这里需要判断一下
        if (activeReply.data.length) {
          this.activeReply.push([...activeReply.data]);
        }
      }
      //最后不知道this.activeComment和this.activeReply数组是不是有序的，本来是要按时间排序，这里按用户id排序
    },

    //点击评论的事件
    comment() {
      this.commentIsShow = !this.commentIsShow;
    },
  },

  async beforeRouteEnter(to, from, next) {
    if (to.path === "/article") {
      //请求所有文章的数据
      const articles = await axios.get("http://localhost:8000/article");
      next(async (vm) => {
        vm.articles = articles.data;
        vm.user = JSON.parse(localStorage.getItem("user"));
      });
    }
  },
};
</script>

<style lang="less" scoped>
#article {
  width: 80%;
  margin: 0 auto;
  #main-article {
    margin-top: 30px;
    .collapse {
      .title {
        text-align: center;
        position: relative;
        left: 50%;
        font-weight: bold;
        font-size: 17px;
        transform: translateX(-50%);
      }
      .article-content {
        padding-left: 100px;
        padding-right: 100px;
        font-size: 15px;
        border-bottom: 1px solid gray;
      }
      .liked {
        color: #fc5531;
      }
      .collected {
        color: #fc5531;
      }
      .footer-father {
        padding-bottom: 40px;
        position: relative;

        .footer {
          position: absolute;
          right: 100px;
          display: flex;
          justify-content: space-between;
          .footer-group {
            padding-left: 10px;
            font-size: 22px;
            span:hover {
              cursor: pointer;
            }
          }
        }
      }
      .comment-father {
        // position: relative;
        .comment {
          margin-top: 30px;
          margin-bottom: 30px;
          position: relative;
          left: 800px;
        }
      }
    }
  }
}
</style>