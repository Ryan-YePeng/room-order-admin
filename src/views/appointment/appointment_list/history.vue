<template>
  <el-card class="box-card">
    <element-table ref="ElementTable" :data="formData">
      <el-table-column prop="meetingNumber" label="会议室编号"></el-table-column>
      <el-table-column prop="meetingName" label="会议名称"></el-table-column>
      <el-table-column prop="name" label="预约人"></el-table-column>
      <el-table-column prop="phone" label="联系电话"></el-table-column>
      <el-table-column prop="content" label="会议内容"></el-table-column>
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
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status === 1">通过</el-tag>
          <el-tag type="warning" v-if="scope.row.status === 2">拒绝</el-tag>
          <el-tag type="info" v-if="scope.row.status === 0">未审核</el-tag>
        </template>
      </el-table-column>
    </element-table>
    <pagination ref="Pagination" @getNewData="getOldMeeting"/>
  </el-card>
</template>

<script>
  import {getOldMeetingApi} from '@/api/appointment'

  export default {
    name: "History",
    data() {
      return {
        formData: [],
        searchSeek: ''
      };
    },
    mounted() {
      this.getOldMeeting();
    },
    methods: {
      getOldMeeting() {
        let pagination = this.$refs.Pagination;
        let param = {
          pagination: pagination.current - 1,
          size: pagination.size,
          seek: this.searchSeek
        };
        this.$refs.ElementTable.start();
        getOldMeetingApi(param).then(result => {
          this.$refs.ElementTable.stop();
          this.formData = result.data.content;
          pagination.total = result.data.count;
        });
      }
    }
  }
</script>
