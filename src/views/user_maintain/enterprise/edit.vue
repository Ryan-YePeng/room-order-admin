<template>
  <el-dialog
      title="编辑企业用户"
      width="600px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible"
  >
    <el-form :model="form" :rules="rules" ref="Form" label-width="120px">
      <el-form-item label="企业账号" prop="username">
        <el-input v-model="form.username" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="企业联系人" prop="nickname">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="企业联系电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="企业邮箱" prop="postbox">
        <el-input v-model="form.postbox"></el-input>
      </el-form-item>
      <el-form-item label="企业地址" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <submit-button ref="SubmitButton" @submit="submitForm"/>
    </div>
  </el-dialog>
</template>

<script>
  import {addOrEditCompanyApi} from "@/api/user";

  export default {
    name: "EditEnterprise",
    data() {
      return {
        visible: false,
        form: {
          id: '',
          username: "",
          name: "",
          nickname: '',
          phone: '',
          address: '',
          postbox: '',
          icon: ''
        },
        rules: {
          username: {required: true, message: "请输入企业账号", trigger: "blur"},
          name: {required: true, message: "请输入企业名称", trigger: "blur"},
          nickname: {required: true, message: "请输入企业联系人", trigger: "blur"},
          phone: {required: true, message: "请输入企业联系电话", trigger: "blur"},
          address: {required: true, message: "请输入企业地址", trigger: "blur"},
          postbox: [
            {required: true, message: "请输入邮箱地址", trigger: "blur"},
            {type: 'email', message: "请输入正确的邮箱地址", trigger: "blur"}
          ]
        }
      };
    },
    methods: {
      submitForm() {
        this.$refs["Form"].validate(valid => {
          if (valid) {
            let data = {...this.form};
            this.$refs.SubmitButton.start();
            addOrEditCompanyApi(data)
              .then(() => {
                this.$refs.SubmitButton.stop();
                this.$emit("update");
                this.cancel();
              })
              .catch(() => {
                this.$refs.SubmitButton.stop();
              });
          } else {
            return false;
          }
        });
      },
      cancel() {
        this.visible = false;
        Object.assign(this.$data.form, this.$options.data().form);
        this.$refs["Form"].clearValidate()
      }
    }
  };
</script>
