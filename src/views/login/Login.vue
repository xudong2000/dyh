<template>
  <div id="login">
    <canvas id="canvas"></canvas>
    <div class="login-box">
      <div class="login-avatar">
        <img src="../../assets/img/login/dyh.jpg" alt="" />
      </div>

      <el-form
        ref="loginRef"
        :model="loginForm"
        :rules="loginRules"
        label-width="0px"
        class="login-form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            :type="isPwd"
          >
          </el-input>
          <div class="isShow" @click="toggle">
            <img
              src="../../assets/img/login/hidden.png"
              alt=""
              v-show="!isShow"
            />
            <img src="../../assets/img/login/show.png" alt="" v-show="isShow" />
          </div>
        </el-form-item>

        <el-form-item prop="identity">
          <el-select v-model="loginForm.identity" placeholder="请选择您的身份">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="btn">
          <el-button type="primary" @click="login" :loading="isLoading"
            >登录</el-button
          >
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  getAdminsDataByName,
  getTeachersDataByName,
  getStudentsDataByName,
} from "../../network/login";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "wxd",
        password: "wxd3416",
        identity: "",
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
        identity: [
          { required: true, message: "请选择您登录的身份", trigger: "change" },
        ],
      },
      options: [
        {
          value: "student",
          label: "学生",
        },
        {
          value: "teacher",
          label: "老师",
        },
        {
          value: "admin",
          label: "管理员",
        },
      ],
      // 下拉框中的值
      value: "",
      // 是否加载中
      isLoading: false,
      // 是否显示密码
      isShow: false,
      // 更改输入框的类型
      isPwd: "password",
    };
  },
  mounted() {
    this.canvas();
  },
  methods: {
    // 背景动效
    canvas() {
      function Star(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = Math.floor(Math.random() * 2) + 1;
        var alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
        this.color = "rgba(255,255,255," + alpha + ")";
      }

      Star.prototype.draw = function () {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = this.r * 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
      };

      Star.prototype.move = function () {
        this.y -= 0.15;
        if (this.y <= -10) this.y = HEIGHT + 10;
        this.draw();
      };

      Star.prototype.die = function () {
        stars[this.id] = null;
        delete stars[this.id];
      };

      function Dot(id, x, y, r) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = Math.floor(Math.random() * 5) + 1;
        this.maxLinks = 2;
        this.speed = 0.5;
        this.a = 0.5;
        this.aReduction = 0.005;
        this.color = "rgba(255,255,255," + this.a + ")";
        this.linkColor = "rgba(255,255,255," + this.a / 4 + ")";

        this.dir = Math.floor(Math.random() * 140) + 200;
      }

      Dot.prototype.draw = function () {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = this.r * 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
      };

      Dot.prototype.link = function () {
        if (this.id == 0) return;
        var previousDot1 = getPreviousDot(this.id, 1);
        var previousDot2 = getPreviousDot(this.id, 2);
        var previousDot3 = getPreviousDot(this.id, 3);
        if (!previousDot1) return;
        ctx.strokeStyle = this.linkColor;
        ctx.moveTo(previousDot1.x, previousDot1.y);
        ctx.beginPath();
        ctx.lineTo(this.x, this.y);
        if (previousDot2 != false) ctx.lineTo(previousDot2.x, previousDot2.y);
        if (previousDot3 != false) ctx.lineTo(previousDot3.x, previousDot3.y);
        ctx.stroke();
        ctx.closePath();
      };

      function getPreviousDot(id, stepback) {
        if (id == 0 || id - stepback < 0) return false;
        if (typeof dots[id - stepback] != "undefined")
          return dots[id - stepback];
        else return false; //getPreviousDot(id - stepback);
      }

      Dot.prototype.move = function () {
        this.a -= this.aReduction;
        if (this.a <= 0) {
          this.die();
          return;
        }
        this.color = "rgba(255,255,255," + this.a + ")";
        this.linkColor = "rgba(255,255,255," + this.a / 4 + ")";
        (this.x = this.x + Math.cos(degToRad(this.dir)) * this.speed),
          (this.y = this.y + Math.sin(degToRad(this.dir)) * this.speed);

        this.draw();
        this.link();
      };

      Dot.prototype.die = function () {
        dots[this.id] = null;
        delete dots[this.id];
      };

      var canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d"),
        WIDTH,
        HEIGHT,
        mouseMoving = false,
        mouseMoveChecker,
        mouseX,
        mouseY,
        stars = [],
        initStarsPopulation = 80,
        dots = [],
        dotsMinDist = 2,
        maxDistFromCursor = 50;

      setCanvasSize();
      init();

      function setCanvasSize() {
        (WIDTH = document.documentElement.clientWidth),
          (HEIGHT = document.documentElement.clientHeight);

        canvas.setAttribute("width", WIDTH);
        canvas.setAttribute("height", HEIGHT);
      }

      function init() {
        ctx.strokeStyle = "white";
        ctx.shadowColor = "white";
        for (var i = 0; i < initStarsPopulation; i++) {
          stars[i] = new Star(
            i,
            Math.floor(Math.random() * WIDTH),
            Math.floor(Math.random() * HEIGHT)
          );
          //stars[i].draw();
        }
        ctx.shadowBlur = 0;
        animate();
      }

      function animate() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        for (var i in stars) {
          stars[i].move();
        }
        for (var i in dots) {
          dots[i].move();
        }
        drawIfMouseMoving();
        requestAnimationFrame(animate);
      }

      window.onmousemove = function (e) {
        mouseMoving = true;
        mouseX = e.clientX;
        mouseY = e.clientY;
        clearInterval(mouseMoveChecker);
        mouseMoveChecker = setTimeout(function () {
          mouseMoving = false;
        }, 100);
      };

      function drawIfMouseMoving() {
        if (!mouseMoving) return;

        if (dots.length == 0) {
          dots[0] = new Dot(0, mouseX, mouseY);
          dots[0].draw();
          return;
        }

        var previousDot = getPreviousDot(dots.length, 1);
        var prevX = previousDot.x;
        var prevY = previousDot.y;

        var diffX = Math.abs(prevX - mouseX);
        var diffY = Math.abs(prevY - mouseY);

        if (diffX < dotsMinDist || diffY < dotsMinDist) return;

        var xVariation = Math.random() > 0.5 ? -1 : 1;
        xVariation =
          xVariation * Math.floor(Math.random() * maxDistFromCursor) + 1;
        var yVariation = Math.random() > 0.5 ? -1 : 1;
        yVariation =
          yVariation * Math.floor(Math.random() * maxDistFromCursor) + 1;
        dots[dots.length] = new Dot(
          dots.length,
          mouseX + xVariation,
          mouseY + yVariation
        );
        dots[dots.length - 1].draw();
        dots[dots.length - 1].link();
      }
      //setInterval(drawIfMouseMoving, 17);

      function degToRad(deg) {
        return deg * (Math.PI / 180);
      }
    },
    // 重置输入框
    resetForm() {
      this.$refs.loginRef.resetFields();
    },
    // 处理用户登录
    login() {
      this.isLoading = true;
      this.$refs.loginRef.validate((valid) => {
        if (!valid) {
          this.isLoading = false;
          return this.$message.error("您输入的登录信息不符合规范");
        } else {
          const { username, password, identity } = this.loginForm;
          window.sessionStorage.setItem("username", username);
          if (identity === "admin") {
            setTimeout(() => {
              this.isLoading = false;
              getAdminsDataByName(username).then((res) => {
                const { data } = res.data;
                console.log(data);
                if (data.length === 0) {
                  this.$message({
                    showClose: true,
                    message: "该用户不存在",
                    type: "error",
                  });
                } else {
                  if (data[0].a_pwd === password) {
                    window.sessionStorage.setItem(
                      "curUser",
                      JSON.stringify(data)
                    );
                    window.sessionStorage.setItem("identity", identity);
                    this.$router.push("/home");
                    this.$message({
                      showClose: true,
                      message: "登录成功",
                      type: "success",
                    });
                  } else {
                    this.$message({
                      showClose: true,
                      message: "密码错误",
                      type: "error",
                    });
                  }
                }
              });
            }, 1000);
          }

          if (identity === "teacher") {
            setTimeout(() => {
              this.isLoading = false;
              getTeachersDataByName(username).then((res) => {
                const { data } = res.data;
                console.log(data);
                if (data.length === 0) {
                  this.$message({
                    showClose: true,
                    message: "该用户不存在",
                    type: "error",
                  });
                } else {
                  if (data[0].t_pwd === password) {
                    window.sessionStorage.setItem(
                      "curUser",
                      JSON.stringify(data)
                    );
                    window.sessionStorage.setItem("identity", identity);
                    this.$router.push("/home");
                    this.$message({
                      showClose: true,
                      message: "登录成功",
                      type: "success",
                    });
                  } else {
                    this.$message({
                      showClose: true,
                      message: "密码错误",
                      type: "error",
                    });
                  }
                }
              });
            }, 1000);
          }

          if (identity === "student") {
            setTimeout(() => {
              this.isLoading = false;
              getStudentsDataByName(username).then((res) => {
                const { data } = res.data;
                console.log(data);
                if (data.length === 0) {
                  this.$message({
                    showClose: true,
                    message: "该用户不存在",
                    type: "error",
                  });
                } else {
                  if (data[0].s_pwd === password) {
                    window.sessionStorage.setItem(
                      "curUser",
                      JSON.stringify(data)
                    );
                    window.sessionStorage.setItem("identity", identity);
                    this.$router.push("/home");
                    this.$message({
                      showClose: true,
                      message: "登录成功",
                      type: "success",
                    });
                  } else {
                    this.$message({
                      showClose: true,
                      message: "密码错误",
                      type: "error",
                    });
                  }
                }
              });
            }, 1000);
          }
        }
      });
    },
    // 显示或隐藏密码
    toggle() {
      this.isShow = !this.isShow;
      this.isShow === true ? (this.isPwd = "text") : (this.isPwd = "password");
    },
  },
};
</script>

<style scoped>
#canvas {
  width: 100%;
  height: 100%;
}
#login {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: black;
  background: linear-gradient(to bottom, #000000 0%, #5788fe 100%);
}
.login-box {
  width: 450px;
  height: 340px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}
.login-avatar {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  padding: 10px;
  border: 1px solid #eee;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
.login-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}

.login-form {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btn {
  display: flex;
  justify-content: flex-end;
}
.isShow {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 2%;
  top: 50%;
  transform: translate(0, -50%);
  cursor: pointer;
}
.el-select {
  width: 160px;
}
</style>