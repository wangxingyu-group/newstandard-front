<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <el-form ref="queryForm" :model="listQuery" label-width="100px" size="small">
              <el-row>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="起止日期">
                    <el-col :span="11">
                      <el-date-picker v-model="listQuery.from" type="date" style="width:100%;min-width:135px" placeholder="起始日期" />
                    </el-col>
                    <el-col style="text-align: center" :span="2">-</el-col>
                    <el-col :span="11">
                      <el-date-picker v-model="listQuery.to" type="date" style="width:100%;min-width:135px" placeholder="截止日期" />
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="任务种类">
                      <el-select v-model="listQuery.task" placeholder="任务种类" style="width: 100%;">
                      <el-option v-for="(item, index) in tasks" :key="index" :label="item" :value="item" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="fr">
                    <el-button type="primary" size="small" @click="handleFilter">查询</el-button>
                    <el-button type="info" size="small" @click="clearList">重置</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <el-table :key="tableKey" v-loading="listLoading" :height="searchRow1" style="min-height: 300px;" :data="list" fit stripe highlight-current-row @sort-change="sortChange" @selection-change="selectionChange">
            <el-table-column type="selection" min-width="55" />
            <el-table-column label="任务种类" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.flag }}</span></template>
            </el-table-column>
            <el-table-column label="任务主题" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.theme }}</span></template>
            </el-table-column>
            <el-table-column label="任务发布时间" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.date }}</span></template>
            </el-table-column>
            <el-table-column label="责任人" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.name }}</span></template>
            </el-table-column>
            <el-table-column label="操作" align="center" fixed="right" min-width="200">
              <template slot-scope="{row}">
                <el-button type="primary" size="mini" @click="handleUpdate(row)">查看</el-button>
                <el-button type="primary" size="mini" @click="handleUpdate(row)">处理</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 500px; margin-left:80px;">
        <el-form-item label="业务类型标识" prop="settType">
          <el-input v-model="temp.dictionaryType" />
        </el-form-item>
        <el-form-item label="类型名称" prop="dictionaryName">
          <el-input v-model="temp.dictionaryName" />
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
  </div>
</template>

<script>
import { fetchList } from '@/api/backlog/backlogTaskPool'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapState } from 'vuex'

export default {
  name: 'TaskPool',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: null,
      detailList: null,
      selectionList: null,
      total: 0,
      listLoading: true,
      tasks: ['呼入工单转办', '新单回访转办', '理赔回访转办', '核保回访转办', '保全回访转办'],
      listQuery: {
        task: '',
        from: '',
        to: '',
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
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
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
    clearList() {
      this.listQuery = {
        task: '',
        from: '',
        to: '',
        page: 1,
        limit: 10
      }
    }
  }
}
</script>

<style>
</style>
