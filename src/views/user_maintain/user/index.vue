<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-input placeholder="搜索" v-model="searchSeek" clearable class="w-200" @keyup.enter.native="getUser"/>
      <el-button type="success" class="el-icon-search ml-5" @click="getUser">搜索</el-button>
    </div>
    <element-table ref="ElementTable" :data="formData">
      <el-table-column prop="companyId" label="企业ID"></el-table-column>
      <el-table-column prop="id" label="用户ID"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别">
        <template slot-scope="scope">
          <span v-if="scope.row.sex === 0">男</span>
          <span v-else>女</span>
        </template>
      </el-table-column>
      <el-table-column prop="nickname" label="微信昵称"></el-table-column>
      <el-table-column prop="icon" label="微信头像">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="44" :src="scope.row.icon">
            <img src="../../../assets/notFound.png" alt="微信头像"/>
          </el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="联系电话"></el-table-column>
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
              @start="delUser"
          />
        </template>
      </el-table-column>
    </element-table>
    <pagination ref="Pagination" @getNewData="getUser"/>
  </el-card>
</template>

<script>
  import {getUserApi, delUserApi} from '@/api/user'

  export default {
    name: "User",
    data() {
      return {
        formData: [],
        searchSeek: ""
      };
    },
    mounted() {
      this.getUser();
    },
    methods: {
      getUser() {
        let pagination = this.$refs.Pagination;
        let param = {
          pagination: pagination.current - 1,
          size: pagination.size,
          seek: this.searchSeek
        };
        this.$refs.ElementTable.start();
        getUserApi(param).then(result => {
          this.$refs.ElementTable.stop();
          this.formData = result.data.content;
          pagination.total = result.data.count;
        });
      },
      delUser(id) {
        delUserApi({id: id})
          .then(() => {
            this.getUser();
            this.$refs[id].close();
          })
          .catch(() => {
            this.$refs[id].stop();
          })
      }
    }
  }
</script>
