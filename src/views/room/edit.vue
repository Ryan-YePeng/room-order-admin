<template>
  <el-dialog
      title="修改会议室"
      width="600px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible"
  >
    <el-form :model="form" :rules="rules" ref="Form" label-width="100px">
      <el-form-item label="会议室编号" prop="number">
        <el-input v-model="form.number"></el-input>
      </el-form-item>
      <el-form-item label="会议室名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="设备清单">
        <el-checkbox-group v-model="form.facility">
          <el-checkbox label="电脑"></el-checkbox>
          <el-checkbox label="饮水机"></el-checkbox>
          <el-checkbox label="投影仪"></el-checkbox>
          <el-checkbox label="音响"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="会议室备注" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <submit-button ref="SubmitButton" @submit="submitForm"/>
    </div>
  </el-dialog>
</template>

<script>
  import {addOrEditRoomApi} from "@/api/room";

  export default {
    name: "EditRoom",
    data() {
      return {
        visible: false,
        form: {
          id: null,
          number: "",
          name: "",
          facility: [],
          remark: ''
        },
        rules: {
          number: {required: true, message: "请输入会议室编号", trigger: "blur"}
        }
      };
    },
    methods: {
      submitForm() {
        this.$refs["Form"].validate(valid => {
          if (valid) {
            let data = {...this.form};
            data.facility = data.facility.join(',');
            this.$refs.SubmitButton.start();
            addOrEditRoomApi(data)
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
