<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />
    <div class="filter-container">
      <el-date-picker placeholder="起始日期" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-date-picker placeholder="截止日期" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
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

    <el-row :gutter="8">
      <el-table :key="tableKey" v-loading="listLoading" :data="list" fit stripe highlight-current-row style="width: 100%;" @sort-change="sortChange" @selection-change="selectionChange">
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
          <template slot-scope="scope"><span>{{ scope.row.IDCard }}</span></template>
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
import GithubCorner from '@/components/GithubCorner'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,

    RaddarChart,
    PieChart,
    BarChart
  }
}
</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .github-corner {
      position: absolute;
      top: 0px;
      border: 0;
      right: 0;
    }

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

