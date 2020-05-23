<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-select v-model="searchSeek" @change="getMeeting">
        <el-option label="通过" :value="1"></el-option>
        <el-option label="拒绝" :value="2"></el-option>
      </el-select>
    </div>
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
        </template>
      </el-table-column>
    </element-table>
    <pagination ref="Pagination" @getNewData="getMeeting"/>
  </el-card>
</template>

<script>
  import {getMeetingApi} from '@/api/appointment'

  export default {
    name: "Audited",
    data() {
      return {
        formData: [],
        searchSeek: 1
      };
    },
    mounted() {
      this.getMeeting();
    },
    methods: {
      getMeeting() {
        let pagination = this.$refs.Pagination;
        let param = `${this.searchSeek}?pagination=${pagination.current - 1}&size=${pagination.size}&seek=${this.searchSeek}`;
        this.$refs.ElementTable.start();
        getMeetingApi(param).then(result => {
          this.$refs.ElementTable.stop();
          this.formData = result.data.content;
          pagination.total = result.data.count;
        });
      }
    }
  }
</script>
