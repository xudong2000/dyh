<template>
  <div id="search">
    <el-form
      :inline="true"
      ref="findRef"
      class="demo-form-inline"
      style="width: 100%; height: 50px"
    >
      <el-form-item style="margin-left: 40%">
        <el-input
          v-show="id === '学生'"
          v-model="s_name"
          placeholder="请输入要查询的学生姓名"
          clearable
        ></el-input>

        <el-input
          v-show="id === '老师'"
          v-model="t_name"
          placeholder="请输入要查询的老师姓名"
          clearable
        ></el-input>

        <el-input
          v-show="id === '班级'"
          v-model="c_name"
          placeholder="请输入要查询的班级号 如：G02班"
          clearable
          style="width: 260px"
        ></el-input>
      </el-form-item>

      <el-button type="primary" v-show="id === '班级'" @click="fuzzyQuery"
        >确 定</el-button
      >

      <el-button
        style="float: right; padding: 3px 0"
        type="text"
        round
        v-show="user === '管理员' ? true : false"
        @click="addStudent()"
        >增加{{ this.id }}</el-button
      >
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      s_name: "",
      t_name: "",
      c_name: "",
    };
  },
  props: ["user", "id"],
  created() {},
  methods: {
    // 处理添加学生操作
    addStudent() {
      localStorage.setItem("regId", this.id);
      const loading = this.$loading({
        lock: true,
        text: "正在为您跳转中......",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
        this.$router.push("/register");
      }, 1000);
    },
    // 模糊查询
    fuzzyQuery() {
      if (this.c_name !== "") {
        this.$store.dispatch("student/aFindStudentByClass", this.c_name);
      } else {
        return this.$message({
          showClose: true,
          message: "值不能为空！",
          type: "error",
        });
      }
    },
    // 防抖
    debounce(value) {
      let timer;
      let num = 0;
      return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
          console.log(value, num);
        }, 500);
      };
    },
  },
  watch: {
    // 监听用户输入的学生姓名
    s_name(newValue, oldValue) {
      if (newValue !== "") {
        this.$store.dispatch("student/aFuzzyQueryByName", newValue);
      } else {
        this.$store.dispatch("student/aGetStudentsData");
      }
    },

    // 监听用户输入的老师姓名
    t_name(newValue, oldValue) {
      if (newValue !== "") {
        this.$store.dispatch("teacher/aFuzzyQueryByName", newValue);
      } else {
        this.$store.dispatch("teacher/aGetTeachersData");
      }
    },

    // 监听用户输入的班级号
    c_name(newValue, oldValue) {
      if (newValue === "") this.$store.dispatch("student/aGetStudentsData");
      else return;
    },
  },
};
</script>

<style scoped>
</style>