<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            通话监控
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-form ref="form" :model="query" label-width="100px" size="small">
      <el-row>
        <el-col :sm="24" :lg="4">
          <el-form-item label="测试" label-width="100px" />
        </el-col>
        <el-col :sm="24" :lg="4">
          <el-form-item label="话务总数：0" label-width="100px" />
        </el-col>
        <el-col :sm="24" :lg="4">
          <el-form-item label="呼出总数：0" label-width="100px" />
        </el-col>
        <el-col :sm="24" :lg="4">
          <el-form-item label="呼入总数：0" label-width="100px" />
        </el-col>
      </el-row>
    </el-form>

    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            呼出详细
          </div>
          <el-table
            :key="tableKey"
            v-loading="listLoading"
            :header-cell-style="{background:'#9BCD9B',color:'#606266'}"
            border
            :height="searchRow2"
            :data="list"
            fit
            stripe
            highlight-current-row
style="width: 100%;"
            @sort-change="sortChange"
            @selection-change="selectionChange"
          >
            <el-table-column label="主叫分机" prop="id" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.prov }}</span></template>
            </el-table-column>
            <el-table-column label="主叫号码" prop="id" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.city }}</span></template>
            </el-table-column>
            <el-table-column label="被叫号码" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.num }}</span></template>
            </el-table-column>
            <el-table-column label="当前状态" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.num }}</span></template>
            </el-table-column>
            <el-table-column label="呼出时间" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.rate }}</span></template>
            </el-table-column>
            <el-table-column label="总时长" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.rate }}</span></template>
            </el-table-column>
            <el-table-column label="通话时长" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.rate }}</span></template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            呼入详细
          </div>
          <el-table
            :key="tableKey"
            v-loading="listLoading"
            :header-cell-style="{background:'#EEE685',color:'#606266'}"
            border
            :height="searchRow2"
            :data="list"
            fit
            stripe
            highlight-current-row
style="width: 100%;"
            @sort-change="sortChange"
            @selection-change="selectionChange"
          >
            <el-table-column label="主叫号码" prop="id" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.prov }}</span></template>
            </el-table-column>
            <el-table-column label="被叫号码" prop="id" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.city }}</span></template>
            </el-table-column>
            <el-table-column label="当前状态" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.num }}</span></template>
            </el-table-column>
            <el-table-column label="呼入时间" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.num }}</span></template>
            </el-table-column>
            <el-table-column label="总时长" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.rate }}</span></template>
            </el-table-column>
            <el-table-column label="通话时长" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.rate }}</span></template>
            </el-table-column>
          </el-table>
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

