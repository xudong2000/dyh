<template>
  <div id="admin">
    <el-button type="primary" style="float: right" @click="addAdmin"
      >增加管理员</el-button
    >
    <ul class="admin-list">
      <li class="admin-item" v-for="item in adminsData" :key="item._id">
        <div v-show="isShow === item.name" @mouseleave="moveOut">
          <p
            style="text-align: center; line-height: 80px; color: #fff"
            @click="cancel(item.name)"
          >
            注销
          </p>
        </div>
        <div @mouseenter="moveIn(item.name)">
          <img :src="item.avatar" alt="" />
        </div>
        <p style="text-align: center; font-size: 14px">{{ item.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { getAdminsData, deleteAdminsData } from "../../network/admin";

export default {
  name: "Admin",
  data() {
    return {
      isShow: false,
      adminsData: [],
    };
  },
  created() {
    this.getAdmins();
  },
  methods: {
    async getAdmins() {
      const res = await getAdminsData();
      this.adminsData = res.data.data;
    },
    moveIn(name) {
      this.isShow = name;
    },
    moveOut() {
      this.isShow = false;
    },
    cancel(name) {
      this.$confirm("此操作将永久注销该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await deleteAdminsData({ name: name });
          console.log(res);
          this.$message({
            type: "success",
            message: "注销成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消注销",
          });
        });
    },
    addAdmin() {
      this.$message({
        message: "添加管理员功能正在开发中",
        type: "warning",
      });
    },
  },
};
</script>

<style scoped>
#admin {
  width: 100%;
  height: auto;
  min-height: 640px;
  background-color: #fff;
  padding: 60px;
}
.admin-list {
  width: 100%;
  height: auto;
  display: flex;
}
.admin-item {
  width: 100px;
  height: 150px;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
  margin: 20px;
}
.admin-item div:nth-child(2) {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}
.admin-item div:nth-child(1) {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  left: 10px;
  top: 10px;
  background-color: rgba(0, 0, 0, 0.4);
}
img {
  width: 100%;
  height: 100%;
}
</style>