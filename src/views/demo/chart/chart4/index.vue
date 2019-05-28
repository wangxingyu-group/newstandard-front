<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col>
          <el-date-picker placeholder="起始日期" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
          <el-date-picker placeholder="截止日期" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-input placeholder="质检人员" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
          <el-input placeholder="来电号码" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-input placeholder="坐席姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            查询
          </el-button>
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
            清空
          </el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :key="tableKey" style="width: 100%;" @sort-change="sortChange" @selection-change="selectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column label="质检时间" prop="id" sortable="custom" align="center" width="150">
        <template slot-scope="scope"><span>{{ scope.row.id }}</span></template>
      </el-table-column>
      <el-table-column label="质检人员" align="center" width="100">
        <template slot-scope="scope"><span>{{ scope.row.name }}</span></template>
      </el-table-column>
      <el-table-column label="服务单号" align="center" width="80">
        <template slot-scope="scope"><span>{{ scope.row.gender==='0'?'女':'男' }}</span></template>
      </el-table-column>
      <el-table-column label="来电号码" align="center" width="200">
        <template slot-scope="scope"><span>{{ scope.row.IDCard }}</span></template>
      </el-table-column>
      <el-table-column label="坐席号码" align="center" width="200">
        <template slot-scope="scope"><span>{{ scope.row.seatNumber }}</span></template>
      </el-table-column>
      <el-table-column label="坐席姓名" align="center" width="200">
        <template slot-scope="scope"><span>{{ scope.row.seatName }}</span></template>
      </el-table-column>
      <el-table-column label="质检分数" align="center" width="200">
        <template slot-scope="scope"><span>{{ scope.row.qualityScore }}</span></template>
      </el-table-column>
      <el-table-column label="是否复核" align="center" width="200">
        <template slot-scope="scope"><span>{{ scope.row.check }}</span></template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>

</script>

<style scoped>

</style>
