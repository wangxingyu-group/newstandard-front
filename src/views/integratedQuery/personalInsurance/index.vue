<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <el-form ref="queryForm" :model="listQuery" label-width="100px" size="small">
              <el-row>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="保单号">
                    <el-input v-model="listQuery.contractNo" placeholder="保单号" class="filter-item" @keyup.enter.native="()=>{}" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="投保单号">
                    <el-input v-model="listQuery.preContractNo" placeholder="投保单号" class="filter-item" @keyup.enter.native="()=>{}" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="身份证号">
                    <el-input v-model="listQuery.idNo" placeholder="身份证号" class="filter-item" @keyup.enter.native="()=>{}" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="fr">
                    <el-button type="primary" size="small" @click="()=>{}">查询</el-button>
                    <el-button type="info" size="small" @click="()=>{}">清空</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <el-table :key="tableKey" v-loading="listLoading" :height="searchRow1" :data="list" fit stripe highlight-current-row @sort-change="()=>{}" @selection-change="()=>{}">
            <el-table-column type="selection" width="55" />
            <el-table-column label="保单号" align="center" width="150">
              <template slot-scope="{row}">
                <span class="link-type" @click="gotoDetails(row)">{{ row.contractNo }}</span>
              </template>
            </el-table-column>
            <el-table-column label="投保人" align="center" width="80">
              <template slot-scope="scope"><span>{{ scope.row.applicant }}</span></template>
            </el-table-column>
            <el-table-column label="投保人身份证号" align="center" width="180">
              <template slot-scope="scope"><span>{{ scope.row.idNo }}</span></template>
            </el-table-column>
            <el-table-column label="客户号" align="center" width="80">
              <template slot-scope="scope"><span>{{ scope.row.customerNo }}</span></template>
            </el-table-column>
            <el-table-column label="被保人姓名" align="center" width="80">
              <template slot-scope="scope"><span>{{ scope.row.insured }}</span></template>
            </el-table-column>
            <el-table-column label="代理机构" align="center" width="100">
              <template slot-scope="scope"><span>{{ scope.row.agent }}</span></template>
            </el-table-column>
            <el-table-column label="生效日期" align="center" width="150">
              <template slot-scope="scope"><span>{{ scope.row.effectiveDate }}</span></template>
            </el-table-column>
            <el-table-column label="基本保险金额" align="center" width="150">
              <template slot-scope="scope"><span>{{ scope.row.amount }}</span></template>
            </el-table-column>
            <el-table-column label="保费金额" align="center" width="150">
              <template slot-scope="scope"><span>{{ scope.row.premium }}</span></template>
            </el-table-column>
            <el-table-column label="险种名称" align="center" width="100">
              <template slot-scope="scope"><span>{{ scope.row.risk }}</span></template>
            </el-table-column>
            <el-table-column label="募集计划名称" align="center" width="120">
              <template slot-scope="scope"><span>{{ scope.row.plan }}</span></template>
            </el-table-column>
            <el-table-column label="保单状态" align="center" width="150">
              <template slot-scope="scope"><span>{{ scope.row.status }}</span></template>
            </el-table-column>
            <el-table-column label="操作" align="center" fixed="right" width="100">
              <template slot-scope="{row}">
                <el-button type="primary" size="mini " @click="confirmCustomer(row)"确认</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchList } from '@/api/integratedQuery/personalInsurance'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapState } from 'vuex'
export default {
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: null,
      selectionList: null,
      total: 0,
      listLoading: true,
      listQuery: {
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
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        // 模拟延迟
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      })
    },
    confirmCustomer(row) {
      this.$store.commit('commonData/SET_CURRENT_CUSTOMER', row)
      this.$notify({
        title: row.name,
        message: '确认客户成功',
        type: 'success',
        duration: 2000
      })
    },
    gotoDetails(row) {
      this.$router.push({ name: 'personalInsurance/details', params: { contractNo: row.contractNo }})
    }
  }
}
</script>
