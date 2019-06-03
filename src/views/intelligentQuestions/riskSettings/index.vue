<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <el-form ref="queryForm" :model="queryForm" label-width="100px" size="small">
              <el-row>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="险种编码">
                    <el-input placeholder="险种编码" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="险种名称">
                    <el-input placeholder="险种名称" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="险种类型">
                    <el-select v-model="queryForm.status" style="width:100%;" placeholder="---请选择---">
                      <el-option label="传统险" value="传统险" />
                      <el-option label="投连险" value="投连险" />
                      <el-option label="分红险" value="分红险" />
                      <el-option label="万能险" value="万能险" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="fr">
                    <el-button type="primary" size="small" @click="getList">查询</el-button>
                    <el-button type="info" size="small" @click="resetQuery">清空</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <el-table ref="table" :key="0" v-loading="tableLoading" :data="tableData" :height="searchRow1" row-key="id" stripe highlight-current-row @selection-change="selectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column label="险种编码" align="center" width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.riskCode }}</span>
              </template>
            </el-table-column>
            <el-table-column label="险种名称" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.riskName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="开始时间" align="center" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.startTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="结束时间" align="center" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.endTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150">
              <template slot-scope="{row}">
                <el-button type="primary" size="mini" @click="handleUpdate(row)">配置问卷</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="queryForm.page" :limit.sync="queryForm.limit" @pagination="getList" />
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="配置问卷" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 500px; margin-left:100px;">
        <el-form-item label="险种编码" prop="description">
          <el-input v-model="temp.description" />
        </el-form-item>
        <el-form-item label="问卷类型" prop="status">
          <el-select v-model="temp.status" placeholder="---请选择---">
            <el-option label="公共回访问卷" value="effective" />
            <el-option label="理赔外呼问卷" value="noneffective" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?create():update()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { create, fetchList, update } from '@/api/intelligentQuestions/riskSettings'
import Pagination from '@/components/Pagination'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Question',
  components: { Pagination },
  data() {
    return {
      queryForm: {
        status: null,
        from: null,
        to: null,
        page: 1,
        limit: 10
      },
      tableLoading: true,
      tableData: null,
      total: 0,
      dialogFormVisible: false,
      dialogStatus: '',
      dialogTitleMap: {
        create: '新建',
        update: '编辑'
      },
      temp: {
        id: null,
        riskCode: null,
        riskName: '投连险',
        startTime: null,
        endTime: null
      },
      rules: {
        description: [{ required: true, message: '必填项', trigger: 'blur' }]
      },
      selectionData: null
    }
  },
  computed: {
    ...mapGetters([
      'clientWidth',
      'minClientWidth'
    ]),
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
      this.tableLoading = true
      fetchList(this.queryForm).then((response) => {
        this.tableData = response.data.items
        this.total = response.data.total
        // 模拟延迟
        setTimeout(() => {
          this.tableLoading = false
        }, 0.2 * 1000)
      })
    },
    resetQuery() {
      this.queryForm.status = 'effective'
      this.queryForm.from = null
      this.queryForm.to = null
    },
    resetTemp() {
      this.temp = {
        id: null,
        type: '选择题',
        description: null,
        status: 'effective',
        createTime: null
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
    create() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024
          const date = new Date()
          const seperator = '-'
          const year = date.getFullYear()
          let month = date.getMonth() + 1
          let strDate = date.getDate()
          if (month >= 1 && month <= 9) {
            month = '0' + month
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = '0' + strDate
          }
          this.temp.createTime = year + seperator + month + seperator + strDate
          create(this.temp).then(() => {
            this.tableData.unshift(this.temp)
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
    update() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          update(tempData).then(() => {
            for (const v of this.tableData) {
              if (v.id === this.temp.id) {
                const index = this.tableData.indexOf(v)
                this.tableData.splice(index, 1, this.temp)
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
        const index = this.tableData.indexOf(row)
        this.tableData.splice(index, 1)
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
        this.selectionData.forEach((row) => this.tableData.splice(this.tableData.indexOf(row), 1))
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
    },
    selectionChange(rows) {
      this.selectionData = rows
    }
  }
}
</script>

