<template>
  <div id="teacher">
    <!-- 表格 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="表格" name="first">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              round
              v-show="user === '管理员' ? true : false"
              @click="addTeacher()"
              >增加老师</el-button
            >
          </div>
          <div class="content">
            <el-table
              :data="teachersData"
              style="width: 100%"
              max-height="430"
              border
              :row-class-name="tableRowClassName"
            >
              <el-table-column
                fixed
                prop="startTime"
                label="入职时间"
                width="120"
              >
              </el-table-column>
              <el-table-column prop="name" label="老师姓名" width="100">
              </el-table-column>
              <el-table-column prop="sex" label="性别" width="80">
              </el-table-column>
              <el-table-column prop="age" label="年龄" width="80">
              </el-table-column>
              <el-table-column prop="hometown" label="籍贯"> </el-table-column>
              <el-table-column prop="job" label="职位" width="120">
              </el-table-column>
              <el-table-column prop="course" label="主教专业" width="100">
              </el-table-column>
              <el-table-column prop="salary" label="月薪" width="100">
              </el-table-column>
              <el-table-column prop="address" label="住址" width="100">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                  <el-button
                    @click="handleClick(scope.row)"
                    type="text"
                    size="small"
                    >详情</el-button
                  >
                  <el-button
                    type="text"
                    size="small"
                    v-show="
                      user === '管理员'
                        ? true
                        : false || teachersData.name === uname
                        ? true
                        : false
                    "
                    @click="editTeacher(scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    @click.native.prevent="
                      deleteTeacher(scope.$index, teachersData)
                    "
                    type="text"
                    size="small"
                    v-show="user === '管理员' ? true : false"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="可视化" name="second">
        <div id="myCharts"></div>
      </el-tab-pane>
    </el-tabs>

    <!-- 详情 -->
    <el-dialog
      :title="userData.name + '的个人资料'"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="40%"
    >
      <p>
        头像：<el-avatar
          :size="60"
          style="vertical-align: middle"
          :src="userData.avatar"
        ></el-avatar>
      </p>
      <p>
        姓名：<span class="mark">{{ userData.name }}</span>
      </p>
      <p>
        性别：<span class="mark">{{ userData.sex }}</span>
      </p>
      <p>
        年龄：<span class="mark">{{ userData.age }}</span>
      </p>
      <p>
        出生年月：<span class="mark">{{ userData.birthday }}</span>
      </p>
      <p>
        籍贯：<span class="mark">{{ userData.hometown }}</span>
      </p>
      <p>
        职位：<span class="mark">{{ userData.job }}</span>
      </p>
      <p>
        主教专业：<span class="mark">{{ userData.course }}</span>
      </p>
      <p>
        毕业院校：<span class="mark">{{ userData.school }}</span>
      </p>
      <p>
        学历：<span class="mark">{{ userData.education }}</span>
      </p>
      <p>
        现居地址：<span class="mark">{{ userData.address }}</span>
      </p>
      <p>
        入职时间：<span class="mark">{{ userData.startTime }}</span>
      </p>
      <el-collapse v-model="activeNames" style="margin-bottom: 10px">
        <el-collapse-item title="联系方式" name="1">
          <p>
            手机号：<span class="mark">{{ userData.telephone }}</span>
          </p>
          <p>
            邮箱：<span class="mark">{{ userData.email }}</span>
          </p>
          <p>
            QQ号：<span class="mark">{{ userData.qq }}</span>
          </p>
          <p>
            微信号：<span class="mark">{{ userData.wechat }}</span>
          </p>
        </el-collapse-item>
      </el-collapse>
      <p>
        个性签名：<span class="mark">{{ userData.signature }}</span>
      </p>
      <p>照片展示</p>
      <div>
        <a
          href="javascript:;"
          v-for="(item, index) in userData.photo"
          :key="index"
          class="photo"
          ><img :src="item" alt=""
        /></a>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Teacher",
  data() {
    return {
      activeName: "first",
      // 当前用户数据
      userData: "",
      // 当前用户名
      uname: "",
      // 详情
      dialogVisible: false,
      activeNames: ["2"],
      // 定时器
      timer: "",
    };
  },
  props: ["user"],
  created() {
    this.uname = sessionStorage.getItem("username");
    this.$store.dispatch("teacher/aGetTeachersData");
    this.timer = setTimeout(() => {
      if (this.undoneNum === 0) return;
      else this.open();
    }, 2000);
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  computed: {
    ...mapState("teacher", ["teachersData", "undoneNum"]),
  },
  methods: {
    // 消息提示
    open() {
      if (this.user === "管理员") {
        const h = this.$createElement;
        this.$notify({
          title: "消息通知",
          message: h(
            "span",
            { style: "color: salmon" },
            "当前还有" + this.undoneNum + "位老师的个人资料未完善"
          ),
        });
      } else {
        return;
      }
    },
    // 给表格指定行添加背景色
    tableRowClassName({ row, rowIndex }) {
      if (row.startTime === "2000-01-01") {
        return "warning-row";
      }
      return "";
    },
    // 处理查看个人资料
    handleClick(row) {
      this.dialogVisible = true;
      //row.hometown = row.hometown.join("");
      this.userData = row;
    },
    // 处理关闭详情框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.dialogVisible = false;
          done();
        })
        .catch((_) => {});
    },
    // 处理编辑学生数据
    editTeacher(row) {
      this.$refs.edit.dialogFormVisible = true;
      for (let i in row) {
        if (Number.isInteger(row[i])) {
          if (i === "telephone" || i === "qq") {
            row[i] = row[i] + "";
          }
        }
      }
      this.userData = row;
      this.curName = row.name;
      this.$store.dispatch("team/aGetClassData");
      this.$store.dispatch("teacher/aGetTeachersData");
    },
    // 处理删除操作老师
    deleteTeacher(index, rows) {
      // console.log(rows[index]);
      this.$confirm("是否要删除该老师?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("teacher/aDeleTeacherByName", rows[index].name);
          this.$store.dispatch("teacher/aGetTeachersData");
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
    // 处理添加老师操作
    addTeacher() {
      clearTimeout(this.timer);
      sessionStorage.setItem("regId", "老师");
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
  },
};
</script>

<style>
#teacher {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 20px;
}
.el-breadcrumb {
  margin-bottom: 10px;
}
.box-card {
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.clearfix {
  height: 30px !important;
  line-height: 30px;
}
#myCharts {
  width: 400px;
  height: 400px;
  border: 1px solid #000;
}
p {
  margin-bottom: 10px;
}
.mark {
  font-weight: 700;
}
.photo {
  width: 100px;
  height: 100px;
  overflow: hidden;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
}
.photo img {
  width: 100%;
  height: 100%;
}
.el-table .warning-row {
  background-color: oldlace;
}
</style>