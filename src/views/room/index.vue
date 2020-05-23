<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-input placeholder="搜索" v-model="searchSeek" clearable class="w-200" @keyup.enter.native="getRoom"/>
      <el-button type="success" class="el-icon-search ml-5" @click="getRoom">搜索</el-button>
      <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add"/>
    </div>
    <element-table ref="ElementTable" :data="formData">
      <el-table-column prop="number" label="会议室编号"></el-table-column>
      <el-table-column prop="name" label="会议室名"></el-table-column>
      <el-table-column prop="facility" label="设备清单"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"></el-button>
          <delete-button
              :ref="scope.row.id"
              :id="scope.row.id"
              @start="delRoom"
          />
        </template>
      </el-table-column>
    </element-table>
    <pagination ref="Pagination" @getNewData="getRoom"/>
    <add-room ref="AddRoom" @update="getRoom"/>
    <edit-room ref="EditRoom" @update="getRoom"/>
  </el-card>
</template>

<script>
  import {delRoomApi, getRoomApi} from '@/api/room'
  import AddRoom from './add'
  import EditRoom from './edit'
  import {objectEvaluate} from "@/utils/common";

  export default {
    name: "Room",
    components: {AddRoom, EditRoom},
    data() {
      return {
        formData: [],
        searchSeek: ""
      };
    },
    mounted() {
      this.getRoom();
    },
    methods: {
      edit(obj) {
        let _this = this.$refs.EditRoom;
        objectEvaluate(_this.form, obj);
        _this.form.facility = _this.form.facility.split(',');
        _this.visible = true;
      },
      add() {
        this.$refs.AddRoom.visible = true
      },
      getRoom() {
        let pagination = this.$refs.Pagination;
        let param = {
          pagination: pagination.current - 1,
          size: pagination.size,
          seek: this.searchSeek
        };
        this.$refs.ElementTable.start();
        getRoomApi(param).then(result => {
          this.$refs.ElementTable.stop();
          this.formData = result.data.content;
          pagination.total = result.data.count;
        });
      },
      delRoom(id) {
        delRoomApi({id: id})
          .then(() => {
            this.getRoom();
            this.$refs[id].close();
          })
          .catch(() => {
            this.$refs[id].stop();
          })
      }
    }
  }
</script>
