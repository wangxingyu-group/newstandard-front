<template>
  <div class="app-container">
    <div class="filter-container">
      起始日期<el-date-picker v-model="input2" placeholder="请选择日期" suffix-icon="el-icon-date" />
      截止日期<el-date-picker v-model="input2" placeholder="请选择日期" suffix-icon="el-icon-date" />
      <el-button class="filter-item" type="primary" icon="el-icon-search">
        查询
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">
        重置
      </el-button>
    </div>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-table :key="0" v-loading="" :data="list" height="calc(100vh - 539px)" fit stripe highlight-current-row style="width: 100%;" @sort-change="()=>{}" @selection-change="()=>{}">
        <el-table-column type="selection" width="55" />
        <el-table-column label="来电时间" prop="id" sortable="custom" align="center" width="150">
          <template slot-scope="scope"><span>{{ scope.row.id }}</span></template>
        </el-table-column>
        <el-table-column label="来电地区" align="center" width="100">
          <template slot-scope="scope"><span>{{ scope.row.name }}</span></template>
        </el-table-column>
        <el-table-column label="来电号码" align="center" width="80">
          <template slot-scope="scope"><span>{{ scope.row.gender==='0'?'女':'男' }}</span></template>
        </el-table-column>
        <el-table-column label="人工接通时间" align="center" width="200">
          <template slot-scope="scope"><span>{{ scope.row.idNo }}</span></template>
        </el-table-column>
        <el-table-column label="挂机时间" align="center" width="150">
          <template slot-scope="scope"><span>{{ scope.row.callInNo }}</span></template>
        </el-table-column>
        <el-table-column label="是否接通" align="center" width="200">
          <template slot-scope="scope"><span>{{ scope.row.customerType }}</span></template>
        </el-table-column>
        <el-table-column label="是否评价" align="center" width="200">
          <template slot-scope="scope"><span>{{ scope.row.remark }}</span></template>
        </el-table-column>
        <el-table-column label="评价结果" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope"><span>{{ scope.row.remark1 }}</span></template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'

export default {
  name: 'DashboardAdmin',
  components: {
    RaddarChart,
    PieChart,
    BarChart
  },
  data() {
    return {
      list: []
    }
  }
}
</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }

  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>

