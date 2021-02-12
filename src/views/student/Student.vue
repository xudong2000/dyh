<template>
  <div id="student">
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
              @click="addStudent()"
              >增加学生</el-button
            >
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
              <el-table-column prop="sex" label="性别" width="100">
              </el-table-column>
              <el-table-column prop="age" label="年龄" width="100">
              </el-table-column>
              <el-table-column prop="hometown" label="籍贯" width="200">
              </el-table-column>
              <el-table-column prop="specialty" label="所学专业" width="100">
              </el-table-column>
              <el-table-column prop="c_id" label="所在班级" width="100">
              </el-table-column>
              <el-table-column prop="classTeacher" label="班主任" width="100">
              </el-table-column>
              <el-table-column prop="dormitory" label="宿舍号" width="100">
              </el-table-column>
              <el-table-column fixed="right" label="操作">
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
                    v-show="user === '管理员' ? true : false"
                    @click="dialogFormVisible = true"
                    >编辑</el-button
                  >
                  <el-button
                    @click.native.prevent="
                      deleteRow(scope.$index, studentsData)
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
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog
      title="编辑学生个人资料"
      :visible.sync="dialogFormVisible"
      width="50%"
    >
      <el-form :model="editForm">
        <el-form-item label="头像地址" :label-width="formLabelWidth">
          <el-input
            v-model="editForm.avatar"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="学生姓名" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="学生性别" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="学生年龄" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="籍贯" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="出生日期" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="入学日期" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="班里职位" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="宿舍号" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="当前班级" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="班主任" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="就业方向" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-collapse v-model="activeNames" style="margin-bottom: 10px">
          <el-collapse-item title="联系方式" name="1">
            <el-form-item label="手机号" :label-width="formLabelWidth">
              <el-input v-model="editForm.name" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="邮箱" :label-width="formLabelWidth">
              <el-input v-model="editForm.name" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="QQ号" :label-width="formLabelWidth">
              <el-input v-model="editForm.name" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="微信号" :label-width="formLabelWidth">
              <el-input v-model="editForm.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>

        <el-form-item label="个性签名" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="照片展示" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Student",
  data() {
    return {
      activeName: "first",
      data: [
        { value: 1548, name: "幽州" },
        { value: 735, name: "荆州" },
        { value: 510, name: "兖州" },
        { value: 434, name: "益州" },
        { value: 335, name: "西凉" },
      ],
      dialogVisible: false,
      // 当前用户数据
      userData: "",
      activeNames: ["2"],
      dialogFormVisible: false,
      editForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "100px",
      timer: "",
    };
  },
  props: ["user"],
  created() {
    this.$store.dispatch("student/aGetStudentsData");
    this.timer = setTimeout(() => {
      this.open();
    }, 2000);
  },
  mounted() {
    var ROOT_PATH =
      "https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples";

    var chartDom = document.getElementById("myCharts");
    var myChart = this.$echarts.init(chartDom);
    var option;

    var weatherIcons = {
      Sunny: ROOT_PATH + "/data/asset/img/weather/sunny_128.png",
      Cloudy: ROOT_PATH + "/data/asset/img/weather/cloudy_128.png",
      Showers: ROOT_PATH + "/data/asset/img/weather/showers_128.png",
    };

    option = {
      title: {
        text: "天气情况统计",
        subtext: "虚构数据",
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        bottom: 10,
        left: "center",
        data: ["西凉", "益州", "兖州", "荆州", "幽州"],
      },
      series: [
        {
          type: "pie",
          radius: "65%",
          center: ["50%", "50%"],
          selectedMode: "single",
          data: [
            { value: 1548, name: "幽州" },
            { value: 735, name: "荆州" },
            { value: 510, name: "兖州" },
            { value: 434, name: "益州" },
            { value: 335, name: "西凉" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    option && myChart.setOption(option);
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  computed: {
    ...mapState("student", ["studentsData", "undoneNum"]),
  },
  methods: {
    open() {
      if (this.user === "管理员") {
        const h = this.$createElement;
        this.$notify({
          title: "消息通知",
          message: h(
            "span",
            { style: "color: salmon" },
            "当前还有" + this.undoneNum + "位同学的个人资料未完善"
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
      this.userData = row;
    },
    // 处理删除学生操作
    deleteRow(index, rows) {
      console.log(rows[index]);
      this.$confirm("是否要删除该学生?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("student/aDeleStudentsByName", rows[index].name);
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
    // 处理添加学生操作
    addStudent() {
      sessionStorage.setItem("regId", "学生");
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
#student {
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