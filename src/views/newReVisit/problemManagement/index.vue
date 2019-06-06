<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <el-form ref="queryForm" :model="listQuery" label-width="100px" size="small">
              <el-row>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="归属机构">
                    <el-select v-model="listQuery.agent">
                      <el-option v-for="(item, index) in agents" :key="index" :label="item" :value="item" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="工单状态">
                    <el-select v-model="listQuery.statue">
                      <el-option v-for="(item, index) in statues" :key="index" :label="item" :value="item" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="回访人工号">
                    <el-input v-model="listQuery.policyNo" placeholder="回访人工号" class="filter-item" @keyup.enter.native="handleFilter" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="签单起始为">
                    <el-col :span="12">
                      <el-date-picker v-model="listQuery.from" type="date" style="width:100%;min-width:135px" placeholder="" />
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="截止为">
                    <el-col :span="12">
                      <el-date-picker v-model="listQuery.from" type="date" style="width:100%;min-width:135px" placeholder="" />
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="保单号">
                    <el-input v-model="listQuery.policyNo" placeholder="保单号" class="filter-item" @keyup.enter.native="handleFilter" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="销售渠道">
                    <el-select v-model="listQuery.channel">
                      <el-option v-for="(item, index) in channels" :key="index" :label="item" :value="item" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8" style="align:right" class="fr">
                  <div class="fr">
                    <el-button type="primary" size="small" @click="handleFilter">查询</el-button>
                    <el-button type="info" size="small" @click="clearList">清空</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <el-table :key="tableKey" v-loading="listLoading" :height="searchRow1" style="min-height: 300px;" :data="list" fit stripe highlight-current-row @selection-change="selectionChange">
            <el-table-column type="selection" min-width="55" />
            <el-table-column label="工单号" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.contNo }}</span></template>
            </el-table-column>
            <el-table-column label="签单日期" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.signDate }}</span></template>
            </el-table-column>
            <el-table-column label="客户签收日期" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.customSignDate }}</span></template>
            </el-table-column>
            <el-table-column label="回单日期" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.contractedDate }}</span></template>
            </el-table-column>
            <el-table-column label="保单号" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.policyNo }}</span></template>
            </el-table-column>
            <el-table-column label="归属机构" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.companyName }}</span></template>
            </el-table-column>
            <el-table-column label="代理人姓名" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.agentName }}</span></template>
            </el-table-column>
            <el-table-column label="代理机构" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.agent }}</span></template>
            </el-table-column>
            <el-table-column label="投保人姓名" align="center" min-width="130">
              <template slot-scope="scope"><span>{{ scope.row.appName }}</span></template>
            </el-table-column>
            <el-table-column label="被保险人姓名" align="center" min-width="130">
              <template slot-scope="scope"><span>{{ scope.row.insuredname }}</span></template>
            </el-table-column>
            <el-table-column label="投保人年龄" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.appntappage }}</span></template>
            </el-table-column>
            <el-table-column label="性别" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.appntsex }}</span></template>
            </el-table-column>
            <el-table-column label="出生日期" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.appntbirthday }}</span></template>
            </el-table-column>
            <el-table-column label="投保人证件号码" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.idno }}</span></template>
            </el-table-column>
            <el-table-column label="移动电话" align="center" min-width="130">
              <template slot-scope="scope"><span>{{ scope.row.mobile }}</span></template>
            </el-table-column>
            <el-table-column label="通讯地址" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.homeaddress }}</span></template>
            </el-table-column>
            <el-table-column label="邮箱" align="center" min-width="130">
              <template slot-scope="scope"><span>{{ scope.row.email }}</span></template>
            </el-table-column>
            <el-table-column label="产品名称" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.product }}</span></template>
            </el-table-column>
            <el-table-column label="合同保险金额" align="center" min-width="130">
              <template slot-scope="scope"><span>{{ scope.row.amnt }}</span></template>
            </el-table-column>
            <el-table-column label="合同基本保费" align="center" min-width="130">
              <template slot-scope="scope"><span>{{ scope.row.prem }}</span></template>
            </el-table-column>
            <el-table-column label="交费期间" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.payendyear }}</span></template>
            </el-table-column>
            <el-table-column label="保险期间" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.insuyear }}</span></template>
            </el-table-column>
            <el-table-column label="销售方式" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.selltype }}</span></template>
            </el-table-column>
            <el-table-column label="最后一次回访时间" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.lastcalldate }}</span></template>
            </el-table-column>
            <el-table-column label="最后一次回访电话" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.lastcallphone }}</span></template>
            </el-table-column>
            <el-table-column label="回访次数" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.num }}</span></template>
            </el-table-column>
            <el-table-column label="剩余犹豫期天数" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.yyday }}</span></template>
            </el-table-column>
            <el-table-column label="回访结果" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.result }}</span></template>
            </el-table-column>
            <el-table-column label="描述" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.questiontype }}</span></template>
            </el-table-column>
            <el-table-column label="工单状态" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.mettertype }}</span></template>
            </el-table-column>
            <el-table-column label="保单状态" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.appflag }}</span></template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchList } from '@/api/newReVisit/problemManagement/problemManagement'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapState } from 'vuex'

export default {
  name: 'ProblemManagement',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      selectionList: null,
      appoints: [{ id: 1, name: '是' }, { id: 2, name: '否' }],
      reVisits: [{ id: 1, name: '1-暂存' }, { id: 10, name: '10-已分配' }, { id: 2, name: '2-问题件' }, { id: 2, name: '3-信函件' }],
      numbers: [1, 2, 3, 4, 5],
      agents: ['综合电商部', '江苏分公司', '北京分公司', '上海分公司'],
      statues: ['需发', '已发', '需再访'],
      channels: ['网销', '直销', '经代'],
      listQuery: {
        channel: '',
        statue: '',
        agent: '',
        number: '',
        reVisit: '',
        appoint: '',
        mobile: '',
        idcard: '',
        from: '',
        to: '',
        result: '',
        policyNo: '',
        type: '',
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
    }
  }
}
</script>

<style>
</style>
