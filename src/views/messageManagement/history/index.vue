<template>
  <div class="app-container">
    <el-container style="height: 500px;">
      <el-aside width="47%">
        <el-input v-model="listQuery.projectNum" placeholder="手机号码查询" style="width: 180px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          查询
        </el-button>
        <el-table
          :key="tableKey"
          v-loading="listLoading"
          :data="list"
          fit
          highlight-current-row
          style="width: 100%;"
          align="center"
          @sort-change="sortChange"
        >
          <el-table-column label="客户姓名" width="150%" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.customer }}</span>
            </template>
          </el-table-column>
          <el-table-column label="手机号码" width="150%" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.mobilephone }}</span>
            </template>
          </el-table-column>
          <el-table-column label="发送时间" width="150%" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" @pagination="getList" />
      </el-aside>

      <el-main />

    </el-container>
  </div>
</template>
<script>
import { createFires, fetchPv, firesList, updateArticle } from '@/api/demo/system/permission/user'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const userModeOptions = [
  { key: 'normal', display_name: '正常' },
  { key: 'locked', display_name: '锁定' },
  { key: 'delete', display_name: '删除' }
]

// arr to obj, such as { normal : "正常", lock : "已锁定" }
const userModeKeyValue = userModeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return userModeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 8,
        customer: undefined,
        projectNum: undefined,
        type: undefined,
        sort: '+id'
      },
      userModeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      temp: {
        id: undefined,
        projectNum: undefined,
        timestamp: new Date(),
        type: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    guid() {
      var s = []
      var hexDigits = '0123456789'
      for (var i = 0; i < 18; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 10), 1)
      }
      var uuid = s.join('')
      return uuid
    },
    cuid() {
      var s = []
      var hexDigits = '0123456789'
      for (var i = 0; i < 4; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 10), 1)
      }
      var uuid = s.join('')
      return uuid
    },
    getList() {
      this.listLoading = true
      firesList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
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
    resetTemp() {
      this.temp = {
        id: undefined,
        projectNum: '',
        customer: '',
        timestamp: new Date(),
        company: '',
        status: 'normal/locked/delete'
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = this.cuid() // mock a id
          createFires(this.temp).then(() => {
            this.temp.projectNum = this.guid()
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date()
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['projectNum', 'customer', 'company', 'mobilephone', 'status']
          const filterVal = ['projectNum', 'customer', 'company', 'mobilephone', 'status']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: 'user-list'
          })
          this.downloadLoading = false
        })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

