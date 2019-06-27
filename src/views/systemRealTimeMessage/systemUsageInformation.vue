<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-col :span="6">
          <div style="text-align: center"><img src="./111.png" style="text-align: center"></div>
          <div style="text-align: center">团队名称：测试</div>
        </el-col>
        <el-col :span="8">
          <h3> 已用/最大坐席数 :	10 / 20 </h3>
          <h3> 已用/最大分机数 :	10 / 20 </h3>
          <h3> 已用/最大队列数 :	2 / 5 </h3>
          <h3> 已用/最大账户数量 :	11 / 25 </h3>
          <h3> 已用/最大会议室数量 :	0 / 5 </h3>
          <h3> 公司地址 :</h3>
          <h3> 管理员电话 :</h3>
          <h3>  管理员邮箱 :</h3>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'CallMonitoring'
}
</script>

<style scoped>

</style>
