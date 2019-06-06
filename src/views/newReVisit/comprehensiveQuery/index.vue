<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <el-form ref="queryForm" :model="listQuery" label-width="100px" size="small">
              <el-row>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="投保单号">
                    <el-input v-model="listQuery.appno" placeholder="投保单号" class="filter-item" @keyup.enter.native="handleFilter" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="保单号">
                    <el-input v-model="listQuery.policyno" placeholder="保单号" class="filter-item" @keyup.enter.native="handleFilter" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="信函状态">
                    <el-select v-model="listQuery.emailStatue">
                      <el-option v-for="(item, index) in emailStatues" :key="index" :label="item" :value="item" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="6" :lg="8">
                  <el-form-item label="录入起始时间">
                    <el-col :span="10">
                      <el-date-picker v-model="listQuery.from" type="date" style="width:100%;min-width:200px" placeholder="" />
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="截止为">
                    <el-col :span="12">
                      <el-date-picker v-model="listQuery.to" type="date" style="width:100%;min-width:200px" placeholder="" />
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="归属机构">
                    <el-select v-model="listQuery.agent">
                      <el-option v-for="(item, index) in agents" :key="index" :label="item" :value="item" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="回访方式">
                    <el-select v-model="listQuery.reVisitType">
                      <el-option v-for="(item, index) in reVisitTypes" :key="index" :label="item" :value="item" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8" style="align:right" class="fr">
                  <div class="fr">
                    <el-button type="primary" size="small" @click="handleFilter">查询</el-button>
                    <el-button type="info" size="small" @click="reset">重置</el-button>
                    <el-button type="primary" size="small" @click="handleBatchSubmit">生成报表</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <el-table :key="tableKey" v-loading="listLoading" :height="searchRow1" style="min-height: 300px;" :data="list" fit stripe highlight-current-row @selection-change="selectionChange">
            <el-table-column type="selection" min-width="55" />
            <el-table-column label="保单号" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.contno }}</span></template>
            </el-table-column>
            <el-table-column label="回访方式" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.calltype }}</span></template>
            </el-table-column>
            <el-table-column label="签单日期" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.signdate }}</span></template>
            </el-table-column>
            <el-table-column label="客户签收日期" align="agentcode" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.customgetpoldate }}</span></template>
            </el-table-column>
            <el-table-column label="回单日期" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.getpoldate }}</span></template>
            </el-table-column>
            <el-table-column label="代理人姓名" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.agentname }}</span></template>
            </el-table-column>
            <el-table-column label="投保人姓名" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.appntname }}</span></template>
            </el-table-column>
            <el-table-column label="投保人性别" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.appntsex }}</span></template>
            </el-table-column>
            <el-table-column label="移动电话" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.mobile }}</span></template>
            </el-table-column>
            <el-table-column label="险种列表" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.riskname }}</span></template>
            </el-table-column>
            <el-table-column label="代理机构" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.agentcomname }}</span></template>
            </el-table-column>
            <el-table-column label="归属机构" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.managecomname }}</span></template>
            </el-table-column>
            <el-table-column label="回访次数" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.fbcount }}</span></template>
            </el-table-column>
            <el-table-column label="回访结果" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.fbresult }}</span></template>
            </el-table-column>
            <el-table-column label="描述" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.wttype }}</span></template>
            </el-table-column>
            <el-table-column label="销售渠道" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.salechnl }}</span></template>
            </el-table-column>
            <el-table-column label="销售方式" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.selltype }}</span></template>
            </el-table-column>
            <el-table-column label="保单状态" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.appflag }}</span></template>
            </el-table-column>
            <el-table-column label="是否犹豫期内回访成功" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.yydata }}</span></template>
            </el-table-column>
            <el-table-column label="备注" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.examnote }}</span></template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchList } from '@/api/newReVisit/comprehensiveQuery/comprehensiveQuery'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapState } from 'vuex'

export default {
  name: 'ComprehensiveQuery',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      selectionList: null,
      agents: ['综合电商部', '江苏分公司', '北京分公司', '上海分公司'],
      emailStatues: ['需发信函', '已发信函', '已收信函', '邮寄信函', '上门信函', '信函件返回'],
      reVisitTypes: ['在线回访', '电话回访', '邮件回访'],
      listQuery: {
        appno: '', // 投保单号
        emailStatue: '', // 信函件状态
        agent: '', // 归属机构
        from: '', // 起始时间
        to: '', // 结束时间
        policyno: '', // 保单号
        reVisitType: '', // 回访方式
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
      this.$confirm('确认选中的记录生成报表?', '提示', {
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
        appno: '', // 投保单号
        emailStatue: '', // 信函件状态
        agent: '', // 归属机构
        from: '', // 起始时间
        to: '', // 结束时间
        policyno: '', // 保单号
        reVisitType: '',
        page: 1,
        limit: 10
      }
    }
  }
}
</script>

<style>
</style>
