<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <el-form ref="queryForm" :model="queryForm" label-width="100px" size="small">
              <el-row>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="编号">
                    <el-input v-model="queryForm.modelName" class="filter-item" placeholder="编号" @keyup.enter.native="handleFilter" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="名称">
                    <el-input v-model="queryForm.modelName" class="filter-item" placeholder="名称" @keyup.enter.native="handleFilter" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="负责人">
                    <el-input v-model="queryForm.modelName" class="filter-item" placeholder="负责人" @keyup.enter.native="handleFilter" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="简称">
                    <el-input v-model="queryForm.modelName" class="filter-item" placeholder="简称" @keyup.enter.native="handleFilter" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="地址">
                    <el-input v-model="queryForm.modelName" class="filter-item" placeholder="地址" @keyup.enter.native="handleFilter" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="成立时间">
                    <el-col :span="11">
                      <el-date-picker v-model="queryForm.from" type="date" style="width:100%;min-width:135px" placeholder="成立时间" />
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="fr">
                    <el-button type="primary" size="small" @click="getList">查询</el-button>
                    <el-button type="info" size="small" @click="resetQuery">清空</el-button>
                    <el-button type="success" size="small" @click="handleCreate">添加</el-button>
                    <el-button type="success" size="small" @click="handleCreate">移动</el-button>
                    <el-button type="success" size="small" @click="handleCreate">删除</el-button>
                    <el-button type="danger" size="small" @click="handleBatchDelete">批量删除</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <el-table ref="table" :key="0" v-loading="tableLoading" :data="tableData" :height="searchRow1" row-key="id" stripe highlight-current-row @selection-change="selectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column label="用户编码" align="center" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.projectNum }}</span>
              </template>
            </el-table-column>
            <el-table-column label="用户姓名" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.cName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="电子邮件" align="center" min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.cEmail }}</span>
              </template>
            </el-table-column>
            <el-table-column label="手机号码" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.mobilephone }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作时间" align="center" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="200">
              <template slot-scope="{row}">
                <el-button type="primary" size="mini" @click="handleUpdate(row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="handleDelete(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="queryForm.page" :limit.sync="queryForm.limit" @pagination="getList" />
        </el-card>

      </el-col>
    </el-row>

    <el-dialog :title="dialogTitleMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 500px; margin-left:100px;">
        <el-form-item label="问题类型" prop="type">
          <el-select v-model="temp.type" placeholder="---请选择---">
            <el-option label="选择题" value="选择题" />
          </el-select>
        </el-form-item>
        <el-form-item label="问题描述" prop="description">
          <el-input v-model="temp.description" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="temp.status" placeholder="---请选择---">
            <el-option label="有效" value="effective" />
            <el-option label="无效" value="noneffective" />
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
import { create, fetchList, update } from '@/api/messageManagement/messageTemplate'
import Pagination from '@/components/Pagination'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Question',
  components: { Pagination },
  data() {
    return {
      queryForm: {
        modelName: undefined,
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
        type: '选择题',
        description: null,
        status: 'effective',
        createTime: null
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
          this.$refs.tableScrollbar.update()
        }, 0.2 * 1000)
      })
    },
    resetQuery() {
      this.queryForm.modelName = null
      this.queryForm.from = null
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
          this.temp.timestamp = year + seperator + month + seperator + strDate
          this.temp.cName = '张三'
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
