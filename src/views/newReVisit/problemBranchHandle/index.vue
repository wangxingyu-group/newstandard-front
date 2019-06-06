<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <el-form ref="queryForm" :model="listQuery" label-width="100px" size="small">
              <el-row>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="问题件生成时间" label-width="150px">
                    <el-col :span="12">
                      <el-date-picker v-model="listQuery.from" type="date" style="width:100%;min-width:135px" placeholder="" />
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="截止为">
                    <el-col :span="12">
                      <el-date-picker v-model="listQuery.to" type="date" style="width:100%;min-width:135px" placeholder="" />
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="保单号">
                    <el-input v-model="listQuery.policyNo" placeholder="保单号" class="filter-item" @keyup.enter.native="handleFilter" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="签单日期起始为" label-width="150px">
                    <el-col :span="12">
                      <el-date-picker v-model="listQuery.from1" type="date" style="width:100%;min-width:135px" placeholder="" />
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="截止为">
                    <el-col :span="12">
                      <el-date-picker v-model="listQuery.to1" type="date" style="width:100%;min-width:135px" placeholder="" />
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="销售渠道">
                    <el-select v-model="listQuery.channel">
                      <el-option v-for="(item, index) in channels" :key="index" :label="item" :value="item" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="回访结果">
                    <el-select v-model="listQuery.statue">
                      <el-option v-for="(item, index) in statues" :key="index" :label="item" :value="item" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="16" :lg="16" style="align:right" class="fr">
                  <div class="fr">
                    <el-button type="primary" size="small" @click="handleFilter">查询</el-button>
                    <el-button type="info" size="small" @click="clearList">清空</el-button>
                    <el-button type="primary" size="small" @click="handleBatchSubmit">生成报表</el-button>
                    <el-button type="primary" size="small" @click="handleBatchSubmit">问题件返回</el-button>
                    <el-button type="primary" size="small" @click="handleBatchSubmit">下载模板</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <el-table :key="tableKey" v-loading="listLoading" :height="searchRow1" style="min-height: 300px;" :data="list" fit stripe highlight-current-row @selection-change="selectionChange">
            <el-table-column type="selection" min-width="55" />
            <el-table-column label="工单号" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.fbserviceno }}</span></template>
            </el-table-column>
            <el-table-column label="保单号" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.policyno }}</span></template>
            </el-table-column>
            <el-table-column label="签单日期" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.signdate }}</span></template>
            </el-table-column>
            <el-table-column label="险种列表" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.riskname }}</span></template>
            </el-table-column>
            <el-table-column label="投保人姓名" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.appntname }}</span></template>
            </el-table-column>
            <el-table-column label="性别" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.appntsex }}</span></template>
            </el-table-column>
            <el-table-column label="移动电话" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.mobile }}</span></template>
            </el-table-column>
            <el-table-column label="回访结果" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.fbresult }}</span></template>
            </el-table-column>
            <el-table-column label="描述" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.quescontent }}</span></template>
            </el-table-column>
            <el-table-column label="保单状态" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.appflag }}</span></template>
            </el-table-column>
            <el-table-column label="代理机构" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.agentcomname }}</span></template>
            </el-table-column>
            <el-table-column label="销售渠道" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.salechnl }}</span></template>
            </el-table-column>
            <el-table-column label="销售方式" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.selltype }}</span></template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchList } from '@/api/newReVisit/problemBranchHandle/problemBranchHandle'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapState } from 'vuex'

export default {
  name: 'ProblemBranchHandle',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      selectionList: null,
      statues: ['需发', '已发', '需再访'],
      channels: ['网销', '直销', '经代'],
      listQuery: {
        channel: '',
        statue: '',
        from: '',
        to: '',
        from1: '',
        to1: '',
        policyNo: '',
        page: 1,
        limit: 10
      }
    }
  },
  computed: {
    ...mapState({
      searchRow1: state => state.commonData.searchRow1,
      searchRow2: state => state.commonData.searchRow2,
      searchRow3: state => state.commonData.searchRow3,
      searchRow4: state => state.commonData.searchRow4
    })
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        // 模拟延迟
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    selectionChange(val) {
      this.selectionList = val
    },
    handleBatchSubmit() {
      this.$confirm('确认提交选中的记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.selectionList.forEach((r) => this.list.splice(this.list.indexOf(r), 1))
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
    },
    clearList() {
      this.list = []
    },
    reset() {
      this.listQuery = {
        channel: '',
        statue: '',
        from: '',
        to: '',
        from1: '',
        to1: '',
        policyNo: '',
        page: 1,
        limit: 10
      }
    }
  }
}
</script>

<style>
</style>
