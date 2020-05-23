<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-input placeholder="搜索" v-model="searchSeek" clearable class="w-200" @keyup.enter.native="getFeedback"/>
      <el-button type="success" class="el-icon-search ml-5" @click="getFeedback">搜索</el-button>
    </div>
    <element-table ref="ElementTable" :data="formData">
      <el-table-column prop="id" label="反馈编号"></el-table-column>
      <el-table-column prop="user" label="反馈用户ID"></el-table-column>
      <el-table-column prop="type" label="反馈类型">
        <template slot-scope="scope">
          <span v-if="scope.row.type">小程序反馈</span>
          <span v-else>会议室反馈</span>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="反馈内容"></el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | formatDateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="80">
        <template slot-scope="scope">
          <delete-button
              :ref="scope.row.id"
              :id="scope.row.id"
              @start="delFeedback"
          />
        </template>
      </el-table-column>
    </element-table>
    <pagination ref="Pagination" @getNewData="getFeedback"/>
  </el-card>
</template>

<script>
  import {getFeedbackApi, delFeedbackApi} from '@/api/feedback'

  export default {
    name: "FeedBack",
    data() {
      return {
        formData: [],
        searchSeek: ""
      };
    },
    mounted() {
      this.getFeedback();
    },
    methods: {
      getFeedback() {
        let pagination = this.$refs.Pagination;
        let param = {
          pagination: pagination.current - 1,
          size: pagination.size,
          seek: this.searchSeek
        };
        this.$refs.ElementTable.start();
        getFeedbackApi(param).then(result => {
          this.$refs.ElementTable.stop();
          this.formData = result.data.content;
          pagination.total = result.data.count;
        });
      },
      delFeedback(id) {
        delFeedbackApi({id: id})
          .then(() => {
            this.getFeedback();
            this.$refs[id].close();
          })
          .catch(() => {
            this.$refs[id].stop();
          })
      }
    }
  }
</script>
