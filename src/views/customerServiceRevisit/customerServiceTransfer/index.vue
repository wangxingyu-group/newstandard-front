<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <el-form ref="queryForm" :model="listQuery" label-width="100px" size="small">
              <el-row>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="保单号">
                    <el-input v-model="listQuery.idNo" placeholder="保单号" class="filter-item" @keyup.enter.native="handleFilter" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="投保人客户号">
                    <el-input v-model="listQuery.idNo" placeholder="投保人客户号" class="filter-item" @keyup.enter.native="handleFilter" />
                  </el-form-item>
                </el-col>
                <!--                <el-col :sm="12" :lg="8">
                  <el-form-item label="申请方式">
                    <el-select style="width:20%;" placeholder="请选择">
                      <el-option label="1&#45;&#45;信函申请" value="shanghai2" />
                      <el-option label="2&#45;&#45;官微申请" value="shanghai3" />
                    </el-select>
                  </el-form-item>
                </el-col>-->
                <el-col :sm="12" :lg="8">
                  <el-form-item label="时间区间起">
                    <el-date-picker>
                      <el-input v-model="listQuery.datetime" placeholder="时间区间起" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="时间区间起">
                    <el-date-picker>
                      <el-input v-model="listQuery.datetime" placeholder="时间区间止" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <!--                <el-col :sm="12" :lg="8">
                  <el-form-item label="外呼类别">
                    <el-select style="width:20%;" placeholder="请选择">
                      <el-option label="1&#45;&#45;非直系亲属" value="shanghai0" />
                      <el-option label="2&#45;&#45;委托类" value="shanghai1" />
                    </el-select>
                  </el-form-item>
                </el-col>-->
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="fr">
                    <el-button type="primary" size="small">查询</el-button>
                    <el-button type="danger" size="small">重置</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <el-table :key="tableKey" v-loading="listLoading" :height="searchRow2" :data="list" fit stripe highlight-current-row style="width: 100%;" @sort-change="sortChange" @selection-change="selectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column label="保单号" prop="id" sortable="custom" align="center" width="150">
              <template slot-scope="scope"><span>{{ scope.row.id }}</span></template>
            </el-table-column>
            <el-table-column label="投保人客户号" align="center" width="170">
              <template slot-scope="scope"><span>{{ scope.row.idNo }}</span></template>
            </el-table-column>
            <el-table-column label="投保人姓名" align="center" width="80">
              <template slot-scope="scope"><span>{{ scope.row.name }}</span></template>
            </el-table-column>
            <el-table-column label="投保人电话" align="center" width="200">
              <template slot-scope="scope"><span>{{ scope.row.callInNo }}</span></template>
            </el-table-column>
            <el-table-column label="保全项目名称" align="center" width="150">
              <template slot-scope="scope"><span>{{ scope.row.description }}</span></template>
            </el-table-column>
            <el-table-column label="保全受理号" align="center" width="200">
              <template slot-scope="scope"><span>{{ scope.row.idNo }}</span></template>
            </el-table-column>
            <el-table-column label="保全申请日期" align="center" width="200">
              <template slot-scope="scope"><span>{{ scope.row.datetime }}</span></template>
            </el-table-column>
            <el-table-column label="申请人" align="center" width="200">
              <template slot-scope="scope"><span>{{ scope.row.name }}</span></template>
            </el-table-column>
            <el-table-column label="申请人电话" align="center" width="200">
              <template slot-scope="scope"><span>{{ scope.row.callInNo }}</span></template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchList } from '@/api/demo/customerServiceRevisit/customerServiceTransfer'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapState } from 'vuex'

export default {
  name: 'CustomerServiceTransfer',
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
      },
      temp: {// 操作时的临时对象
        id: undefined,
        name: '',
        gender: 0,
        idNo: undefined,
        callInNo: '',
        callInTime: '',
        customerType: '保全转办任务池',
        remark: '',
        datetime: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {// 操作弹窗标题
        update: '编辑',
        create: '新建'
      },
      rules: {// 验证规则
        name: [{ required: true, message: '必填项', trigger: 'change' }],
        idNo: [{ required: true, message: '必填项', trigger: 'change' }]
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
        customerType: '保全转办任务池',
        remark: '',
        datetime: ''
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
          this.temp.customerType = '保全转办任务池'
          // createPreCustomer(this.temp).then(() => {
          //   this.list.unshift(this.temp)
          //   this.dialogFormVisible = false
          //   this.$message({
          //     message: '创建成功',
          //     type: 'success'
          //   })
          // })
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
          // const tempData = Object.assign({}, this.temp)
          // updatePreCustomer(tempData).then(() => {
          //   for (const v of this.list) {
          //     if (v.id === this.temp.id) {
          //       const index = this.list.indexOf(v)
          //       this.list.splice(index, 1, this.temp)
          //       break
          //     }
          //   }
          //   this.dialogFormVisible = false
          //   this.$message({
          //     message: '更新成功',
          //     type: 'success'
          //   })
          // })
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
      this.$store.commit('commonData/SET_CURRENT_CUSTOMER', row)
      this.$notify({
        title: row.name,
        message: '确认成功',
        type: 'success',
        duration: 2000
      })
    }
  }
}

</script>

<style scoped>

</style>
