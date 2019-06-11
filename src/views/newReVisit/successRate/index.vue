<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <el-form ref="queryForm" :model="listQuery" label-width="100px" size="small">
              <el-row>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="销售渠道">
                    <el-select style="width:100%;" placeholder="请选择">
                      <el-option label="1--银行代理" value="shanghai" />
                      <el-option label="2--网销" value="shanghai" />
                      <el-option label="2--直销" value="shanghai" />
                      <el-option label="2--经代" value="shanghai" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="销售方式">
                    <el-select style="width:100%;" placeholder="请选择">
                      <el-option label="111" value="shanghai" />
                      <el-option label="222" value="shanghai" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="代理机构">
                    <el-select style="width:100%;" placeholder="请选择" >
                      <el-option label="111" value="shanghai" />
                      <el-option label="222" value="shanghai" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="签单时间从">
                      <el-date-picker v-model="listQuery.name" placeholder="签单时间从" class="filter-item" @keyup.enter.native="handleFilter" style="width: 100%;" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="到">
                      <el-date-picker v-model="listQuery.name" placeholder="到" class="filter-item" @keyup.enter.native="handleFilter" style="width: 100%;"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="fr">
                    <el-button type="danger" size="small">清空</el-button>
                    <el-button type="primary" size="small" @click="handleFilter">查询</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <el-table :key="tableKey" v-loading="listLoading" :height="searchRow2" style="min-height: 300px;" :data="list" fit stripe highlight-current-row @sort-change="sortChange" @selection-change="selectionChange">
            <el-table-column type="selection" min-width="55" />
            <el-table-column label="归属机构" align="center" min-width="300">
              <template slot-scope="scope"><span>{{ scope.row.AttributiveBody }}</span></template>
            </el-table-column>
            <el-table-column label="应访件数" align="center" min-width="400">
              <template slot-scope="scope"><span>{{ scope.row.numberOfVisits }}</span></template>
            </el-table-column>
            <el-table-column label="犹豫期成功件数" align="center" min-width="300">
              <template slot-scope="scope"><span>{{ scope.row.numberOfSuccesses }}</span></template>
            </el-table-column>
            <el-table-column label="犹豫期内回访成功率" align="center" min-width="300">
              <template slot-scope="scope"><span>{{ scope.row.reteOfSuccess }}</span></template>
            </el-table-column>
            <el-table-column label="回访中" align="center" min-width="300">
              <template slot-scope="scope"><span>{{ scope.row.visiting }}</span></template>
            </el-table-column>
            <el-table-column label="回执待回收" align="center" min-width="300">
              <template slot-scope="scope"><span>{{ scope.row.recycled }}</span></template>
            </el-table-column>
            <el-table-column label="剩余问题单" align="center" min-width="300">
              <template slot-scope="scope"><span>{{ scope.row.listQuestion }}</span></template>
            </el-table-column>
            <el-table-column label="回访完成" align="center" min-width="300">
              <template slot-scope="scope"><span>{{ scope.row.finish }}</span></template>
            </el-table-column>
            <el-table-column label="新契约回访完成率" align="center" min-width="300">
              <template slot-scope="scope"><span>{{ scope.row.completionRates }}</span></template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { createSettings, updateSettings, fetchList } from '@/api/newReVisit/successRate'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapState } from 'vuex'

export default {
  name: 'SuccessRate',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: null,
      detailList: null,
      selectionList: null,
      total: 0,
      listLoading: true,
      listQuery: {
        name: '',
        type: '',
        page: 1,
        limit: 10
      },
      temp: {// 操作时的临时对象
        id: undefined,
        dictionaryType: '',
        dictionaryName: '',
        dictionaryCode: '',
        remark: ''
      },
      dialogFormVisible: false, // dictionary弹窗的标志
      dialogStatus: '',
      textMap: {// 操作弹窗标题
        update: '编辑',
        create: '新建'
      },
      rules: {// 验证规则
        dictionaryType: [{ required: true, message: '必填项', trigger: 'change' }],
        dictionaryName: [{ required: true, message: '必填项', trigger: 'change' }]
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
        dictionaryType: '',
        dictionaryName: '',
        dictionaryCode: '',
        dictionarySort: '',
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
          createSettings(this.temp).then(() => {
            this.total = this.list.unshift(this.temp) // 返回长度
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
          updateSettings(tempData).then(() => {
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
    handleDelete: function(row) {
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
    }
  }
}
</script>

<style>
</style>
