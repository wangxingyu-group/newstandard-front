<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <el-form ref="queryForm" :model="listQuery" label-width="100px" size="small">
              <el-row>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="通话时间">
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
                  <el-form-item label="保单号">
                    <el-input v-model="listQuery.policyNo" placeholder="保单号" class="filter-item" @keyup.enter.native="handleFilter" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="联系号码">
                    <el-input v-model="listQuery.mobile" placeholder="联系号码" class="filter-item" @keyup.enter.native="handleFilter" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="客户姓名">
                    <el-input v-model="listQuery.name" placeholder="客户姓名" class="filter-item" @keyup.enter.native="handleFilter" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="客户类别">
                    <el-select v-model="listQuery.type" placeholder="客户类别" style="width: 100%;">
                      <el-option v-for="(item, index) in types" :key="index" :label="item" :value="item" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="呼叫方式">
                    <el-select v-model="listQuery.way" placeholder="呼叫方式" style="width: 100%;">
                      <el-option v-for="(item, index) in ways" :key="index" :label="item" :value="item" />
                    </el-select>
                  </el-form-item>
                </el-col>

              </el-row>
              <el-row>
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
            <el-table-column label="联系号码" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.mobile }}</span></template>
            </el-table-column>
            <el-table-column label="客户类别" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.type }}</span></template>
            </el-table-column>
            <el-table-column label="客户姓名" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.name }}</span></template>
            </el-table-column>
            <el-table-column label="保单号" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.policyNo }}</span></template>
            </el-table-column>
            <el-table-column label="来电时间" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.comingDate }}</span></template>
            </el-table-column>
            <el-table-column label="录音流水号" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.serial }}</span></template>
            </el-table-column>
            <el-table-column label="呼叫方式" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.way }}</span></template>
            </el-table-column>
            <el-table-column label="绑定工单" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.bind }}</span></template>
            </el-table-column>
            <el-table-column label="工单类别" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.flag }}</span></template>
            </el-table-column>
            <el-table-column label="操作" align="center" fixed="right" width="200">
              <template slot-scope="{row}">
                <el-button type="primary" size="mini " @click="confirmCustomer(row)">
                  详情
                </el-button>
                <el-button type="primary" size="mini" @click="handleUpdate(row)">
                  调听
                </el-button>
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
import { fetchList } from '@/api/integratedQuery/callStreaming'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapState } from 'vuex'

export default {
  name: 'CallStreaming',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      selectionList: null,
      ways: ['呼入', '外呼'],
      types: ['准客户', '客户', '代理人'],
      listQuery: {
        way: '',
        mobile: '',
        name: '',
        from: '',
        to: '',
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
  .customWidth{
    width: 1000px;
    height: 580px;
    top: -50px;
  }
</style>
