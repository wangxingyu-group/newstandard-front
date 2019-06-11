<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <el-form ref="queryForm" :model="listQuery" label-width="100px" size="small">
              <el-row>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="起始日期">
                    <el-date-picker v-model="listQuery.sendDate" placeholder="请选择日期" type="date" style="width:100%;min-width:135px" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="截止日期">
                    <el-date-picker v-model="listQuery.sendDate" placeholder="请选择日期" type="date" style="width:100%;min-width:135px" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="服务单类型">
                    <el-select style="width:80%;" placeholder="请选择">
                      <el-option label="1--产品咨询" value="shanghai" />
                      <el-option label="2--一般咨询" value="shanghai" />
                      <el-option label="2--保全资讯" value="shanghai" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="字段名称">
                    <el-input v-model="listQuery.receiver" placeholder="字段名称" class="filter-item" @keyup.enter.native="handleFilter" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="fr">
                    <el-button type="primary" size="small" @click="handleFilter">查询</el-button>
                    <el-button type="info" size="small">清空</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <el-table :key="tableKey" v-loading="listLoading" :data="list" :height="searchRow2" fit stripe highlight-current-row style="width: 100%;" @sort-change="()=>{}" @selection-change="selectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column label="来电时间" prop="phoneNo" sortable="custom" align="center" width="160">
              <template slot-scope="scope"><span>{{ scope.row.datetime }}</span></template>
            </el-table-column>
            <el-table-column label="服务单类型" align="center">
              <template slot-scope="scope"><span>{{ scope.row.status }}</span></template>
            </el-table-column>
            <el-table-column label="字段名称" align="center" width="120">
              <template slot-scope="scope"><span>{{ scope.row.name }}</span></template>
            </el-table-column>
            <el-table-column label="服务单数量" align="center" width="100">
              <template slot-scope="scope"><span>{{ scope.row.numberOfServiceOrders }}</span></template>
            </el-table-column>
            <el-table-column label="转办数量" align="center" width="200">
              <template slot-scope="scope"><span>{{ scope.row.transferQuantity }}</span></template>
            </el-table-column>
            <el-table-column label="转办单退回量" align="center" width="200">
              <template slot-scope="scope"><span>{{ scope.row.returnAmountOfTransferOrder }}</span></template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </el-card>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import { createPreCustomer, fetchList, updatePreCustomer } from '@/api/demo/chart/chart2'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapState } from 'vuex'
export default {
  name: 'Chart2',
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
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updatePreCustomer(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$message({
              message: '更新成功',
              type: 'success'
            })
          })
        }
      })
    },

    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024
          this.temp.customerType = '服务单统计表'
          createPreCustomer(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$message({
              message: '创建成功',
              type: 'success'
            })
          })
        }
      })
    },

    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },

    handleBatchDelete() {
      this.listQuery.creater = ''
      this.listQuery.receiver = ''
      this.listQuery.phoneNo = ''
      this.listQuery.sendDate = ''
      this.listQuery.createDate = ''
    },

    selectionChange(val) {
      this.selectionList = val
    }
  }
}
</script>

