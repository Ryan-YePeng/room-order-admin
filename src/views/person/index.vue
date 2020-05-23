<template>
  <div class="person">
    <el-card class="box-card" style="width: 70%;margin: 0 auto">
      <div slot="header" class="clearfix">
        <div style="text-align: center; margin-bottom: 20px">
          <el-upload
              :show-file-list="false"
              :on-success="handleSuccess"
              :on-error="handleError"
              :headers="headers"
              :action="baseUrl + '/file'"
              class="avatar-uploader">
            <el-avatar shape="circle" :size="120" :src="`${user.icon}`">
              <img src="https://myinterface.xuanzai.top/getPicture?type=error"/>
            </el-avatar>
          </el-upload>
        </div>
      </div>
      <ul class="personInfo">
        <li>
          <span>账号</span>
          <span>{{user.account}}</span>
        </li>
        <li v-if="!isAdmin">
          <span>企业名</span>
          <span>{{user.name}}</span>
        </li>
        <li v-if="!isAdmin">
          <span>联系人</span>
          <span>{{user.nickname}}</span>
        </li>
        <li v-if="isAdmin">
          <span>昵称</span>
          <span>{{user.name}}</span>
        </li>
        <li>
          <span>联系电话</span>
          <span>{{user.phone}}</span>
        </li>
        <li>
          <span>邮箱</span>
          <span>{{user.postbox}}</span>
        </li>
        <li>
          <span>地址</span>
          <span>{{user.address}}</span>
        </li>
        <li>
          <span>信息设置</span>
          <span>
            <a style="color: #317ef3; cursor: pointer" @click="changeInfo">修改信息</a>
          </span>
        </li>
        <li>
          <span>安全设置</span>
          <span>
            <a style="color: #317ef3; cursor: pointer" @click="changePassword">修改密码</a>
          </span>
        </li>
      </ul>
    </el-card>
    <password-dialog ref="PasswordDialog"></password-dialog>
    <edit-person ref="EditPerson"/>
  </div>
</template>

<script>
  import PasswordDialog from "./passwordDialog";
  import addAvatar from "./ImageUploaderPlus";
  import EditPerson from "./form";
  import {updateInfoApi} from "@/api/person";
  import {objectEvaluate} from "@/utils/common";

  export default {
    components: {PasswordDialog, addAvatar, EditPerson},
    name: "person",
    data() {
      return {
        isLoading: false,
        isTableLoading: false,
        loading: false,
        editFlag: false,
        form: {
          nickname: "",
          name: "",
          phone: "",
          icon: "",
          address: "",
          postbox: ""
        },
        searchSeek: ""
      };
    },
    computed: {
      user: function () {
        return this.$storeGet.user;
      },
      headers() {
        return {'Authorization': this.$store.getters.token}
      },
      baseUrl() {
        return process.env.VUE_APP_BASE_API
      },
      isAdmin() {
        return this.$storeGet.user.role === "ROLE_SUPER";
      }
    },
    methods: {
      changeInfo() {
        this.$refs.EditPerson.visible = true;
        objectEvaluate(this.$refs.EditPerson.form, this.user);
      },
      // 上传失败
      handleError(e) {
        const msg = JSON.parse(e.message);
        this.$errorMsg(msg)
      },
      // 上传成功
      handleSuccess(e) {
        let data = {...this.form};
        objectEvaluate(data, this.user);
        data.icon = e.data;
        if (this.isAdmin) data.nickname = '超管';
        updateInfoApi(data).then(() => {
          let obj = {...this.user};
          obj.icon = e.data;
          this.$storeSet('setUser', obj);
          this.$successMsg('头像修改成功');
        });
      },
      // 修改密码
      changePassword() {
        const _this = this.$refs.PasswordDialog;
        _this.passwordDialogVisible = true;
      },
      cancel() {
        this.form = {...this.$storeGet.user};
        this.editFlag = false;
      }
    }
  };
</script>

<style lang="scss">
  .person {
    .el-card__body {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .el-form {
      padding-left: 10px;

      .el-form-item {
        border-bottom: 1px solid #f0f3f4;
        margin-bottom: 0;

        input {
          border: none;
          outline: none;
          text-align: right;
        }
      }
    }

    .personInfo li {
      border-bottom: 1px solid #f0f3f4;
      border-top: 1px solid #f0f3f4;
      padding: 11px 0;
      font-size: 13px;
      display: flex;
      justify-content: space-between;
    }

    .el-avatar > img {
      width: 100%;
    }
  }
</style>
