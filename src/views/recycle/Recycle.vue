<template>
  <div id="recycle">
    <el-card class="box-card" style="min-height: 560px">
      <div slot="header" class="clearfix">
        <el-button type="primary" style="margin-left: 60%" @click="clearRecycle"
          >清空回收站</el-button
        >
      </div>
      <div class="content">
        <el-table style="width: 50%; margin: 0 auto" :data="recycleData" border>
          <el-table-column prop="name" label="用户名" width="160">
          </el-table-column>
          <el-table-column prop="deleTime" label="删除时间"> </el-table-column>
          <el-table-column label="操作" width="160">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click.native.prevent="recovery(scope.$index, recycleData)"
                >恢复</el-button
              >
              <el-button
                type="text"
                size="small"
                @click.native.prevent="remove(scope.$index, recycleData)"
                >彻底删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  getStudentsDataByParams,
  getTeachersDataByParams,
} from "../../network/login";
import { updateStudentByName, deleStudentByName } from "../../network/student";
import { updateTeacherByName, deleTeacherByName } from "../../network/teacher";

export default {
  name: "Recycle",
  data() {
    return {
      recycleData: [],
    };
  },
  created() {
    // console.log(this.studentsData);
    // console.log(this.teachersData);
    this.$store.dispatch("student/aGetStudentsData");
    this.findRecycle();
  },
  computed: {
    ...mapState("student", ["studentsData"]),
    ...mapState("teacher", ["teachersData"]),
  },
  methods: {
    // 获取回收站的用户数据
    async findRecycle() {
      const students = await getStudentsDataByParams("isDelete", true);
      // console.log(students.data.data);
      const teachers = await getTeachersDataByParams("isDelete", true);
      // console.log(teachers.data.data);
      this.recycleData = [...students.data.data, ...teachers.data.data];
      // console.log(this.recycleData);
      this.recycleData.sort(function (a, b) {
        return new Date(b.deleTime) - new Date(a.deleTime);
      });
    },
    // 恢复用户
    recovery(index, rows) {
      // console.log(index, rows);
      this.$confirm("是否要恢复当前用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          if (!rows[index].hasOwnProperty("salary")) {
            await updateStudentByName([
              rows[index].name,
              { isDelete: false, deleTime: "" },
            ]);
            this.$store.dispatch("student/aGetStudentsData");
          } else {
            await updateTeacherByName([
              rows[index].name,
              { isDelete: false, deleTime: "" },
            ]);
            this.$store.dispatch("teacher/aGetTeachersData");
          }
          rows.splice(index, 1);
          this.$message({
            showClose: true,
            type: "success",
            message: "恢复成功",
          });
        })
        .catch(() => {
          this.$message({
            showClose: true,
            type: "info",
            message: "已取消恢复",
          });
        });
    },
    // 彻底删除
    remove(index, rows) {
      this.$confirm("是否要彻底删除当前用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          if (!rows[index].hasOwnProperty("salary")) {
            await deleStudentByName(rows[index].name);
            this.$store.dispatch("student/aGetStudentsData");
          } else {
            await deleTeacherByName(rows[index].name);
            this.$store.dispatch("teacher/aGetTeachersData");
          }
          rows.splice(index, 1);
          this.$message({
            showClose: true,
            type: "success",
            message: "删除成功",
          });
        })
        .catch(() => {
          this.$message({
            showClose: true,
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 清空回收站
    clearRecycle() {
      this.$message({
        message: "暂不支持清空回收站",
        type: "error",
      });
    },
  },
};
</script>

<style scoped>
#recycle {
  height: auto;
  min-height: 640px;
  background-color: #fff;
  padding: 40px;
}
</style>