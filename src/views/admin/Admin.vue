<template>
  <div id="admin">
    <el-input v-model="value" placeholder="请输入内容" clearable></el-input>
    <el-button type="primary" @click="send">发送</el-button>
  </div>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {
      value: "",
    };
  },
  mounted() {
    this.$socket.emit("login", "hello"); //触发socket连接
  },
  methods: {
    send() {
      this.$socket.on("allUser", (users) => {
        console.log(users);
      });
      this.$socket.emit("user", this.value, () => {});
    },
  },
};
</script>

<style scoped>
#admin {
  width: 100%;
  height: 500px;
  background-color: #fff;
}
</style>