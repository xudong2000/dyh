<template>
  <div id="class">
    <search :user="user" id="班级" />
    <el-divider></el-divider>
    <ul class="stuList" v-show="classStudent.length !== 0">
      <li
        v-for="item in classStudent"
        :key="item.t_id"
        @click="lookDetail(item)"
      >
        <div class="stuAvatar">
          <img :src="item.avatar" alt="" />
        </div>
        <div class="stuName">
          <span>{{ item.name }}</span>
        </div>
      </li>
    </ul>

    <!-- 详情 -->
    <el-dialog
      :title="curStuData.name + '的个人资料'"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="40%"
    >
      <p>
        头像：<el-avatar
          :size="60"
          style="vertical-align: middle"
          :src="curStuData.avatar"
        ></el-avatar>
      </p>
      <p>
        姓名：<span class="mark">{{ curStuData.name }}</span>
      </p>
      <p>
        性别：<span class="mark">{{ curStuData.sex }}</span>
      </p>
      <p>
        年龄：<span class="mark">{{ curStuData.age }}</span>
      </p>
      <p>
        出生年月：<span class="mark">{{ curStuData.birthday }}</span>
      </p>
      <p>
        籍贯：<span class="mark">{{ curStuData.hometown }}</span>
      </p>
      <p>
        班级：<span class="mark">{{ curStuData.c_id }}</span>
      </p>
      <p>
        班里职位：<span class="mark">{{ curStuData.job }}</span>
      </p>
      <p>
        班主任：<span class="mark">{{ curStuData.classTeacher }}</span>
      </p>
      <p>
        就业方向：<span class="mark">{{ curStuData.specialty }}</span>
      </p>
      <p>
        入学时间：<span class="mark">{{ curStuData.startTime }}</span>
      </p>
      <el-collapse v-model="activeNames" style="margin-bottom: 10px">
        <el-collapse-item title="联系方式" name="1">
          <p>
            手机号：<span class="mark">{{ curStuData.telephone }}</span>
          </p>
          <p>
            邮箱：<span class="mark">{{ curStuData.email }}</span>
          </p>
          <p>
            QQ号：<span class="mark">{{ curStuData.qq }}</span>
          </p>
          <p>
            微信号：<span class="mark">{{ curStuData.wechat }}</span>
          </p>
        </el-collapse-item>
      </el-collapse>
      <p>
        个性签名：<span class="mark">{{ curStuData.signature }}</span>
      </p>
      <p>照片展示</p>
      <div>
        <a
          href="javascript:;"
          v-for="(item, index) in curStuData.photo"
          :key="index"
          class="photo"
          ><img :src="item" alt=""
        /></a>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>

    <div class="nullData" v-show="classStudent.length === 0">
      <span>查询结果为空</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import Search from "../../components/search/Search";

export default {
  name: "Teacher",
  components: {
    Search,
  },
  data() {
    return {
      // 详情页是否可见
      dialogVisible: false,
      // 默认显示的下标值
      activeNames: ["2"],
      // 当前学生数据
      curStuData: [],
    };
  },
  props: ["user"],
  created() {
    this.$store.dispatch("student/aGetStudentsData");
  },
  computed: {
    ...mapState("student", ["studentsData", "classStudent"]),
  },
  methods: {
    lookDetail(stuData) {
      this.dialogVisible = true;
      this.curStuData = stuData;
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
  },
};
</script>

<style>
#class {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 50px;
}
.stuList {
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
}
.stuList li {
  width: 60px;
  height: 90px;
  margin: 10px 20px;
}
.stuAvatar {
  width: 100%;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}
.stuAvatar img {
  width: 100%;
  height: 100%;
}
.stuName {
  width: 100%;
  height: 20px;
  text-align: center;
  font-size: 13px;
  margin-top: 10px;
}
.nullData {
  text-align: center;
  font-size: 20px;
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
</style>