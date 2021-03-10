<template>
  <div id="edit-form">
    <el-dialog
      title="编辑学生个人资料"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
      width="70%"
    >
      <el-form ref="editRef" :model="userData" :rules="editRules">
        <el-form-item label="头像地址" :label-width="formLabelWidth">
          <el-input
            v-model="userData.avatar"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item
          label="学生姓名"
          prop="name"
          :label-width="formLabelWidth"
        >
          <el-input v-model="userData.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="学生性别" prop="sex" :label-width="formLabelWidth">
          <el-radio v-model="userData.sex" label="男">男</el-radio>
          <el-radio v-model="userData.sex" label="女">女</el-radio>
        </el-form-item>

        <el-form-item label="学生年龄" prop="age" :label-width="formLabelWidth">
          <el-input v-model.number="userData.age" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="籍贯"
          prop="hometown"
          :label-width="formLabelWidth"
        >
          <el-cascader
            :options="options"
            clearable
            v-model="userData.hometown"
          ></el-cascader>
        </el-form-item>

        <el-form-item
          label="出生日期"
          prop="birthday"
          :label-width="formLabelWidth"
        >
          <el-date-picker
            v-model="userData.birthday"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item
          label="入学日期"
          prop="startTime"
          :label-width="formLabelWidth"
        >
          <el-date-picker
            v-model="userData.startTime"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item
          label="就业方向"
          prop="specialty"
          :label-width="formLabelWidth"
        >
          <el-select v-model="userData.specialty" placeholder="请选择">
            <el-option
              v-for="item in mySpecialty"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="宿舍号"
          prop="dormitory"
          :label-width="formLabelWidth"
        >
          <el-select v-model="userData.dormitory" placeholder="请选择">
            <el-option
              v-for="item in myDormitory"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="所在班级"
          prop="c_id"
          :label-width="formLabelWidth"
        >
          <el-select v-model="userData.c_id" placeholder="请选择">
            <el-option
              v-for="item in allClassName"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="班里职位" prop="job" :label-width="formLabelWidth">
          <el-select v-model="userData.job" placeholder="请选择">
            <el-option
              v-for="item in myJob"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="班主任"
          prop="classTeacher"
          :label-width="formLabelWidth"
        >
          <el-select v-model="userData.classTeacher" placeholder="请选择">
            <el-option
              v-for="item in teachersName"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-collapse v-model="activeNames" style="margin-bottom: 10px">
          <el-collapse-item title="联系方式" name="1">
            <el-form-item
              label="手机号"
              prop="telephone"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="userData.telephone"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="邮箱"
              prop="email"
              :label-width="formLabelWidth"
            >
              <el-input v-model="userData.email" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="QQ号" prop="qq" :label-width="formLabelWidth">
              <el-input v-model="userData.qq" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item
              label="微信号"
              prop="wechat"
              :label-width="formLabelWidth"
            >
              <el-input v-model="userData.wechat" autocomplete="off"></el-input>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>

        <el-form-item
          label="个性签名"
          prop="signature"
          :label-width="formLabelWidth"
        >
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入你的留言"
            v-model="userData.signature"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="照片展示" :label-width="formLabelWidth">
          <el-input
            v-model="editForm.photo"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="noModify">取消修改</el-button>
        <el-button type="primary" @click="modify" :loading="isLoading"
          >确认修改</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { options } from "../../../common/address";
import { mapState } from "vuex";
import { getStudentsDataByParams } from "../../../network/login";
import { updateStudentByName } from "../../../network/student";

export default {
  name: "EditForm",
  data() {
    // 校验用户名
    var validateName = (rule, value, callback) => {
      var name = /^[\u4e00-\u9fa5]{2,6}$/;
      var result = name.test(value);
      if (result === false) {
        callback(new Error("用户名只能为2-6个字符之间的汉字"));
      } else {
        callback();
      }
    };
    // 校验年龄
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入整数数值"));
        } else {
          if (value < 16 || value > 24) {
            callback(new Error("请输入16-24岁范围内的年龄"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      // 保存编辑表单中的数据
      editForm: {
        avatar: "",
        name: "",
        sex: "男",
        age: "",
        hometown: "",
        birthday: "",
        startTime: "",
        specialty: "",
        dormitory: "",
        c_id: "",
        job: "",
        classTeacher: "",
        telephone: "",
        email: "",
        qq: "",
        wechat: "",
        signature: "",
        photo: "",
      },
      // 校验编辑表单中的数据
      editRules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { validator: validateName, trigger: "blur" },
        ],
        age: [{ required: true, validator: checkAge, trigger: "blur" }],
        hometown: [
          { required: true, message: "请选择你的户籍地址", trigger: "change" },
        ],
        birthday: [
          { required: true, message: "请选择你的出生日期", trigger: "change" },
        ],
        startTime: [
          { required: true, message: "请选择你的入学时间", trigger: "change" },
        ],
        specialty: [
          { required: true, message: "请输入你的就业方向", trigger: "change" },
        ],
        dormitory: [
          { required: true, message: "请输入你的宿舍号", trigger: "change" },
        ],
        c_id: [
          { required: true, message: "请输入你所在的班级", trigger: "change" },
        ],
        job: [
          {
            required: true,
            message: "请输入你在班里的职位",
            trigger: "change",
          },
        ],
        classTeacher: [
          {
            required: true,
            message: "请输入你的班主任姓名",
            trigger: "change",
          },
        ],
        telephone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "长度只能为11位数字",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入你的QQ邮箱", trigger: "blur" },
          {
            min: 15,
            max: 17,
            message: "长度在 15 到 17 个字符",
            trigger: "blur",
          },
        ],
        qq: [
          { required: true, message: "请输入你的QQ号", trigger: "blur" },
          {
            min: 8,
            max: 10,
            message: "长度在 8 到 10 个字符",
            trigger: "blur",
          },
        ],
        wechat: [
          { required: true, message: "请输入你的微信号", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
      // 表单label宽度
      formLabelWidth: "100px",
      // 默认显示的下标值
      activeNames: ["2"],
      // 表单是否可见
      dialogFormVisible: false,
      // 保存所有地名数据
      options: options,
      // 就业方向
      mySpecialty: [
        {
          value: "web前端",
          label: "web前端",
        },
        {
          value: "Java后端",
          label: "Java后端",
        },
        {
          value: "UI设计",
          label: "UI设计",
        },
        {
          value: "软件测试",
          label: "软件测试",
        },
        {
          value: "运维实施",
          label: "运维实施",
        },
        {
          value: "嵌入式",
          label: "嵌入式",
        },
        {
          value: "其他专业",
          label: "其他专业",
        },
      ],
      // 宿舍号
      myDormitory: [
        {
          value: "1010",
          label: "1010",
        },
        {
          value: "1011",
          label: "1011",
        },
        {
          value: "1012",
          label: "1012",
        },
        {
          value: "1013",
          label: "1013",
        },
        {
          value: "1014",
          label: "1014",
        },
        {
          value: "其他宿舍",
          label: "其他宿舍",
        },
      ],
      // 班级职位
      myJob: [
        {
          value: "学生",
          label: "学生",
        },
        {
          value: "班长",
          label: "班长",
        },
        {
          value: "副班长",
          label: "副班长",
        },
        {
          value: "学习委员",
          label: "学习委员",
        },
        {
          value: "体育委员",
          label: "体育委员",
        },
        {
          value: "其他",
          label: "其他",
        },
      ],
      // 是否加载中
      isLoading: false,
      // 姓名
      name: "",
      // 手机号
      telephone: "",
      // 邮箱
      email: "",
      // QQ号
      qq: "",
      // 微信号
      wechat: "",
      // 结果是否为true
      result: false,
    };
  },
  props: ["userData", "curName", "curClass"],
  computed: {
    ...mapState("team", ["allClassName"]),
    ...mapState("teacher", ["teachersName"]),
  },
  methods: {
    // 确认修改
    modify() {
      this.isLoading = true;
      (this.name = ""),
        (this.telephone = ""),
        (this.email = ""),
        (this.qq = ""),
        (this.wechat = ""),
        this.$refs.editRef.validate((valid) => {
          if (!valid) {
            this.isLoading = false;
            this.dialogFormVisible = true;
            return this.$message.error("您修改的个人信息不符合规范！");
          } else {
            for (let i in this.userData) {
              if (i === "name") {
                getStudentsDataByParams(i, this.userData[i]).then(
                  (res) => {
                    const { data } = res.data;
                    if (data.length === 0) {
                      this.name = data;
                    } else {
                      if (this.curName === data[0].name) {
                        this.name = [];
                      } else {
                        this.name = data;
                      }
                    }
                  },
                  (err) => {
                    console.log("查询数据失败" + err);
                  }
                );
              }

              if (i === "telephone") {
                getStudentsDataByParams(i, this.userData[i]).then(
                  (res) => {
                    const { data } = res.data;
                    if (data.length === 0) {
                      this.telephone = data;
                    } else {
                      if (this.userData.name === data[0].name) {
                        this.telephone = [];
                      } else {
                        this.telephone = data;
                      }
                    }
                  },
                  (err) => {
                    console.log("查询数据失败" + err);
                  }
                );
              }

              if (i === "email") {
                getStudentsDataByParams(i, this.userData[i]).then(
                  (res) => {
                    const { data } = res.data;
                    if (data.length === 0) {
                      this.email = data;
                    } else {
                      if (this.userData.name === data[0].name) {
                        this.email = [];
                      } else {
                        this.email = data;
                      }
                    }
                  },
                  (err) => {
                    console.log("查询数据失败" + err);
                  }
                );
              }

              if (i === "qq") {
                getStudentsDataByParams(i, this.userData[i]).then(
                  (res) => {
                    const { data } = res.data;
                    if (data.length === 0) {
                      this.qq = data;
                    } else {
                      if (this.userData.name === data[0].name) {
                        this.qq = [];
                      } else {
                        this.qq = data;
                      }
                    }
                  },
                  (err) => {
                    console.log("查询数据失败" + err);
                  }
                );
              }

              if (i === "wechat") {
                getStudentsDataByParams(i, this.userData[i]).then(
                  (res) => {
                    const { data } = res.data;
                    if (data.length === 0) {
                      this.wechat = data;
                    } else {
                      if (this.userData.name === data[0].name) {
                        this.wechat = [];
                      } else {
                        this.wechat = data;
                      }
                    }
                  },
                  (err) => {
                    console.log("查询数据失败" + err);
                  }
                );
              }
            }

            setTimeout(() => {
              this.isLoading = false;

              if (this.name.length === 0) {
                this.result = true;
              } else {
                this.dialogFormVisible = true;
                return this.$message({
                  showClose: true,
                  message: "该名字已被注册",
                  type: "error",
                });
              }

              if (this.telephone.length === 0) {
                this.result = true;
              } else {
                this.dialogFormVisible = true;
                return this.$message({
                  showClose: true,
                  message: "该手机号已被注册",
                  type: "error",
                });
              }

              if (this.email.length === 0) {
                this.result = true;
              } else {
                this.dialogFormVisible = true;
                return this.$message({
                  showClose: true,
                  message: "该邮箱已被注册",
                  type: "error",
                });
              }

              if (this.qq.length === 0) {
                this.result = true;
              } else {
                this.dialogFormVisible = true;
                return this.$message({
                  showClose: true,
                  message: "该QQ号已被注册",
                  type: "error",
                });
              }

              if (this.wechat.length === 0) {
                this.result = true;
              } else {
                this.dialogFormVisible = true;
                return this.$message({
                  showClose: true,
                  message: "该微信号已被注册",
                  type: "error",
                });
              }

              if (this.result) {
                this.dialogFormVisible = false;
                updateStudentByName([this.curName, this.userData]).then(
                  (res) => {
                    // console.log(res);
                  },
                  (err) => {
                    console.log("修改数据失败" + err);
                  }
                );

                this.$store.dispatch("student/aGetStudentsData");

                if (this.curClass !== this.userData.c_id) {
                  const c_name = this.curClass.substring(
                    0,
                    this.curClass.length - 1
                  );

                  const className = this.userData.c_id.substring(
                    0,
                    this.userData.c_id.length - 1
                  );

                  this.$store.dispatch("team/aDeleStudentByClass", [
                    c_name,
                    this.userData.name,
                  ]);

                  setTimeout(() => {
                    this.$store.dispatch("team/aAddStudentByClass", [
                      className,
                      this.userData.name,
                    ]);
                  }, 1000);
                }
                this.$message({
                  showClose: true,
                  message: "修改成功",
                  type: "success",
                });
              } else {
                return this.$message({
                  showClose: true,
                  message: "不符合规范",
                  type: "error",
                });
              }
            }, 1000);
          }
        });
    },
    // 取消修改
    noModify() {
      this.$confirm("是否取消更改?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.dialogFormVisible = false;
          this.$store.dispatch("student/aGetStudentsData");
          this.$message({
            type: "warning",
            message: "已取消修改！",
          });
        })
        .catch(() => {});
    },
    // 关闭对话框
    handleClose(done) {},
  },
};
</script>

<style>
.el-cascader {
  width: 100%;
}
.el-dialog__body {
  padding: 30px 120px;
}
.el-form {
  width: 500px;
}
.el-collapse-item__content {
  width: 400px;
}
.el-cascader-menu:last-child {
  height: 600px;
}
</style>