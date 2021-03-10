<template>
  <div id="home" v-loading="isLoading">
    <el-container>
      <el-header>
        <div class="time">
          <span>{{ time }}</span>
        </div>

        <div class="avatar">
          <el-avatar :size="40" :src="userData[0].avatar"></el-avatar>
          <span
            class="nickName"
            :style="{ color: id === '管理员' ? 'gold' : 'pink' }"
            >{{ userData[0].name }}</span
          >
          <span class="identity">{{ id }}</span>
        </div>

        <div class="out" @click="logout">
          <span>退出登录</span>
        </div>
      </el-header>

      <el-container>
        <el-aside :width="isCollapse ? '65px' : '200px'">
          <div class="toggle" @click="toggle">
            <i class="el-icon-more"></i>
          </div>
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse="isCollapse"
            :collapse-transition="false"
            router
          >
            <el-menu-item index="/index">
              <slot name="icon-one"><i class="el-icon-s-home"></i></slot>
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
            <el-menu-item index="/admin" v-show="id === '管理员'">
              <slot name="icon-four"><i class="el-icon-user-solid"></i></slot>
              <span slot="title">管理员</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main>
          <router-view :user="id" />
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
      // 当前时间
      time: "",
      // 是否加载中
      isLoading: false,
      // 定时器
      timer: "",
    };
  },
  created() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1100);

    this.uname = window.sessionStorage.getItem("username");
    this.id = window.sessionStorage.getItem("identity");
    // let curUser = window.sessionStorage.getItem("curUser");
    this.userData = JSON.parse(window.sessionStorage.getItem("curUser"));
    // console.log(this.userData);
    this.timer = setInterval(() => {
      this.getTime();
    }, 1000);
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    // 获取当前系统时间
    getTime() {
      // 获取时间
      var date = new Date();
      //月
      var month = date.getMonth();
      month = month + 1;
      if (month < 10) {
        month = "0" + month;
      }
      //日
      var riqi = date.getDate();
      if (riqi < 10) {
        riqi = "0" + riqi;
      }
      //小时
      var hour = date.getHours();
      if (hour < 10) {
        hour = "0" + hour;
      }
      //分钟
      var minute = date.getMinutes();
      if (minute < 10) {
        minute = "0" + minute;
      }
      //秒钟
      var second = date.getSeconds();
      if (second < 10) {
        second = "0" + second;
      }

      //时间的格式为：2018-01-01 01:01:01
      this.time =
        date.getFullYear() +
        "-" +
        month +
        "-" +
        riqi +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second;
      // console.log(this.time);
    },
    // 折叠侧边栏
    toggle() {
      this.isCollapse = !this.isCollapse;
    },
    // 处理退出登录操作
    logout() {
      setTimeout(() => {
        this.$confirm("是否确认退出登录？", "提示", {
          confirmButtonText: "走起",
          cancelButtonText: "稍等",
        })
          .then(() => {
            window.sessionStorage.clear();
            setTimeout(() => {
              this.$router.push("/login");
            }, 1000);
          })
          .catch(() => {
            this.isLoading = false;
            this.$message({
              showClose: true,
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
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  padding-bottom: 0 !important;
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
  width: auto;
  height: 60px;
  position: absolute;
  right: 16%;
  top: 0;
}
.el-avatar--circle {
  vertical-align: top;
  margin-top: 10px;
}

/* 用户名 */
.nickName {
  font-size: 20px;
  margin: 0 10px;
  color: #fff;
}
.identity {
  color: #fff;
  font-size: 12px;
}

/* 当前时间 */
.time {
  width: 230px;
  height: 100%;
  color: #fff;
  font-size: 20px;
  position: absolute;
  left: 0;
  top: 0;
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

/* 折叠侧边栏 */
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