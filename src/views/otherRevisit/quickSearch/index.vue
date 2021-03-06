<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <el-form ref="queryForm" :model="listQuery" label-width="100px" size="small">
              <el-row>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="搜索条件">
                    <el-input v-model="listQuery.policyNo" class="filter-item" @keyup.enter.native="handleFilter" placeholder="搜索条件" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="fr">
                    <el-button type="info" size="small" @click="clearList">清空</el-button>
                    <el-button type="primary" size="small" @click="handleFilter">查询</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <el-table :key="tableKey" v-loading="listLoading" :height="searchRow1" style="min-height: 300px;" :data="list" fit stripe highlight-current-row @selection-change="selectionChange">
            <el-table-column type="selection" min-width="55" />
            <el-table-column label="保单号" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.policyNo }}</span></template>
            </el-table-column>
            <el-table-column label="投保人姓名" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.name }}</span></template>
            </el-table-column>
            <el-table-column label="投保人身份证号" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.idCard }}</span></template>
            </el-table-column>
            <el-table-column label="保全受理号" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.dealNum }}</span></template>
            </el-table-column>
            <el-table-column label="外呼次数" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.number }}</span></template>
            </el-table-column>
            <el-table-column label="外呼结果" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.result }}</span></template>
            </el-table-column>
            <el-table-column label="是否为多保单" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.isMore }}</span></template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchList } from '@/api/otherRevisit/quickSearch/quickSearch'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapState } from 'vuex'

export default {
  name: 'Dictionary',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      selectionList: null,
      listQuery: {
        policyNo: '',
        idcard: '',
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
    clearList() {
      this.list = []
    }
  }
}
</script>

<style>
</style>
