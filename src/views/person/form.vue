<template>
  <el-dialog
      title="修改个人信息"
      width="600px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible"
  >
    <el-form :model="form" :rules="rules" ref="Form" label-width="100px">
      <el-form-item v-if="!isAdmin" label="企业名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item v-if="!isAdmin" label="联系人" prop="nickname">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item v-if="isAdmin" label="昵称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="postbox">
        <el-input v-model="form.postbox"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
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
  import {updateInfoApi} from "@/api/person";

  export default {
    name: "EditPerson",
    data() {
      return {
        visible: false,
        form: {
          name: "", // 企业名
          nickname: "", // 联系人
          phone: "", // 联系电话
          icon: "", // 头像
          postbox: "", // 邮箱,
          address: "" // 地址
        },
        rules: {
          name: {required: true, message: "请输入", trigger: "blur"},
          nickname: {required: true, message: "请输入联系人", trigger: "blur"},
          phone: {required: true, message: "请输入联系电话", trigger: "blur"}
        }
      };
    },
    computed: {
      user: function () {
        return this.$storeGet.user;
      },
      isAdmin() {
        return this.$storeGet.user.role === "ROLE_SUPER";
      }
    },
    methods: {
      submitForm() {
        this.$refs["Form"].validate(valid => {
          if (valid) {
            let data = {...this.form};
            this.$refs.SubmitButton.start();
            if (this.isAdmin) data.nickname = '超管';
            updateInfoApi(data)
              .then(() => {
                this.$successMsg('修改成功');
                let obj = {...this.user};
                obj.name = data.name;
                obj.nickname = data.nickname;
                obj.phone = data.phone;
                obj.postbox = data.postbox;
                obj.address = data.address;
                this.$storeSet('setUser', obj);
                this.$refs.SubmitButton.stop();
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
