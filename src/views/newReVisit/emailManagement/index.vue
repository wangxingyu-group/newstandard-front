<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <el-form ref="queryForm" :model="listQuery" label-width="100px" size="small">
              <el-row>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="信函状态">
                    <el-select v-model="listQuery.emailStatue" placeholder="信函状态" style="width: 100%;">
                      <el-option v-for="(item, index) in emailStatues" :key="index" :label="item" :value="item" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="归属机构">
                    <el-select v-model="listQuery.agent" placeholder="归属机构" style="width: 100%;">
                      <el-option v-for="(item, index) in agents" :key="index" :label="item" :value="item" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="保单号">
                    <el-input v-model="listQuery.policyno" placeholder="保单号" class="filter-item" @keyup.enter.native="handleFilter" />
                  </el-form-item>
                </el-col>
                <el-col :sm="6" :lg="8">
                  <el-form-item label="录入时间">
                    <el-col :span="11">
                      <el-date-picker v-model="listQuery.from" type="date" style="width:100%;min-width:135px" placeholder="起始时间" />
                    </el-col>
                    <el-col style="text-align: center" :span="2">-</el-col>
                    <el-col :span="11">
                      <el-date-picker v-model="listQuery.to" type="date" style="width:100%;min-width:135px" placeholder="截止时间" />
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="投保单号">
                    <el-input v-model="listQuery.appno" placeholder="投保单号" class="filter-item" @keyup.enter.native="handleFilter" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
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
            <el-table-column label="工单号" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.fbserviceno }}</span></template>
            </el-table-column>
            <el-table-column label="投保单号" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.appno }}</span></template>
            </el-table-column>
            <el-table-column label="保单号" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.policyno }}</span></template>
            </el-table-column>
            <el-table-column label="信函件状态" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.mailstatus }}</span></template>
            </el-table-column>
            <el-table-column label="转办部门" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.enddepartment }}</span></template>
            </el-table-column>
            <el-table-column label="回访当前状态" align="center" min-width="130">
              <template slot-scope="scope"><span>{{ scope.row.fbnowstatus }}</span></template>
            </el-table-column>
            <el-table-column label="回访方式" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.calltype }}</span></template>
            </el-table-column>
            <el-table-column label="代理人姓名" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.agentname }}</span></template>
            </el-table-column>
            <el-table-column label="代理人代码" align="agentcode" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.agentcode }}</span></template>
            </el-table-column>
            <el-table-column label="销售机构" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.salesorg }}</span></template>
            </el-table-column>
            <el-table-column label="险种" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.riskname }}</span></template>
            </el-table-column>
            <el-table-column label="上次呼叫结果" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.lastcallres }}</span></template>
            </el-table-column>
            <el-table-column label="操作次数" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.count }}</span></template>
            </el-table-column>
            <el-table-column label="回访人工号" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.userno }}</span></template>
            </el-table-column>
            <el-table-column label="录入时间" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.mailsenddate }}</span></template>
            </el-table-column>
            <el-table-column label="最后一次回函时间" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.lastprobtime }}</span></template>
            </el-table-column>
            <el-table-column label="最后一次回函内容" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.lastprobreply }}</span></template>
            </el-table-column>
            <el-table-column label="所属机构 " align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.corpcode }}</span></template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchList } from '@/api/newReVisit/emailManagement/emailManagement'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapState } from 'vuex'

export default {
  name: 'EmailManagement',
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
      listQuery: {
        appno: '', // 投保单号
        emailStatue: '', // 信函件状态
        agent: '', // 归属机构
        from: '', // 起始时间
        to: '', // 结束时间
        policyno: '', // 保单号
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
        page: 1,
        limit: 10
      }
    }
  }
}
</script>

<style>
</style>
