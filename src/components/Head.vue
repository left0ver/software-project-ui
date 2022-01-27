<template>
  <div>
    <header>
      <div>
        <div><img src="../image/logo.png" width="150px" /></div>
      </div>
      <div>
        <el-input
          v-model="search"
          prefix-icon="el-icon-search"
          class="search"
        ></el-input>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div>
        <el-dropdown class="drop-down-menu" size="primary">
          <span class="el-dropdown-link">
            <i class="el-icon-s-custom user-icon"></i>
            个人中心<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>个人收藏</el-dropdown-item>
            <el-dropdown-item>历史浏览</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>
    <nav>
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <div class="nav-menu">
          <el-menu-item index="1" class="nav-menu-item" @click="toHome"
            >首页</el-menu-item
          >
          <el-menu-item index="2" class="nav-menu-item" @click="toArticle"
            >讨论专区</el-menu-item
          >
          <el-menu-item index="3" class="nav-menu-item">知识模块</el-menu-item>
          <el-menu-item index="4" class="nav-menu-item">软考专区</el-menu-item>
          <el-menu-item index="5" class="nav-menu-item"
            >软件工程历史</el-menu-item
          >
          <el-menu-item index="6" class="nav-menu-item"
            >初学者推荐</el-menu-item
          >
          <el-menu-item index="7" class="nav-menu-item"
            >在职人推荐</el-menu-item
          >
          <el-menu-item index="8" class="nav-menu-item">大神答疑</el-menu-item>
          <el-menu-item index="9" class="nav-menu-item"
            >需求分析专区</el-menu-item
          >
          <el-menu-item index="10" class="nav-menu-item"
            >结构化设计专区</el-menu-item
          >
          <el-menu-item index="11" class="nav-menu-item"
            >面向对象设计专区</el-menu-item
          >
          <el-menu-item index="12" class="nav-menu-item">测试专区</el-menu-item>
        </div>
      </el-menu>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      activeIndex: "1",
    };
  },
  methods: {
    toArticle() {
      this.$router.push("/article");
    },
    toHome() {
      this.$router.push("/home");
    },
  },
};
</script>

<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .search {
    width: 300px;
    outline: solid skyblue 0.5px;
    margin-right: 10px;
  }
  .drop-down-menu {
    font-size: 16px;
    .el-dropdown-link {
      cursor: pointer;
      color: #606266;
      font-size: 14px;
      .user-icon {
        padding: 0 8px;
      }
    }
  }
}
nav {
  margin-top: 15px;
  margin-bottom: 20px;
  .nav-menu {
    display: flex;
    justify-content: space-between;
    .nav-menu-item {
    }
  }
}
</style>
