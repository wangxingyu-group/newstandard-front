<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <el-form ref="queryForm" :model="listQuery" label-width="100px" size="small">
              <el-row>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="创建人">
                    <el-input v-model="listQuery.creater" placeholder="创建人" class="filter-item" @keyup.enter.native="handleFilter" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="收信人">
                    <el-input v-model="listQuery.receiver" placeholder="收信人" class="filter-item" @keyup.enter.native="handleFilter" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="发送手机号">
                    <el-input v-model="listQuery.phoneNo" placeholder="发送手机号" class="filter-item" @keyup.enter.native="handleFilter" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="发送日期">
                    <el-date-picker v-model="listQuery.sendDate" type="date" style="width:100%;min-width:135px" placeholder="" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="创建日期">
                    <el-date-picker v-model="listQuery.sendDate" type="date" style="width:100%;min-width:135px" placeholder="" />
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
            <el-table-column label="手机号" prop="phoneNo" sortable="custom" align="center" width="150">
              <template slot-scope="scope"><span>{{ scope.row.phoneNo }}</span></template>
            </el-table-column>
            <el-table-column label="短信内容" align="center">
              <template slot-scope="scope"><span>{{ scope.row.content }}</span></template>
            </el-table-column>
            <el-table-column label="发送状态" align="center" width="100">
              <template slot-scope="scope"><span>{{ scope.row.status }}</span></template>
            </el-table-column>
            <el-table-column label="发送人" align="center" width="100">
              <template slot-scope="scope"><span>{{ scope.row.sender }}</span></template>
            </el-table-column>
            <el-table-column label="发送日期" align="center" width="200">
              <template slot-scope="scope"><span>{{ scope.row.sendDate }}</span></template>
            </el-table-column>
            <el-table-column label="发送时间" align="center" width="200">
              <template slot-scope="scope"><span>{{ scope.row.sendTime }}</span></template>
            </el-table-column>
            <el-table-column label="创建日期" align="center" width="200">
              <template slot-scope="scope"><span>{{ scope.row.createTime }}</span></template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </el-card>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import { createPreCustomer, fetchList, updatePreCustomer } from '@/api/messageManagement/history'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapState } from 'vuex'
export default {
  name: 'History',
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
          this.temp.customerType = '准客户'
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

