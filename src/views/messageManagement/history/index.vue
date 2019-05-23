<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.creater" placeholder="创建人" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.receiver" placeholder="收信人" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.phoneNo" placeholder="发送手机号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />

      <el-date-picker
        v-model="listQuery.sendDate"
        style="width: 180px;"
        class="filter-item"
        type="date"
        placeholder="发送日期"
        :picker-options="pickerOptions0"
        @keyup.enter.native="handleFilter"
      />
      <el-date-picker
        v-model="listQuery.createDate"
        style="width: 180px;"
        class="filter-item"
        type="date"
        placeholder="创建日期"
        :picker-options="pickerOptions0"
        @keyup.enter.native="handleFilter"
      />

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-close" @click="handleBatchDelete">
        清空
      </el-button>
    </div>

    <el-table :key="tableKey" v-loading="listLoading" :data="list" fit stripe highlight-current-row style="width: 100%;" @sort-change="sortChange" @selection-change="selectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column label="手机号" prop="phoneNo" sortable="custom" align="center" width="150">
        <template slot-scope="scope"><span>{{ scope.row.phoneNo }}</span></template>
      </el-table-column>
      <el-table-column label="短信内容" align="center" width="100">
        <template slot-scope="scope"><span>{{ scope.row.msgContent }}</span></template>
      </el-table-column>
      <el-table-column label="发送状态" align="center" width="80">
        <template slot-scope="scope"><span>{{ scope.row.status==='0'?'':'' }}</span></template>
      </el-table-column>
      <el-table-column label="发送人" align="center" width="200">
        <template slot-scope="scope"><span>{{ scope.row.sender }}</span></template>
      </el-table-column>
      <el-table-column label="发送日期" align="center" width="150">
        <template slot-scope="scope"><span>{{ scope.row.sendDate }}</span></template>
      </el-table-column>

      <el-table-column label="发送时间" align="center" width="200">
        <template slot-scope="scope"><span>{{ scope.row.sendTime }}</span></template>
      </el-table-column>
      <el-table-column label="创建日期" align="center" width="200">
        <template slot-scope="scope"><span>{{ scope.row.createDate }}</span></template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>

</template>

<script>
import { createPreCustomer, fetchList, updatePreCustomer } from '@/api/demo/customer/preCustomer'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

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
        limit: 10,
        sort: '+id'
      }
    }
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

