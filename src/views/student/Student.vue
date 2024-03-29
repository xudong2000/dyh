<template>
  <div id="student">
    <!-- 表格 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="表格" name="first">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <search :user="user" id="学生" />
          </div>

          <div class="content">
            <el-table
              :data="studentsData"
              style="width: 100%"
              max-height="430"
              border
              :row-class-name="tableRowClassName"
            >
              <el-table-column
                fixed
                prop="startTime"
                label="入学时间"
                width="120"
              >
              </el-table-column>
              <el-table-column prop="name" label="学生姓名" width="100">
              </el-table-column>
              <el-table-column prop="sex" label="性别" width="80">
              </el-table-column>
              <el-table-column prop="age" label="年龄" width="80">
              </el-table-column>
              <el-table-column prop="hometown" label="籍贯"> </el-table-column>
              <el-table-column prop="specialty" label="所学专业" width="120">
              </el-table-column>
              <el-table-column prop="c_id" label="所在班级" width="100">
              </el-table-column>
              <el-table-column prop="classTeacher" label="班主任" width="100">
              </el-table-column>
              <el-table-column prop="dormitory" label="宿舍号" width="100">
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
                        : false || scope.row.name === uname
                    "
                    @click="editStudent(scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    @click.native.prevent="
                      deleteStudent(scope.$index, studentsData)
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
        <div
          style="width: 600px; padding: 20px; border: none"
          id="myCharts"
        ></div>
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
        班级：<span class="mark">{{ userData.c_id }}</span>
      </p>
      <p>
        班里职位：<span class="mark">{{ userData.job }}</span>
      </p>
      <p>
        班主任：<span class="mark">{{ userData.classTeacher }}</span>
      </p>
      <p>
        就业方向：<span class="mark">{{ userData.specialty }}</span>
      </p>
      <p>
        入学时间：<span class="mark">{{ userData.startTime }}</span>
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

    <!-- 编辑 -->
    <edit-form
      ref="edit"
      :userData="userData"
      :curName="curName"
      :curClass="curClass"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";

import EditForm from "./child/EditForm";

import Search from "../../components/search/Search";

import { updateStudentByName } from "../../network/student";

export default {
  name: "Student",
  components: {
    EditForm,
    Search,
  },
  data() {
    return {
      // 默认显示的标签页
      activeName: "first",
      // 详情页是否可见
      dialogVisible: false,
      // 当前用户数据
      userData: "",
      // 当前编辑的用户名
      curName: "",
      // 当前班级号
      curClass: "",
      // 默认显示的下标值
      activeNames: ["2"],
      // 表单label宽度
      formLabelWidth: "100px",
      // 当前登录的用户名
      uname: "",
      // 图表数据
      chartsData: [],
    };
  },
  props: ["user", "time"],
  created() {
    this.uname = localStorage.getItem("username");
    this.$store.dispatch("student/aGetStudentsData");
  },
  mounted() {
    this.tjStudentData();
    this.myCharts();
  },
  computed: {
    ...mapState("student", ["studentsData"]),
  },
  methods: {
    // 统计学生所学专业数据
    tjStudentData() {
      let allSpecialty = this.$refs.edit.mySpecialty;

      for (let i of this.studentsData) {
        for (let j of allSpecialty) {
          if (i.specialty === j.value) {
            j.count++;
          }
        }
      }

      let obj = {};

      for (let i of allSpecialty) {
        obj = {};
        obj.value = i.count;
        obj.name = i.label;
        this.chartsData.push(obj);
      }
    },
    // 饼状图
    myCharts() {
      Object.defineProperty(
        document.getElementById("myCharts"),
        "clientWidth",
        {
          get: function () {
            return 600;
          },
        }
      );
      Object.defineProperty(
        document.getElementById("myCharts"),
        "clientHeight",
        {
          get: function () {
            return 500;
          },
        }
      );

      let myChart = this.$echarts.init(document.getElementById("myCharts"));
      let option = {
        // 标题
        title: {
          text: "专业统计",
          subtext: "实时更新",
          left: "center",
        },
        // 提示框
        tooltip: {
          trigger: "item",
        },
        // 图例
        legend: {
          orient: "vertical",
          left: "left",
        },
        // 图表类型
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "50%",
            left: "left",
            // 图表数据
            data: [],
            emphasis: {
              scale: true,
              scaleSize: 10,
              itemStyle: {
                shadowBlur: 50,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      option.series[0].data = this.chartsData;
      myChart.setOption(option);
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
    editStudent(row) {
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
      this.curClass = row.c_id;
      this.$store.dispatch("team/aGetClassData");
      this.$store.dispatch("teacher/aGetTeachersData");
    },
    // 处理删除学生操作
    deleteStudent(index, rows) {
      this.$confirm("是否要删除该学生?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await updateStudentByName([
            rows[index].name,
            { isDelete: true, deleTime: this.time },
          ]);
          rows.splice(index, 1);
          this.$store.dispatch("student/aGetStudentsData");
          this.$message({
            showClose: true,
            type: "success",
            message: "删除成功",
          });
          this.$store.dispatch("student/aGetStudentsData");
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
  },
};
</script>

<style>
#student {
  width: 100%;
  height: auto;
  min-height: 640px;
  background-color: #fff;
  padding: 20px;
}
.el-breadcrumb {
  margin-bottom: 10px;
}
.box-card {
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.el-card__header {
  padding: 20px 20px;
  height: 80px;
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