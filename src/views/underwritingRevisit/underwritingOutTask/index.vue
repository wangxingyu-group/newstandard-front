<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <el-form ref="queryForm" :model="listQuery" label-width="100px" size="small">
              <el-row>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="受理起止日期">
                    <el-col :span="11">
                      <el-date-picker v-model="listQuery.from" type="date" style="width:100%;min-width:135px" placeholder="" />
                    </el-col>
                    <el-col :span="11">
                      <el-date-picker v-model="listQuery.to" type="date" style="width:100%;min-width:135px" placeholder="" />
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="转办状态">
                    <el-drag-select v-model="optiosValue" style="width:100%;" multiple placeholder="请选择">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-drag-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="投保单号">
                    <el-input v-model="listQuery.name" placeholder="投保单号" class="filter-item" @keyup.enter.native="handleFilter" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="fr">
                    <el-button type="primary" size="small" @click="handleFilter">查询</el-button>
                    <el-button type="primary" size="small" @click="handleBatchSubmit">提交</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <el-table :key="tableKey" v-loading="listLoading" :height="searchRow1" style="min-height: 300px;" :data="list" fit stripe highlight-current-row>
            <el-table-column label="外呼时间" align="center" width="150">
              <template slot-scope="scope"><span>{{ scope.row.dateTime }}</span></template>
            </el-table-column>
            <el-table-column label="外呼结果" align="center" width="100">
              <template slot-scope="scope"><span>{{ scope.row.result }}</span></template>
            </el-table-column>
            <el-table-column label="被保人姓名" align="center" width="150">
              <template slot-scope="scope"><span>{{ scope.row.insuredName }}</span></template>
            </el-table-column>
            <el-table-column label="被保人身份证号" align="center" width="200">
              <template slot-scope="scope"><span>{{ scope.row.insuredIdCard }}</span></template>
            </el-table-column>
            <el-table-column label="投保单号" align="center" width="200">
              <template slot-scope="scope"><span>{{ scope.row.proposalNo }}</span></template>
            </el-table-column>
            <el-table-column label="投保人姓名" align="center" width="150">
              <template slot-scope="scope"><span>{{ scope.row.appName }}</span></template>
            </el-table-column>
            <el-table-column label="受理人员姓名" align="center" width="150">
              <template slot-scope="scope"><span>{{ scope.row.client }}</span></template>
            </el-table-column>
            <el-table-column label="代理机构" align="center" width="150">
              <template slot-scope="scope"><span>{{ scope.row.agentName }}</span></template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ElDragSelect from '@/components/DragSelect' // base on element-ui
import { fetchList } from '@/api/underwritingRevisit/underwritingOutTask/underwritingOutTask'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapState } from 'vuex'

export default {
  name: 'Dictionary',
  components: { Pagination, ElDragSelect },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      selectionList: null,
      listQuery: {
        from: '',
        to: '',
        result: '',
        name: '',
        type: '',
        page: 1,
        limit: 10
      },
      optiosValue: ['1', '2'],
      options: [{
        value: '1',
        label: '未转办'
      }, {
        value: '2',
        label: '未退回'
      }, {
        value: '3',
        label: '被退回'
      }]
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
