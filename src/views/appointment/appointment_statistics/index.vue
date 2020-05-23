<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>预约数据统计</span>
    </div>
    <element-table ref="ElementTable" :data="formData">
      <el-table-column prop="number" label="会议室编号"></el-table-column>
      <el-table-column prop="todayCount" label="今日"></el-table-column>
      <el-table-column prop="yesterdayCount" label="昨日"></el-table-column>
    </element-table>
    <pagination ref="Pagination" @getNewData="getStatistics"/>
  </el-card>
</template>

<script>
  import {getStatisticsApi} from '@/api/appointment'

  export default {
    name: "AppointmentStatistics",
    data() {
      return {
        formData: [],
        searchSeek: ""
      };
    },
    mounted() {
      this.getStatistics();
    },
    methods: {
      getStatistics() {
        let pagination = this.$refs.Pagination;
        let param = {
          pagination: pagination.current - 1,
          size: pagination.size,
          seek: this.searchSeek
        };
        this.$refs.ElementTable.start();
        getStatisticsApi(param).then(result => {
          this.$refs.ElementTable.stop();
          this.formData = result.data;
          // pagination.total = result.data.count;
        });
      }
    }
  }
</script>
