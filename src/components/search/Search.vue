<template>
  <div id="search">
    <el-form
      :inline="true"
      ref="findRef"
      class="demo-form-inline"
      style="width: 100%; height: 50px"
    >
      <el-form-item style="margin-left: 50%">
        <el-input v-model="uname" placeholder="请输入姓名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fuzzyQuery">查询</el-button>
      </el-form-item>
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
      uname: "",
    };
  },
  props: ["user", "id"],
  created() {},
  methods: {
    // 处理添加学生操作
    addStudent() {
      sessionStorage.setItem("regId", this.id);
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
      if (this.uname !== "") {
        this.$store.dispatch("student/aFuzzyQueryByParams", this.uname);
      } else {
        return this.$message({
          showClose: true,
          message: "值不能为空！",
          type: "error",
        });
      }
    },
  },
  watch: {
    // 监听用户输入的姓名
    uname(newValue, oldValue) {
      if (this.id === "学生") {
        if (newValue !== "") {
          this.$store.dispatch("student/aFuzzyQueryByParams", newValue);
        } else {
          this.$store.dispatch("student/aGetStudentsData");
        }
      }

      if (this.id === "老师") {
        console.log(newValue);
      }
    },
  },
};
</script>

<style scoped>
</style>