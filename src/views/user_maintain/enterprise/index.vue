<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-input placeholder="搜索" v-model="searchSeek" clearable class="w-200" @keyup.enter.native="getCompany"/>
      <el-button type="success" class="el-icon-search ml-5" @click="getCompany">搜索</el-button>
    </div>
    <element-table ref="ElementTable" :data="formData">
      <el-table-column prop="id" label="企业ID"></el-table-column>
      <el-table-column prop="username" label="企业账号"></el-table-column>
      <el-table-column prop="name" label="企业名称"></el-table-column>
      <el-table-column prop="nickname" label="企业联系人"></el-table-column>
      <el-table-column prop="phone" label="企业联系电话"></el-table-column>
      <el-table-column prop="address" label="企业地址"></el-table-column>
      <el-table-column prop="postbox" label="企业邮箱"></el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="80">
        <template slot-scope="scope">
          <delete-button
              :ref="scope.row.id"
              :id="scope.row.id"
              @start="delCompany"
          />
        </template>
      </el-table-column>
    </element-table>
    <pagination ref="Pagination" @getNewData="getCompany"/>
  </el-card>
</template>

<script>
  import {getCompanyApi, delCompanyApi} from '@/api/user'

  export default {
    name: "Enterprise",
    data() {
      return {
        formData: [],
        searchSeek: ""
      };
    },
    mounted() {
      this.getCompany();
    },
    methods: {
      getCompany() {
        let pagination = this.$refs.Pagination;
        let param = {
          pagination: pagination.current - 1,
          size: pagination.size,
          seek: this.searchSeek
        };
        this.$refs.ElementTable.start();
        getCompanyApi(param).then(result => {
          this.$refs.ElementTable.stop();
          this.formData = result.data.content;
          pagination.total = result.data.count;
        });
      },
      delCompany(id) {
        delCompanyApi({id: id})
          .then(() => {
            this.getCompany();
            this.$refs[id].close();
          })
          .catch(() => {
            this.$refs[id].stop();
          })
      }
    }
  }
</script>
