<template>
  <div id="register">
    <div class="comeBack" @click="comeBack">
      <i class="el-icon-back"></i>
    </div>

    <div class="register-box">
      <div class="register-avatar">
        <img src="../../assets/img/login/dyh.jpg" alt="" />
      </div>

      <div class="title">
        <span>注</span>
        <span>册</span>
      </div>

      <el-form
        ref="registerRef"
        :model="registerForm"
        :rules="registerRules"
        label-width="0px"
        class="register-form"
      >
        <el-form-item prop="name">
          <el-input
            v-model="registerForm.name"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>

        <el-form-item prop="pwd">
          <el-input
            v-model="registerForm.pwd"
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

        <el-form-item prop="checkPwd">
          <el-input
            v-model="registerForm.checkPwd"
            placeholder="请再次输入密码"
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

        <el-form-item prop="telephone">
          <el-input
            v-model="registerForm.telephone"
            placeholder="请输入手机号"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>

        <el-form-item prop="identity">
          <el-select
            v-model="registerForm.identity"
            placeholder="请选择您的身份"
            :disabled="true"
          >
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
          <el-button type="success" @click="register" :loading="isLoading"
            >注册</el-button
          >
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  getAdminsDataByParams,
  getTeachersDataByParams,
  getStudentsDataByParams,
} from "../../network/login";

import { addStudentsData } from "../../network/student";
import { addTeachersData } from "../../network/teacher";

import { mapState } from "vuex";

export default {
  name: "Register",
  data() {
    // 校验用户名
    var validateName = (rule, value, callback) => {
      var name = /^[\u4e00-\u9fa5]{2,6}$/;
      var result = name.test(value);
      if (result === false) {
        callback(new Error("用户名只能为2-6个字符之间的汉字"));
      } else {
        callback();
      }
    };
    // 校验密码
    var validatePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 保存用户注册的信息
      registerForm: {
        s_id: 0,
        t_id: 0,
        name: "",
        pwd: "",
        checkPwd: "",
        telephone: "",
        identity: "",
      },
      // 注册表单校验
      registerRules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { validator: validateName, trigger: "blur" },
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
        checkPwd: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validatePwd, trigger: "blur" },
        ],
        telephone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "长度只能为11位数字",
            trigger: "blur",
          },
        ],
        identity: [
          { required: true, message: "请选择您登录的身份", trigger: "change" },
        ],
      },
      // 注册的身份
      options: [
        {
          value: "学生",
          label: "学生",
        },
        {
          value: "老师",
          label: "老师",
        },
        {
          value: "管理员",
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
      // 当前手机号
      phone: "",
    };
  },
  created() {
    this.registerForm.identity = localStorage.getItem("regId");
    this.registerForm.s_id = this.stuTotal;
    this.registerForm.t_id = this.teacTotal;
  },
  computed: {
    ...mapState("student", ["stuTotal"]),
    ...mapState("teacher", ["teacTotal"]),
  },
  methods: {
    // 重置输入框
    resetForm() {
      this.$refs.registerRef.resetFields();
    },
    // 显示或隐藏密码
    toggle() {
      this.isShow = !this.isShow;
      this.isShow === true ? (this.isPwd = "text") : (this.isPwd = "password");
    },
    // 返回
    comeBack() {
      this.$router.go(-1);
    },
    // 处理用户注册
    register() {
      this.isLoading = true;
      this.phone = "";
      this.$refs.registerRef.validate((valid) => {
        if (!valid) {
          this.isLoading = false;
          return this.$message.error("您提交的注册信息不符合规范！");
        } else {
          const { identity } = this.registerForm;
          if (identity === "学生") {
            for (let i in this.registerForm) {
              if (i === "telephone") {
                getStudentsDataByParams(i, this.registerForm[i]).then(
                  (res) => {
                    this.phone = res.data.data;
                  },
                  (err) => {
                    console.log("查询数据失败" + err);
                  }
                );
              }
            }

            setTimeout(() => {
              this.isLoading = false;
              for (let i in this.registerForm) {
                if (i === "name") {
                  getStudentsDataByParams(i, this.registerForm[i]).then(
                    (res) => {
                      const { data } = res.data;
                      if (data.length === 0) {
                        if (this.phone.length === 0) {
                          addStudentsData(this.registerForm).then(
                            (res) => {
                              this.resetForm();
                              this.$confirm(
                                "添加学生成功，是否跳转到学生管理界面?",
                                "提示",
                                {
                                  confirmButtonText: "确定",
                                  cancelButtonText: "取消",
                                  type: "warning",
                                }
                              )
                                .then(() => {
                                  this.$router.go(-1);
                                })
                                .catch(() => {
                                  this.$message({
                                    showClose: true,
                                    type: "info",
                                    message: "已取消跳转",
                                  });
                                });
                            },
                            (err) => {
                              console.log("添加数据失败" + err);
                            }
                          );
                        } else {
                          console.log("已注册");
                          this.$message({
                            showClose: true,
                            message: "该手机号已被注册",
                            type: "error",
                          });
                        }
                      } else {
                        this.$message({
                          showClose: true,
                          message: "该学生已被注册",
                          type: "error",
                        });
                      }
                    }
                  );
                }
              }
            }, 1000);
          }

          if (identity === "老师") {
            for (let i in this.registerForm) {
              if (i === "telephone") {
                getTeachersDataByParams(i, this.registerForm[i]).then(
                  (res) => {
                    this.phone = res.data.data;
                  },
                  (err) => {
                    console.log("查询数据失败" + err);
                  }
                );
              }
            }

            setTimeout(() => {
              this.isLoading = false;
              for (let i in this.registerForm) {
                if (i === "name") {
                  getTeachersDataByParams(i, this.registerForm[i]).then(
                    (res) => {
                      const { data } = res.data;
                      if (data.length === 0) {
                        if (this.phone.length === 0) {
                          addTeachersData(this.registerForm).then(
                            (res) => {
                              this.resetForm();
                              this.$confirm(
                                "添加老师成功，是否跳转到老师管理界面?",
                                "提示",
                                {
                                  confirmButtonText: "确定",
                                  cancelButtonText: "取消",
                                  type: "warning",
                                }
                              )
                                .then(() => {
                                  this.$router.go(-1);
                                })
                                .catch(() => {
                                  this.$message({
                                    showClose: true,
                                    type: "info",
                                    message: "已取消跳转",
                                  });
                                });
                            },
                            (err) => {
                              console.log("添加数据失败" + err);
                            }
                          );
                        } else {
                          console.log("已注册");
                          this.$message({
                            showClose: true,
                            message: "该手机号已被注册",
                            type: "error",
                          });
                        }
                      } else {
                        this.$message({
                          showClose: true,
                          message: "该老师已被注册",
                          type: "error",
                        });
                      }
                    }
                  );
                }
              }
            }, 1000);
          }
        }
      });
    },
  },
};
</script>

<style scoped>
#register {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: black;
  background: linear-gradient(to bottom, #df628a 0%, #5788fe 100%);
}

.comeBack {
  width: 50px;
  height: 50px;
  position: absolute;
  left: 1%;
  top: 2%;
  border-radius: 50%;
  overflow: hidden;
  text-align: center;
  line-height: 48px;
  cursor: pointer;
  font-size: 30px;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.5);
}

.register-box {
  width: 450px;
  height: 460px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}
.register-avatar {
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
.register-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}

.title {
  width: 40%;
  height: 30px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  color: salmon;
  font-size: 20px;
}

.register-form {
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