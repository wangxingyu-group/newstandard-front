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
          <el-form ref="form" :model="form" size="small">
            <el-form-item>
              服务单类型 <el-select style="width:20%;" placeholder="请选择服务单类型">
                <el-option label="1--产品咨询" value="shanghai" />
                <el-option label="2--一般咨询" value="shanghai" />
                <el-option label="3--保全咨询" value="shanghai" />
                <el-option label="4--系统问题" value="shanghai" />
                <el-option label="5--理赔报案" value="shanghai" />
                <el-option label="6--投诉建议" value="shanghai" />
                <el-option label="7--其他" value="shanghai" />
                <el-option label="8--..." value="shanghai" />
              </el-select>
            </el-form-item>
          </el-form>
          <!--      </el-col>
          <el-col>-->
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            查询
          </el-button>
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
            清空
          </el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :key="tableKey" fit stripe highlight-current-row style="width: 100%;" @sort-change="sortChange" @selection-change="selectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column label="来电时间" prop="id" sortable="custom" align="center" width="150">
        <template slot-scope="scope"><span>{{ scope.row.id }}</span></template>
      </el-table-column>
      <el-table-column label="服务单类型" align="center" width="100">
        <template slot-scope="scope"><span>{{ scope.row.name }}</span></template>
      </el-table-column>
      <el-table-column label="字段名称" align="center" width="80">
        <template slot-scope="scope"><span>{{ scope.row.gender==='0'?'女':'男' }}</span></template>
      </el-table-column>
      <el-table-column label="服务单数量" align="center" width="200">
        <template slot-scope="scope"><span>{{ scope.row.idNo }}</span></template>
      </el-table-column>
      <el-table-column label="转办数量" align="center" width="150">
        <template slot-scope="scope"><span>{{ scope.row.callInNo }}</span></template>
      </el-table-column>
      <el-table-column label="转办单退回量" align="center" width="200">
        <template slot-scope="scope"><span>{{ scope.row.callInTime }}</span></template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

</script>

<style scoped>

</style>
