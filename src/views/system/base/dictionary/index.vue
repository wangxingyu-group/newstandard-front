<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <el-form ref="queryForm" :model="listQuery" label-width="100px" size="small">
              <el-row>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="字典类型">
                    <el-input v-model="listQuery.type" placeholder="字典类型" class="filter-item" @keyup.enter.native="handleFilter" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="字典类型名称" label-width="140px">
                    <el-input v-model="listQuery.name" placeholder="字典类型名称" class="filter-item" @keyup.enter.native="handleFilter" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="fr">
                    <el-button type="primary" size="small" @click="handleFilter">查询</el-button>
                    <el-button type="success" size="small" @click="handleCreate">新建</el-button>
                    <el-button type="danger" size="small" @click="handleBatchDelete">批量删除</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <el-table :key="tableKey" v-loading="listLoading" :height="searchRow1" style="min-height: 300px;" :data="list" fit stripe highlight-current-row @sort-change="sortChange" @selection-change="selectionChange">
            <el-table-column type="selection" min-width="55" />
            <el-table-column label="字典类型" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.dictionaryType }}</span></template>
            </el-table-column>
            <el-table-column label="字典类型名称" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.dictionaryName }}</span></template>
            </el-table-column>
            <el-table-column label="备注信息" align="center" min-width="350">
              <template slot-scope="scope"><span>{{ scope.row.remark }}</span></template>
            </el-table-column>
            <el-table-column label="操作" align="center" fixed="right" min-width="300">
              <template slot-scope="{row}">
                <el-button type="primary" size="mini" @click="handleUpdate(row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="handleDelete(row)">删除</el-button>
                <el-button type="primary" size="mini" @click="handleConfig(row)">字典配置</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 500px; margin-left:80px;">
        <el-form-item label="编号" prop="id">
          <el-input v-model="temp.id" placeholder="编号" />
        </el-form-item>
        <el-form-item label="字典类型" prop="dictionaryType">
          <el-input v-model="temp.dictionaryType" placeholder="字典类型" />
        </el-form-item>
        <el-form-item label="字典类型名称" prop="dictionaryName">
          <el-input v-model="temp.dictionaryName" placeholder="字典类型名称" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="temp.remark" placeholder="备注" />
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
    <!-- 配置的模板-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogDetailOut" custom-class="customWidth">
      <el-card>
        <el-row>
          字典类型:<el-input v-model="detailListQuery.type" placeholder="字典类型" style="width: 150px;" />
          字典编码:<el-input v-model="detailListQuery.code" placeholder="字典编码" style="width: 150px;" />
          字典类型名称:<el-input v-model="detailListQuery.name" placeholder="字典类型名称" style="width: 200px;" />
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
          <el-button class="filter-item" type="primary" icon="el-icon-circle-plus-outline" @click="handleDetailCreate">新增</el-button>
        </el-row>
      </el-card>
      <el-table :key="tableKey" v-loading="listLoading" :data="detailList" :height="searchRow1" style="min-height: 300px;" fit stripe highlight-current-row @sort-change="sortChange" @selection-change="selectionChange">
        <el-table-column type="selection" min-width="55" />
        <el-table-column label="字典类型" align="center" min-width="100">
          <template slot-scope="scope"><span>{{ scope.row.dictionaryType }}</span></template>
        </el-table-column>
        <el-table-column label="字典编码" align="center" min-width="100">
          <template slot-scope="scope"><span>{{ scope.row.dictionaryCode }}</span></template>
        </el-table-column>
        <el-table-column label="字典名称" align="center" min-width="200">
          <template slot-scope="scope"><span>{{ scope.row.dictionaryName }}</span></template>
        </el-table-column>
        <el-table-column label="字典顺序" align="center" min-width="100">
          <template slot-scope="scope"><span>{{ scope.row.sort }}</span></template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right" min-width="200">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="handleDetailUpdate(row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDetailDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="detailTotal>0" :total="detailTotal" :page.sync="detailListQuery.page" :limit.sync="detailListQuery.limit" @pagination="getDetailList" />
      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogDetailInner" append-to-body>
        <el-form ref="dataForm2" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 500px; margin-left:80px;">
          <el-form-item label="字典类型" prop="dictionaryType">
            <el-input v-model="temp1.dictionaryType" />
          </el-form-item>
          <el-form-item label="字典编码" prop="dictionaryName">
            <el-input v-model="temp1.dictionaryCode" />
          </el-form-item>
          <el-form-item label="字典名称" prop="dictionaryName">
            <el-input v-model="temp1.dictionaryName" />
          </el-form-item>
          <el-form-item label="顺序" prop="remark">
            <el-input v-model="temp1.sort" />
          </el-form-item>
          <el-form-item label="中文名称" prop="dictionaryType">
            <el-input v-model="temp1.chName" />
          </el-form-item>
          <el-form-item label="英文名称" prop="dictionaryName">
            <el-input v-model="temp1.frName" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogDetailInner = false">
            取消
          </el-button>
          <el-button type="primary" @click="dialogStatus==='configInsert'?detailCreateData():detailUpdateData()">
            确认
          </el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { createDictionary, fetchList, updateDictionary, fetchDictionary } from '@/api/demo/system/base/dictionary/dictionary'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapState } from 'vuex'

export default {
  name: 'Dictionary',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: null,
      detailList: null,
      selectionList: null,
      total: 0,
      detailTotal: 0,
      listLoading: true,
      listQuery: {
        name: '',
        type: '',
        page: 1,
        limit: 10
      },
      detailListQuery: {
        name: '',
        code: '',
        type: '',
        page: 1,
        limit: 10
      },
      temp: {// 操作时的临时对象
        id: undefined,
        dictionaryType: '',
        dictionaryName: '',
        dictionaryCode: '',
        dictionarySort: '',
        remark: ''
      },
      temp1: { // 操作细节表的临时对象
        id: undefined,
        dictionaryType: '',
        dictionaryName: '',
        dictionaryCode: '',
        dictionarySort: '',
        chName: '',
        frName: '',
        remark: ''
      },
      dialogFormVisible: false, // dictionary弹窗的标志
      dialogStatus: '',
      dialogDetailOut: false, // 字典配置外层弹窗的配置
      dialogDetailInner: false, // 字典配置内层弹窗的配置
      textMap: {// 操作弹窗标题
        update: '编辑',
        create: '新建',
        config: '字典配置',
        configInsert: '增加字典配置',
        configUpdate: '修改字典配置'
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
    getDetailList() {
      this.listLoading = true
      fetchDictionary(this.listQuery).then(response => {
        this.detailList = response.data.items
        this.detailTotal = response.data.total
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
    resetTemp1() {
      this.temp1 = {
        id: undefined,
        dictionaryType: '',
        dictionaryName: '',
        dictionaryCode: '',
        dictionarySort: '',
        chName: '',
        frName: '',
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
          createDictionary(this.temp).then(() => {
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
          updateDictionary(tempData).then(() => {
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
    handleConfig(row) {
      this.temp = Object.assign({}, row)
      this.detailListQuery.type = this.temp.dictionaryType // 替换临时数据
      this.dialogStatus = 'config'
      this.getDetailList()
      this.dialogDetailOut = true
      this.dialogDetailInner = false
    },
    handleDetailUpdate(row) {
      this.temp1 = Object.assign({}, row)
      this.dialogStatus = 'configUpdate'
      this.dialogDetailInner = true
      this.$nextTick(() => {
        this.$refs['dataForm2'].clearValidate()
      })
    },
    detailUpdateData() {
      this.$refs['dataForm2'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp1)
          updateDictionary(tempData).then(() => {
            for (const v of this.detailList) {
              if (v.id === this.temp1.id) {
                const index = this.detailList.indexOf(v)
                this.detailList.splice(index, 1, this.temp1)
                break
              }
            }
            this.dialogDetailInner = false
            this.$message({
              message: '更新成功',
              type: 'success'
            })
          })
        }
      })
    },
    handleDetailDelete: function(row) {
      this.$confirm('确认删除选中的记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const index = this.detailList.indexOf(row)
        this.detailList.splice(index, 1)
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
    },
    handleDetailCreate() {
      this.resetTemp1()
      this.dialogStatus = 'configInsert'
      this.dialogDetailInner = true
      this.$nextTick(() => {
        this.$refs['dataForm2'].clearValidate()
      })
    },
    detailCreateData() {
      this.$refs['dataForm2'].validate((valid) => {
        if (valid) {
          this.temp1.id = parseInt(Math.random() * 100) + 1024
          this.temp1.dictionaryType = this.detailListQuery.type
          createDictionary(this.temp1).then(() => {
            this.total = this.detailList.unshift(this.temp1) // 返回长度
            this.dialogDetailInner = false
            this.$message({
              message: '创建成功',
              type: 'success'
            })
          })
        }
      })
    },
    selectionChange(val) {
      this.selectionList = val
    },
    confirmCustomer(row) {
      this.$store.commit('setCurrentCustomer', row)
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

<style>
  .customWidth{
    min-width: 1000px;
    width: 75%;
    min-height: 580px;
    height: 90%;
    top: -50px;
  }
</style>
