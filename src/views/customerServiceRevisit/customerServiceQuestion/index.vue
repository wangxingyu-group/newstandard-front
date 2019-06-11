<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <el-form ref="queryForm" :model="listQuery" label-width="100px" size="small">
              <el-row>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="保全问题id">
                    <el-input v-model="listQuery.name" placeholder="保全问题id" class="filter-item" @keyup.enter.native="handleFilter" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <el-table :key="tableKey" v-loading="listLoading" :height="searchRow1" :data="list" fit stripe highlight-current-row style="width: 100%;" @sort-change="sortChange" @selection-change="selectionChange">
            <el-table-column type="selection" min-width="55" />
            <el-table-column label="问题序号" prop="id" sortable="custom" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.id }}</span></template>
            </el-table-column>
            <el-table-column label="问题" align="center" min-width="300">
              <template slot-scope="scope"><span>{{ scope.row.description }}</span></template>
            </el-table-column>
            <el-table-column label="创建时间" align="center" min-width="170">
              <template slot-scope="scope"><span>{{ scope.row.datetime }}</span></template>
            </el-table-column>
            <el-table-column label="创建人" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.name }}</span></template>
            </el-table-column>
            <el-table-column label="保全类型" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.type }}</span></template>
            </el-table-column>
            <el-table-column label="问题类型" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.questionType }}</span></template>
            </el-table-column>
            <el-table-column label="开启/关闭" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.status }}</span></template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchList } from '@/api/demo/customerServiceRevisit/customerServiceQuestion'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapState } from 'vuex'

export default {
  name: 'CustomerServiceQuestion',
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
        customerType: '问题管理',
        remark: ''
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
        customerType: '问题管理',
        remark: ''
      }
    },

    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024
          this.temp.customerType = '问题管理'
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
    selectionChange(val) {
      this.selectionList = val
    },
    confirmCustomer(row) {
      this.$store.commit('commonData/SET_CURRENT_CUSTOMER', row)
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

<style scoped>

</style>
