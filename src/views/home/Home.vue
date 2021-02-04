<template>
  <div id="home">
    <el-container>
      <el-header>
        <div class="logo">
          <img src="" alt="" />
        </div>

        <div class="avatar">
          <el-avatar :size="40" src=""></el-avatar>
          <span class="nickName">{{ uname }}</span>
        </div>

        <div class="out" @click="out">
          <span>退出登录</span>
        </div>
      </el-header>

      <el-container>
        <el-aside :width="isCollapse ? '65px' : '200px'">
          <div class="toggle" @click="toggle">
            <i class="el-icon-more"></i>
          </div>
          <el-menu
            default-active="/index"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse="isCollapse"
            :collapse-transition="false"
            router
          >
            <el-menu-item index="/index">
              <slot name="icon-one"><i class="el-icon-menu"></i></slot>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/student">
              <slot name="icon-two"><i class="el-icon-menu"></i></slot>
              <span slot="title">学生管理</span>
            </el-menu-item>
            <el-menu-item index="/teacher">
              <slot name="icon-three"><i class="el-icon-menu"></i></slot>
              <span slot="title">教师管理</span>
            </el-menu-item>
            <el-menu-item index="/class">
              <slot name="icon-four"><i class="el-icon-menu"></i></slot>
              <span slot="title">班级管理</span>
            </el-menu-item>
            <el-menu-item index="/admin" v-show="id === 'admin'">
              <slot name="icon-four"><i class="el-icon-menu"></i></slot>
              <span slot="title">管理员</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      // 是否折叠侧边栏
      isCollapse: false,
      // 当前用户名
      uname: "",
      // 当前用户数据
      userData: [],
      // 当前用户身份
      id: "",
    };
  },
  created() {
    this.uname = window.sessionStorage.getItem("username");
    console.log(this.uname);

    let curUser = window.sessionStorage.getItem("curUser");
    this.userData = JSON.parse(curUser);
    console.log(this.userData);

    this.id = window.sessionStorage.getItem("identity");
    console.log(this.id);
  },
  mounted() {},
  methods: {
    toggle() {
      this.isCollapse = !this.isCollapse;
    },
    out() {
      setTimeout(() => {
        this.$confirm("是否确认退出登录？", "提示", {
          confirmButtonText: "走起",
          cancelButtonText: "稍等",
        })
          .then(() => {
            window.sessionStorage.clear();
            this.$router.push("/login");
          })
          .catch(() => {
            this.isLoading = false;
            this.$message({
              type: "info",
              message: "稍等片刻",
            });
          });
      }, 500);
    },
  },
};
</script>

<style scoped>
#home {
  width: 100%;
  height: calc(100vh);
}
/* 容器区域 */
.el-container {
  width: 100%;
  height: 100%;
}
.el-header {
  background-color: #545c64;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0 220px;
  position: relative;
}
.el-aside {
  background-color: #545c64;
  color: #333;
  line-height: 200px;
  /* padding: 20px 0 0;
    margin-top: 20px; */
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  /* text-align: center; */
  /* line-height: 160px; */
}

/* 头部导航栏区域 */
.el-menu-demo {
  width: 1096px;
  height: 100%;
}
.logo {
  width: 60px;
  height: 60px;
  position: absolute;
  left: 4%;
  top: 0;
}
.logo img {
  width: 100%;
  height: 100%;
}

/* 侧边栏区域 */
.tac,
.el-col {
  width: 100%;
  height: auto;
  background-color: #545c64;
}
.el-menu,
.el-menu--horizontal {
  border: none !important;
}

/* 用户头像 */
.avatar {
  width: 120px;
  height: 60px;
  position: absolute;
  right: 14%;
  top: 0;
}
.el-avatar--circle {
  vertical-align: top;
  margin-top: 10px;
}
.nickName {
  font-size: 20px;
  margin-left: 10px;
  color: #fff;
}

/* 退出登录 */
.out {
  width: 80px;
  height: 60px;
  position: absolute;
  right: 5%;
  top: 0;
  color: #ccc;
  cursor: pointer;
}

.toggle {
  width: 100%;
  height: 30px;
  background-color: #475163;
  color: #f1f1f1;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
</style>