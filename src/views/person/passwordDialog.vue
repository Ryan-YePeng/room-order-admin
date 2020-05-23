<template>
  <el-dialog
      title="修改密码"
      width="450px"
      :visible.sync="passwordDialogVisible"
      append-to-body
      @close="cancel"
      :close-on-click-modal="false"
  >
    <el-form
        :model="form"
        :rules="rules"
        ref="Form"
        label-width="120px"
        hide-required-asterisk
    >
      <el-form-item label="旧密码:" prop="oldPassword">
        <el-input
            type="password"
            v-model="form.oldPassword"
            autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码:" prop="password">
        <el-input
            type="password"
            v-model="form.password"
            autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码:" prop="checkPassword">
        <el-input
            type="password"
            v-model="form.checkPassword"
            autocomplete="off"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <submit-button
          ref="SubmitButton"
          @submit="submitPasswordForm"
      ></submit-button>
    </div>
  </el-dialog>
</template>

<script>
  import {resetApi} from "../../api/person";

  export default {
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入新密码"));
        } else if (value !== this.form.password) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      return {
        passwordDialogVisible: false,
        form: {
          oldPassword: "",
          password: "",
          checkPassword: ""
        },
        rules: {
          oldPassword: {required: true, message: "请输入旧密码", trigger: "blur"},
          password: {required: true, message: "请输入新密码", trigger: "blur"},
          checkPassword: {
            required: true,
            validator: validatePass,
            trigger: "blur"
          }
        }
      };
    },
    computed: {
      user() {
        return this.$storeGet.user;
      }
    },
    methods: {
      // 提交密码表单
      submitPasswordForm() {
        this.$refs["Form"].validate(valid => {
          if (valid) {
            this.$refs.SubmitButton.start();
            let data = {};
            data.password = this.form.oldPassword;
            data.newPassword = this.form.password;
            data.username = this.user.account;
            resetApi(data)
              .then(result => {
                if (result.code === 200) {
                  this.$message({
                    message: '修改成功！',
                    type: 'success',
                    offset: 55
                  });
                  this.$refs.SubmitButton.stop();
                  this.$removeLocalStorage("meetingRoomUser");
                  this.$removeCookiesStorage("meetingRoomToken");
                  this.$removeSessionStorage("meetingRoomLayout");
                  this.$router.push({name: "login"});
                  location.reload();
                } else {
                  this.$refs.SubmitButton.stop();
                }
              })
              .catch(() => {
                this.$refs.SubmitButton.stop();
              });
          } else {
            return false;
          }
        });
      },
      // 取消
      cancel() {
        this.resetForm();
      },
      // 重置表单
      resetForm() {
        this.passwordDialogVisible = false;
        Object.assign(this.$data.form, this.$options.data().form);
        this.$refs["Form"].clearValidate();
      }
    }
  };
</script>

<style scoped></style>
