<template>
  <div class="app-container">
    <div slot="header" class="clearfix">
      <el-form ref="queryForm" :model="queryForm" label-width="100px" size="small">
        <el-row>
          <el-col :sm="12" :lg="8">
            <el-form-item label="公告主题">
              <el-input v-model="listQuery.type" class="filter-item" placeholder="公告主题" @keyup.enter.native="handleFilter" />
            </el-form-item>
          </el-col>
          <el-col :sm="12" :lg="8">
            <el-form-item label="公告内容">
              <el-input v-model="listQuery.title" class="filter-item" placeholder="公告内容" @keyup.enter.native="handleFilter" />
            </el-form-item>
          </el-col>
          <el-col :sm="12" :lg="8">
            <el-form-item label="创建时间">
              <el-col :span="11">
                <el-date-picker v-model="listQuery.from" type="date" style="width:100%;min-width:135px" placeholder="起始日期" />
              </el-col>
              <el-col :span="11">
                <el-date-picker v-model="listQuery.to" type="date" style="width:100%;min-width:135px" placeholder="截止日期" />
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="fr">
              <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
                查询
              </el-button>
              <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="clearList">
                重置
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table :key="tableKey" v-loading="listLoading" :data="list" :height="searchRow1" fit stripe highlight-current-row style="width: 100%;" @sort-change="sortChange">
      <el-table-column type="selection" min-width="55" />
      <el-table-column label="公告主题" prop="id" sortable="custom" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="公告内容" align="center" min-width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" align="center" min-width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.gender }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建者" align="center" min-width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" min-width="600px">
        <template slot-scope="{row}">
          <el-button type="primary" size="small " @click="confirmCustomer(row)">
            置顶
          </el-button>
          <el-button type="primary" size="small " @click="confirmCustomer(row)">
            取消置顶
          </el-button>
          <el-button type="primary" size="small" @click="handleUpdate(row)">
            添加
          </el-button>
          <el-button type="primary" size="small" @click="handleUpdate(row)">
            修改
          </el-button>
          <el-button type="primary" size="danger" @click="handleModifyStatus(row)">
            删除
          </el-button>
          <el-button type="primary" size="small" @click="handleModifyStatus(row)">
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-input v-model="temp.gender" />
        </el-form-item>
        <el-form-item label="身份证号" prop="IDCord">
          <el-input v-model="temp.IDCord" />
        </el-form-item>
        <el-form-item label="来电电话" prop="callInNo">
          <el-input v-model="temp.callInNo" />
        </el-form-item>
        <el-form-item label="来电时间" prop="callInTime">
          <el-input v-model="temp.callInTime" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="temp.remark" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { createArticle, fetchList, fetchPv, updateArticle } from '@/api/demo/customer/preCustomer'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapState } from 'vuex'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
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
      return calendarTypeKeyValue[type]
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
        limit: 20,
        from: '',
        to: '',
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
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
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  computed: {
    ...mapState({
      searchRow1: state => state.commonData.searchRow1,
      searchRow2: state => state.commonData.searchRow2,
      searchRow3: state => state.commonData.searchRow3,
      searchRow4: state => state.commonData.searchRow4
    })
  },
  methods: {
    getList() {
      this.listLoading = false
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 0.1 * 1000)
      })
    },
    handleFilter() {
      /* this.listQuery.page = 1
         this.getList()*/
    },
    handleModifyStatus(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.list.splice(row, 1)
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
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
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
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
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.customerType = '准客户'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
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
              message: '更新成功',
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
          const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
          const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: 'table-list'
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
    },
    confirmCustomer(row) {
      this.$store.confirmCustomer = row
    }
  }
}
</script>
