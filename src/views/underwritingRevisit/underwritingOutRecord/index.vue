<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <el-form ref="queryForm" :model="listQuery" label-width="100px" size="small">
              <el-row>
                <el-col :sm="12" :lg="7">
                  <el-form-item label="呼出电话号码" label-width="140px">
                    <el-input v-model="listQuery.mobile" placeholder="呼出电话号码" class="filter-item" @keyup.enter.native="handleFilter" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="7">
                  <el-form-item label="保单号">
                    <el-input v-model="listQuery.policyNo" placeholder="保单号" class="filter-item" @keyup.enter.native="handleFilter" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="7">
                  <el-form-item label="身份证号码" label-width="140px">
                    <el-input v-model="listQuery.idcard" placeholder="身份证号码" class="filter-item" @keyup.enter.native="handleFilter" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="受理日期" label-width="140px">
                    <el-col :span="11">
                      <el-date-picker v-model="listQuery.from" type="date" style="width:100%;min-width:135px" placeholder="起始时间" />
                    </el-col>
                    <el-col :span="11">
                      <el-date-picker v-model="listQuery.to" type="date" style="width:100%;min-width:135px" placeholder="截止时间" />
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8" style="align:right" class="fr">
                  <div class="fr">
                    <el-button type="primary" size="small" @click="handleFilter">查询</el-button>
                    <el-button type="info" size="small">清空</el-button>
                    <el-button type="primary" size="small" @click="handleBatchSubmit">提交</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <el-table :key="tableKey" v-loading="listLoading" :height="searchRow1" style="min-height: 300px;" :data="list" fit stripe highlight-current-row>
            <el-table-column type="selection" min-width="55" />
            <el-table-column label="工作流水号" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.serial }}</span></template>
            </el-table-column>
            <el-table-column label="客户姓名" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.name }}</span></template>
            </el-table-column>
            <el-table-column label="外呼内容" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.content }}</span></template>
            </el-table-column>
            <el-table-column label="险种名称" align="center" min-width="250">
              <template slot-scope="scope"><span>{{ scope.row.riskName }}</span></template>
            </el-table-column>
            <el-table-column label="外呼结果" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.result }}</span></template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchList } from '@/api/underwritingRevisit/underwritingOutRecord/underwritingOutRecord'
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
