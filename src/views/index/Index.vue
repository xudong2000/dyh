<template>
  <div id="index">
    <el-tabs v-model="activeName">
      <el-tab-pane label="可视化" name="first">
        <div style="border: none" id="myCharts"></div>
      </el-tab-pane>

      <el-tab-pane label="热门专业" name="second">
        <el-carousel :interval="4000" type="card" height="500px">
          <el-carousel-item v-for="item in specialtys" :key="item.id">
            <div class="specialty">
              <div class="photo">
                <img :src="item.avatar" alt="" />
              </div>
              <div class="name">
                <span>{{ item.name }}</span>
              </div>
              <div class="intro">
                <span>{{ item.intro }}</span>
              </div>
              <div class="totalNum">
                <span>专业所学人数：{{ item.number }}人</span>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { specialtys } from "../../common/index";

import { mapState } from "vuex";

export default {
  name: "Index",
  data() {
    return {
      // 默认标签页
      activeName: "first",
      // 热门专业
      specialtys,
      // 已教学生人数
      stuNumber: 0,
    };
  },
  created() {
    this.$store.dispatch("teacher/aGetTeachersData");
    for (let i of this.studentsData) {
      for (let j of this.specialtys) {
        if (i.specialty === j.name) {
          j.number++;
        }
      }
    }
  },
  mounted() {
    this.barCharts();
    // console.log(this.studentsData.length);
    // console.log(this.teachersData.length);
    // console.log(this.allClassData.length);
  },
  computed: {
    ...mapState("student", ["studentsData"]),
    ...mapState("teacher", ["teachersData"]),
    ...mapState("team", ["allClassData"]),
  },
  methods: {
    // 柱状图
    barCharts() {
      Object.defineProperty(
        document.getElementById("myCharts"),
        "clientWidth",
        {
          get: function () {
            return 800;
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
      let barCharts = this.$echarts.init(document.getElementById("myCharts"));
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "category",
          data: ["学生人数", "教师人数", "班级数量", "管理员"],
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      };
      option.xAxis.data = ["学生人数", "教师人数", "班级数量", "管理员"];
      option.series[0].data = [
        this.studentsData.length,
        this.teachersData.length,
        this.allClassData.length,
        3,
      ];
      barCharts.setOption(option);
    },
  },
};
</script>

<style scoped>
#index {
  width: 100%;
  height: auto;
  min-height: 640px;
  background-color: #fff;
  padding: 20px;
}

/* 标签页 */
.el-tab-pane {
  padding: 0 150px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

/* 讲师资料 */
.profile {
  background-color: #fff;
  width: 100%;
  height: 100%;
  padding: 10px;
  border: 1px solid #ccc;
}
.avatar {
  width: 200px;
  height: 200px;
  float: left;
  margin-right: 20px;
  margin-bottom: 10px;
}
.avatar img {
  width: 100%;
  height: 100%;
}
.nickName {
  width: auto;
  height: 30px;
  float: left;
  margin-top: 20%;
  font-size: 20px;
  font-weight: bold;
}
.nickName span:nth-child(1) {
  margin-right: 20px;
}
.school {
  width: auto;
  height: 20px;
  float: left;
  margin-top: 2%;
  font-size: 12px;
}
.school span {
  margin-right: 8px;
}
.information {
  width: 100%;
  height: 200px;
  float: left;
  font-size: 14px;
  padding: 5px;
  border: 1px solid #ccc;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 10;
  margin-bottom: 25px;
}

/* 专业简介 */
.specialty {
  background-color: rgb(255, 255, 255);
  width: 100%;
  height: 100%;
  padding: 10px;
  border: 1px solid #ccc;
}
.photo {
  width: 100%;
  height: 200px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}
.photo img {
  width: 100%;
  height: 100%;
}
.name {
  width: 100%;
  height: 30px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
.intro {
  width: 100%;
  height: 200px;
  margin-bottom: 10px;
  font-size: 14px;
  padding: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 10;
}
.totalNum {
  width: 100%;
  height: 30px;
  font-size: 14px;
  line-height: 30px;
  padding: 0 5px;
  float: left;
}
</style>