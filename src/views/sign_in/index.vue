<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-input placeholder="搜索" v-model="searchSeek" clearable class="w-200" @keyup.enter.native="getSignIn"/>
      <el-button type="success" class="el-icon-search ml-5" @click="getSignIn">搜索</el-button>
    </div>
    <element-table ref="ElementTable" :data="formData">
      <el-table-column prop="meetingRoomNumber" label="会议室编号"></el-table-column>
      <el-table-column prop="meetingName" label="会议名称"></el-table-column>
      <el-table-column prop="remark" label="会议备注"></el-table-column>
      <el-table-column prop="count" label="签到人数"></el-table-column>
      <el-table-column label="会议开始时间">
        <template slot-scope="scope">
          <span>{{ scope.row.startTime | formatDateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="会议结束时间">
        <template slot-scope="scope">
          <span>{{ scope.row.endTime | formatDateTime }}</span>
        </template>
      </el-table-column>
    </element-table>
    <pagination ref="Pagination" @getNewData="getSignIn"/>
  </el-card>
</template>

<script>
  import {getSignInApi} from '@/api/sign'

  export default {
    name: "SignIn",
    data() {
      return {
        formData: [],
        searchSeek: ""
      };
    },
    mounted() {
      this.getSignIn();
    },
    methods: {
      getSignIn() {
        let pagination = this.$refs.Pagination;
        let param = {
          pagination: pagination.current - 1,
          size: pagination.size,
          seek: this.searchSeek
        };
        this.$refs.ElementTable.start();
        getSignInApi(param).then(result => {
          this.$refs.ElementTable.stop();
          this.formData = result.data.content;
          pagination.total = result.data.count;
        });
      }
    }
  }
</script>
