<template>
  <div id="teacher">
    <!-- 表格 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="表格" name="first">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <search :user="user" id="老师" />
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
              <el-table-column prop="address" label="住址" width="120">
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

    <edit-form ref="edit" :userData="userData" :curName="curName" />
  </div>
</template>

<script>
import { mapState } from "vuex";

import EditForm from "./child/EditForm";

import Search from "../../components/search/Search";

import { updateTeacherByName } from "../../network/teacher";

export default {
  name: "Teacher",
  components: {
    EditForm,
    Search,
  },
  data() {
    return {
      // 默认显示的标签页
      activeName: "first",
      // 当前用户数据
      userData: "",
      // 当前编辑的用户名
      curName: "",
      // 当前登录的用户名
      uname: "",
      // 详情页是否可见
      dialogVisible: false,
      // 默认显示的下标值
      activeNames: ["2"],
      // 图表数据
      chartsData: [],
    };
  },
  props: ["user", "time"],
  created() {
    this.uname = localStorage.getItem("username");
    this.$store.dispatch("teacher/aGetTeachersData");
  },
  mounted() {
    this.tjTeacherData();
    this.barCharts();
  },
  computed: {
    ...mapState("teacher", ["teachersData"]),
  },
  methods: {
    // 统计老师学历数据
    tjTeacherData() {
      //console.log(this.teachersData);
      let education = [
        { value: 0, name: "初中" },
        { value: 0, name: "中专" },
        { value: 0, name: "高中" },
        { value: 0, name: "大专" },
        { value: 0, name: "本科" },
        { value: 0, name: "硕士" },
        { value: 0, name: "博士" },
      ];
      for (let i of this.teachersData) {
        for (let j of education) {
          if (i.education === j.name) {
            j.value++;
          }
        }
      }
      this.chartsData = education;
    },
    // 饼状图
    barCharts() {
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
          text: "学历统计",
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
    // 处理编辑老师数据
    editTeacher(row) {
      this.$refs.edit.dialogFormVisible = true;
      for (let i in row) {
        if (Number.isInteger(row[i])) {
          if (i === "telephone" || i === "qq" || i === "salary") {
            row[i] = row[i] + "";
          }
        }
      }
      this.userData = row;
      this.curName = row.name;
    },
    // 处理删除操作老师
    deleteTeacher(index, rows) {
      this.$confirm("是否要删除该老师?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await updateTeacherByName([
            rows[index].name,
            { isDelete: true, deleTime: this.time },
          ]);
          rows.splice(index, 1);
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
  },
};
</script>

<style>
#teacher {
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