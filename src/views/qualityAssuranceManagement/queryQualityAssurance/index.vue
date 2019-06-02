<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <el-form ref="queryForm" :model="listQuery" label-width="100px" size="small">
              <el-row>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="时间区间起">
                    <el-date-picker
                      v-model="listQuery.creDate1"
                      class="filter-item"
                      type="date"
                      placeholder="时间区间起"
                      :picker-options="pickerOptions0"
                      style="width:100%;min-width:135px"
                    />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="时间区间止">
                    <el-date-picker
                      v-model="listQuery.creDate2"
                      class="filter-item"
                      type="date"
                      placeholder="时间区间止"
                      :picker-options="pickerOptions1"
                      style="width:100%;min-width:135px"
                    />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="任务状态">
                    <el-select v-model="select" style="width:100%;min-width:135px" placeholder="任务状态">
                      <el-option label="1--已质检" value="shanghai" />
                      <el-option label="2--已复核" value="shanghai" />
                      <el-option label="3--已申诉" value="shanghai" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <div class="fr">
                    <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="handleFilter">
                      查询
                    </el-button>
                    <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" icon="el-icon-remove-outline" @click="handleCreate">
                      重置
                    </el-button>
                    <el-button class="filter-item" size="small" style="margin-left: 10px;" type="danger" icon="el-icon-upload" @click="handleBatchDelete">
                      申诉
                    </el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <el-table :key="tableKey" v-loading="listLoading" :data="list" fit stripe highlight-current-row style="width: 100%;" @sort-change="sortChange" @selection-change="selectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column label="通话流水号" prop="id" sortable="custom" align="center" width="180">
              <template slot-scope="scope"><span>{{ scope.row.id }}</span></template>
            </el-table-column>
            <el-table-column label="服务单号" align="center" width="200">
              <template slot-scope="scope"><span>{{ scope.row.customerType }}</span></template>
            </el-table-column>
            <el-table-column label="坐席工号" align="center" width="180">
              <template slot-scope="scope"><span>{{ scope.row.customerType }}</span></template>
            </el-table-column>
            <el-table-column label="创建日期" align="center" width="200">
              <template slot-scope="scope"><span>{{ scope.row.callInDate }}</span></template>
            </el-table-column>
            <el-table-column label="修改日期" align="center" width="200">
              <template slot-scope="scope"><span>{{ scope.row.callInDateA }}</span></template>
            </el-table-column>
            <el-table-column label="服务单类型" align="center" width="200">
              <template slot-scope="scope"><span>{{ scope.row.gender }}</span></template>
            </el-table-column>
            <el-table-column label="申诉原因" align="center" width="200">
              <template slot-scope="scope"><span>{{ scope.row.reason }}</span></template>
            </el-table-column>
            <el-table-column label="质检分数" align="center" width="200">
              <template slot-scope="scope"><span>{{ scope.row.score }}</span></template>
            </el-table-column>
            <el-table-column label="操作人" align="center" width="200">
              <template slot-scope="scope"><span>{{ scope.row.opertor }}</span></template>
            </el-table-column>
            <el-table-column label="来电号码" align="center" width="120">
              <template slot-scope="scope"><span>{{ scope.row.tel }}</span></template>
            </el-table-column>
            <el-table-column label="录音url" align="center" width="250">
              <template slot-scope="scope"><span>{{ scope.row.url }}</span></template>
            </el-table-column>
            <el-table-column label="质检摘要" align="center" width="250">
              <template slot-scope="scope"><span>{{ scope.row.reasonA }}</span></template>
            </el-table-column>
            <el-table-column label="质检状态" align="center" width="250">
              <template slot-scope="scope"><span>{{ scope.row.state }}</span></template>
            </el-table-column>
            <el-table-column label="客户姓名" align="center" width="200">
              <template slot-scope="scope"><span>{{ scope.row.nameCus }}</span></template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </el-card>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import { createPreCustomer, fetchList, updatePreCustomer } from '@/api/demo/quality/queryQualityAssurance/queryQualityAssurance'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'QueryQualityAssurance', // 该组件名称为Quality大写Q或者驼峰标志
  components: { Pagination },
  data() {
    return {
      select: '',
      tableKey: 0,
      list: null,
      options: [{
        value: '1',
        label: '已质检'
      }, {
        value: '2',
        label: '已复核'
      }, {
        value: '3',
        label: '已申诉'
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
        idNo: undefined,
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
        idNo: undefined,
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
