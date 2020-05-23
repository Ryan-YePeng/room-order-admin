<template>
  <el-tabs v-model="activeName" type="border-card" class="appointment-list">
    <el-tab-pane label="待审核" name="first">
      <auditing v-if="activeName === 'first'"/>
    </el-tab-pane>
    <el-tab-pane label="已处理" name="second">
      <audited v-if="activeName === 'second'"/>
    </el-tab-pane>
    <el-tab-pane label="历史记录" name="third">
      <history v-if="activeName === 'third'"/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import auditing from './auditing'
  import audited from './audited'
  import history from './history'

  export default {
    name: "AppointmentList",
    components: {auditing, audited, history},
    data() {
      return {
        activeName: 'first'
      }
    }
  }
</script>

<style lang="scss">
  .appointment-list {
    .el-tabs__content {
      padding: 0;
    }
  }
</style>
