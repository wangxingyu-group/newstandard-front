<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.temName" placeholder="通话流水号" style="width: 180px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.temName" placeholder="坐席工号" style="width: 180px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.temName" placeholder="来电号码" style="width: 180px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-date-picker
        v-model="listQuery.creDate1"
        style="width: 180px;"
        class="filter-item"
        type="date"
        placeholder="时间区间起"
        :picker-options="pickerOptions0"
      />
      <el-date-picker
        v-model="listQuery.creDate2"
        style="width: 180px;"
        class="filter-item"
        type="date"
        placeholder="时间区间止"
        :picker-options="pickerOptions1"
      />
      <el-input v-model="listQuery.temName" placeholder="服务单号	" style="width: 180px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select slot="prepend" v-model="select" placeholder="部门" style="margin-bottom: 10px;vertical-align:middle;display: inline-block;">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        />
      </el-select>
      <br>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-close" @click="handleBatchDelete">
        开启/关闭
      </el-button>
    </div>

    <el-table :key="tableKey" v-loading="listLoading" :data="list" fit stripe highlight-current-row style="width: 100%;" @sort-change="sortChange" @selection-change="selectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column label="通话流水号" prop="id" sortable="custom" align="center" width="180">
        <template slot-scope="scope"><span>{{ scope.row.id }}</span></template>
      </el-table-column>
      <el-table-column label="坐席工号" align="center" width="100">
        <template slot-scope="scope"><span>{{ scope.row.customerType }}</span></template>
      </el-table-column>
      <el-table-column label="来电号码" align="center" width="120">
        <template slot-scope="scope"><span>{{ scope.row.tel }}</span></template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" width="200">
        <template slot-scope="scope"><span>{{ scope.row.callInDate }}</span></template>
      </el-table-column>
      <el-table-column label="服务单号" align="center" width="200">
        <template slot-scope="scope"><span>{{ scope.row.customerType }}</span></template>
      </el-table-column>
      <el-table-column label="服务单类型" align="center" width="200">
        <template slot-scope="scope"><span>{{ scope.row.gender }}</span></template>
      </el-table-column>
      <el-table-column label="录音url" align="center" width="250">
        <template slot-scope="scope"><span>{{ scope.row.url }}</span></template>
      </el-table-column>
      <el-table-column label="客户姓名" align="center" width="200">
        <template slot-scope="scope"><span>{{ scope.row.nameCus }}</span></template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { createPreCustomer, fetchList, updatePreCustomer } from '@/api/demo/quality/qualityAssurance/qualityAssurance'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'QualityAssurance', // 该组件名称为Quality大写Q或者驼峰标志
  components: { Pagination },
  data() {
    return {
      select: '',
      tableKey: 0,
      list: null,
      options: [{
        value: '1',
        label: '产品咨询'
      }, {
        value: '2',
        label: '一般咨询'
      }, {
        value: '3',
        label: '保全咨询'
      }, {
        value: '4',
        label: '系统问题'
      }, {
        value: '5',
        label: '理赔报案'
      }],
      selectionList: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        sort: '+id'
      },
      temp: {// 操作时的临时对象
        id: undefined,
        name: '',
        gender: 0,
        IDCard: undefined,
        callInNo: '',
        callInTime: '',
        customerType: '准客户',
        remark: ''
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
    resetTemp() {
      this.temp = {
        id: undefined,
        name: '',
        gender: 0,
        IDCard: undefined,
        callInNo: '',
        callInTime: '',
        customerType: '准客户',
        remark: ''
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
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
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
    handleDelete(row) {
      this.$confirm('确认删除选中的记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
    },
    handleBatchDelete() {
      this.$confirm('确认删除选中的记录?', '提示', {
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
    selectionChange(val) {
      this.selectionList = val
    },
    confirmCustomer(row) {
      this.$store.confirmCustomer = row
      this.$notify({
        title: row.name,
        message: '确认客户成功',
        type: 'success',
        duration: 2000
      })
    }
  }
}
</script>
