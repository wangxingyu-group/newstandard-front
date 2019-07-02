<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div>
            <el-form ref="queryForm" :model="listQuery" label-width="100px" size="small">
              <el-row>
                <el-col :span="24">
                  <div>
                    <el-button type="primary" size="small" @click="getList">单个维护</el-button>
                    <el-button type="primary" size="small" @click="getList">批量导入</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-form ref="form" :model="query" label-width="100px" size="small">
      <el-row>
        <el-col :sm="24" :lg="2">
          <el-form-item label="单个维护" label-width="100px" />
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-col :span="24">
        <el-card>
          <el-form ref="form" :model="query" label-width="100px" size="small">
            <el-row>
              <el-col :sm="24" :lg="12">
                <el-form-item label="需要录入的信息" label-width="150px" />
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="24" :lg="8">
                <el-form-item label="工号">
                  <el-input class="filter-item" placeholder="工号" @keyup.enter.native="handleFilter" />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :lg="8">
                <el-form-item label="姓名">
                  <el-input class="filter-item" placeholder="姓名" @keyup.enter.native="handleFilter" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-col :span="24">
      <el-card>
        <el-form ref="form" :model="query" label-width="100px" size="small">
          <el-row>
            <el-col :sm="24" :lg="12">
              <el-form-item label="自动带出的信息" label-width="150px" />
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="24" :lg="8">
              <el-form-item label="管理机构">
                <el-input class="filter-item" placeholder="管理机构" @keyup.enter.native="handleFilter" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :lg="8">
              <el-form-item label="职级">
                <el-input class="filter-item" placeholder="职级" @keyup.enter.native="handleFilter" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :lg="8">
              <el-form-item label="入职日期">
                <el-date-picker class="filter-item" placeholder="入职日期" style="width:100%;min-width:135px" @keyup.enter.native="handleFilter" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="24" :lg="8">
              <el-form-item label="离职日期">
                <el-date-picker class="filter-item" placeholder="离职日期" style="width:100%;min-width:135px" @keyup.enter.native="handleFilter" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :lg="8">
              <el-form-item label="证件类型">
                <el-input class="filter-item" placeholder="证件类型" @keyup.enter.native="handleFilter" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :lg="8">
              <el-form-item label="证件号码">
                <el-input class="filter-item" placeholder="证件号码" @keyup.enter.native="handleFilter" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="24" :lg="8">
              <el-form-item label="性别">
                <el-input class="filter-item" placeholder="性别" @keyup.enter.native="handleFilter" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :lg="8">
              <el-form-item label="出生日期">
                <el-date-picker class="filter-item" placeholder="出生日期" style="width:100%;min-width:135px" @keyup.enter.native="handleFilter" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </el-col>
    <el-col :span="24">
      <el-card>
        <el-form ref="form" :model="query" label-width="100px" size="small">
          <el-row>
            <el-col :sm="24" :lg="8">
              <el-form-item label="需补充或修改的信息" label-width="150px" />
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="24" :lg="8">
              <el-form-item label="入行日期">
                <el-date-picker class="filter-item" placeholder="入行日期" style="width:100%;min-width:135px" @keyup.enter.native="handleFilter" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :lg="8">
              <el-form-item label="从业年资">
                <el-input class="filter-item" placeholder="从业年资" @keyup.enter.native="handleFilter" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :lg="8">
              <el-form-item label="是否同业">
                <el-input class="filter-item" placeholder="是否同业" @keyup.enter.native="handleFilter" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="24" :lg="8">
              <el-form-item label="备注">
                <el-input class="filter-item" placeholder="备注" @keyup.enter.native="handleFilter" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :lg="8">
              <el-form-item label="评聘日期">
                <el-date-picker class="filter-item" placeholder="评聘日期" style="width:100%;min-width:135px" @keyup.enter.native="handleFilter" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :lg="8">
              <el-form-item label="讲师星级">
                <el-input class="filter-item" placeholder="讲师星级" @keyup.enter.native="handleFilter" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="24" :lg="8">
              <el-form-item label="在岗状态">
                <el-input class="filter-item" placeholder="在岗状态" @keyup.enter.native="handleFilter" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :lg="8">
              <el-form-item label="是否金牌讲师">
                <el-input class="filter-item" placeholder="是否金牌讲师" @keyup.enter.native="handleFilter" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :lg="8">
              <el-form-item label="金牌讲师级别">
                <el-input class="filter-item" placeholder="是否金牌讲师" @keyup.enter.native="handleFilter" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="24" :lg="8">
              <el-form-item label="金牌讲师获取年度" label-width="150px">
                <el-input class="filter-item" placeholder="金牌讲师获取年度" @keyup.enter.native="handleFilter" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :lg="8">
              <el-form-item label="擅长课程">
                <textarea class="filter-item" style="width:100%;height:100px;min-width:135px" @keyup.enter.native="handleFilter" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :lg="8">
              <el-form-item label="所获荣誉">
                <textarea class="filter-item" style="width:100%;height:100px;min-width:135px" @keyup.enter.native="handleFilter" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="24" :lg="8">
              <el-form-item label="行业经历">
                <textarea class="filter-item" style="width:100%;height:100px;min-width:135px" @keyup.enter.native="handleFilter" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'TrainPlan',
  data() {
    return {
    }
  }
}
</script>

<style scoped>

</style>
