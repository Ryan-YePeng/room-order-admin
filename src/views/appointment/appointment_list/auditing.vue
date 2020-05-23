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
      <el-table-column label="操作" fixed="right" align="center" width="180">
        <template slot-scope="scope">
          <el-button type="success" @click="pass(scope.row.id)">通过</el-button>
          <el-button type="warning" @click="reject(scope.row.id)">拒绝</el-button>
        </template>
      </el-table-column>
    </element-table>
    <pagination ref="Pagination" @getNewData="getMeeting"/>
  </el-card>
</template>

<script>
  import {getMeetingApi, changeMeetingStateApi} from '@/api/appointment'

  export default {
    name: "Auditing",
    data() {
      return {
        formData: [],
        searchSeek: ""
      };
    },
    mounted() {
      this.getMeeting();
    },
    methods: {
      getMeeting() {
        let pagination = this.$refs.Pagination;
        let param = `0?pagination=${pagination.current - 1}&size=${pagination.size}&seek=${this.searchSeek}`;
        this.$refs.ElementTable.start();
        getMeetingApi(param).then(result => {
          this.$refs.ElementTable.stop();
          this.formData = result.data.content;
          pagination.total = result.data.count;
        });
      },
      pass(id) {
        this.$msgBox('确认通过？').then(() => {
          changeMeetingStateApi({id: id, state: 1}).then(() => {
            this.getMeeting();
          })
        })
      },
      reject(id) {
        this.$msgBox('确认拒绝？').then(() => {
          changeMeetingStateApi({id: id, state: 2}).then(() => {
            this.getMeeting();
          })
        })
      },
    }
  }
</script>
