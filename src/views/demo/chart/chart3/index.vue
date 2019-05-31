<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col>
          起始日期 <el-date-picker v-model="input2" placeholder="请选择日期" suffix-icon="el-icon-date" />
          截止日期 <el-date-picker v-model="input2" placeholder="请选择日期" suffix-icon="el-icon-date" />
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
      <el-table-column label="发送日期" prop="id" sortable="custom" align="center" width="150">
        <template slot-scope="scope"><span>{{ scope.row.id }}</span></template>
      </el-table-column>
      <el-table-column label="发送时间" align="center" width="100">
        <template slot-scope="scope"><span>{{ scope.row.name }}</span></template>
      </el-table-column>
      <el-table-column label="成功数量" align="center" width="80">
        <template slot-scope="scope"><span>{{ scope.row.gender==='0'?'女':'男' }}</span></template>
      </el-table-column>
      <el-table-column label="失败数量" align="center" width="200">
        <template slot-scope="scope"><span>{{ scope.row.IDCard }}</span></template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

</script>

<style scoped>

</style>
