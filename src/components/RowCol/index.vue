<template>
  <el-row :gutter="gutter">
    <el-col :span="spanL">
      <slot name="l"/>
      <slot/>
    </el-col>
    <el-col :span="spanR">
      <slot name="r"/>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "RowCol",
    props: {
      spanL: {
        type: Number,
        default: 12
      },
      spanR: {
        type: Number,
        default: 12
      },
      gutter: {
        type: Number,
        default: 0
      }
    }
  }
</script>
