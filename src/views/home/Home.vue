<template>
  <div class="home">
    <Head></Head>
    <div>
      <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item v-for="item in imageArray" :key="item.id">
          <img
            :src="item.src"
            width="100%"
            height="100%"
            alt="找不到图片"
            @click="item.f()"
          />
        </el-carousel-item>
      </el-carousel>
    </div>

    <footer>
      <div class="discuss">
        <div><span>|</span> <span class="text">讨论专区</span></div>
        <div class="banner">
          <div>
            <i class="icon iconfont icon-dongtai"></i>
            <span @click="postDiscuss">发动态</span>
          </div>
          <div>
            <i class="icon iconfont icon-wenhao-yuankuang"></i
            ><span>问题求助</span>
          </div>
          <div>
            <i class="icon iconfont icon-keaide"></i><span>学习心得</span>
          </div>
        </div>
      </div>
      <div class="knowledge">
        <div><span>|</span> <span class="text">知识专区</span></div>
        <div class="banner">
          <div>
            <i class="icon iconfont icon-shu"></i>
            <span>电子书</span>
          </div>
          <div><i class="icon iconfont icon-tiku"></i><span>题库</span></div>
          <div>
            <i class="icon iconfont icon-lishi"></i><span>历史和发展</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Head from "../../components/Head.vue";
export default {
  data() {
    return {
      imageArray: [
        {
          id: 1,
          src: require("../../image/main-1.jpg"),
          f: () => {
            this.$router.push("/carousel/main1");
          },
        },
        {
          id: 2,
          src: require("../../image/main-2.jpg"),
          f: () => {
            this.$router.push("/carousel/main2");
          },
        },
        {
          id: 3,
          src: require("../../image/main-3.jpg"),
          f: () => {
            this.$router.push("/carousel/main3");
          },
        },
      ],
    };
  },
  methods: {
    postDiscuss() {
      this.$router.push("/postDiscuss");
    },
  },
  components: {
    Head,
  },
};
</script>

<style lang="less" scoped>
.home {
  padding: 20px 80px;

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  footer {
    .banner {
      display: flex;
      margin: 10px 0;
      width: 300px;
      justify-content: space-between;
      span:hover {
        cursor: pointer;
      }
      i {
        padding-right: 8px;
      }
    }
    .text {
      padding-left: 10px;
    }
  }
}
</style>
