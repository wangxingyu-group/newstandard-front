<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            单证下载
          </div>
          <el-form ref="form" :model="query" label-width="100px" size="small">
            <el-row>
              <el-col :sm="24" :lg="8">
                <el-form-item label="单证类型">
                  <el-radio-group v-model="query.type">
                    <el-radio :label="1">保单</el-radio>
                    <el-radio :label="2">批单</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :sm="24" :lg="8">
                <el-form-item label="保单号/批单号">
                  <el-input v-model="query.queryNo" :disabled="false" />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :lg="8">
                <div class="fr">
                  <el-button type="primary" size="small">下载</el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: {
        type: 1,
        queryNo: null
      }
    }
  }
}
</script>

