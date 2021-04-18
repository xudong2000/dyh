<template>
  <div id="edit-class">
    <el-dialog
      title="增加班级"
      :visible.sync="dialogVisible"
      width="45%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="班级名称" prop="c_id">
          <el-input v-model="ruleForm.c_id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="最大人数" prop="count">
          <el-input
            v-model.number="ruleForm.count"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >创 建</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getClassData, createClass } from "../../../network/class";

export default {
  name: "EditClass",
  data() {
    // 校验人数
    var checkCount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("最大人数不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入整数数值"));
        } else {
          if (value < 10 || value > 50) {
            callback(new Error("请输入范围在10-50人之间的数值"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      dialogVisible: false,
      ruleForm: {
        c_id: "",
        count: 0,
      },
      rules: {
        c_id: [
          { required: true, message: "请输入班级名称", trigger: "blur" },
          { min: 3, max: 4, message: "长度为3-4个字符", trigger: "blur" },
        ],
        count: [
          { required: true, message: "请输入最大容纳人数", trigger: "blur" },
          { validator: checkCount, trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  computed: {
    ...mapState("team", ["allClassName"]),
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const result = await getClassData({ c_id: this.ruleForm.c_id });
          if (result.data.data.length === 0) {
            await createClass(this.ruleForm);
            this.$message({
              showClose: true,
              type: "success",
              message: "创建成功",
            });
            this.dialogVisible = false;
          } else {
            this.$message({
              showClose: true,
              type: "error",
              message: "该班级名称已经存在",
            });
          }
        } else {
          return this.$message({
            showClose: true,
            type: "error",
            message: "您输入的信息不符合规范",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
</style>