<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <el-form ref="queryForm" :model="queryForm" label-width="100px" size="small">
              <el-row>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="问卷标题">
                    <el-input v-model="queryForm.title" placeholder="问卷标题" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="出题人">
                    <el-input v-model="queryForm.author" placeholder="出题人" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="创建时间">
                    <el-col :span="11">
                      <el-date-picker v-model="queryForm.from" type="date" style="width:100%;min-width:135px" placeholder="起始时间" />
                    </el-col>
                    <el-col style="text-align: center" :span="2">-</el-col>
                    <el-col :span="11">
                      <el-date-picker v-model="queryForm.to" type="date" style="width:100%;min-width:135px" placeholder="截止时间" />
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="问题描述">
                    <el-input v-model="queryForm.description" placeholder="问题描述" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="是否发布">
                    <el-select v-model="queryForm.publish" style="width:100%;" placeholder="是否发布">
                      <el-option label="是" value="yes" />
                      <el-option label="否" value="no" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="状态">
                    <el-select v-model="queryForm.status" style="width:100%;" placeholder="状态">
                      <el-option label="有效" value="effective" />
                      <el-option label="无效" value="noneffective" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="fr">
                    <el-button type="primary" size="small" @click="getList">查询</el-button>
                    <el-button type="info" size="small" @click="resetQuery">清空</el-button>
                    <el-button type="success" size="small" @click="handleCreate">新建</el-button>
                    <el-button type="danger" size="small" @click="handleBatchDelete">批量删除</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <el-table ref="table" :key="0" v-loading="tableLoading" :data="tableData" :height="searchRow2" row-key="id" stripe highlight-current-row @selection-change="selectionChange">
            <el-table-column type="selection" min-width="55" />
            <el-table-column label="问卷标题" align="center" min-width="400">
              <template slot-scope="scope">
                <span>{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column label="出题人" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.author }}</span>
              </template>
            </el-table-column>
            <el-table-column label="问卷描述" align="center" min-width="500">
              <template slot-scope="scope">
                <span>{{ scope.row.description }}</span>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center" min-width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="是否发布" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.publish==='yes'?'是':'否' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="性别" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.gender==='0'?'女':'男' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="是否老年" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.isOld==='0'?'否':'是' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="地区" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.region }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.status==='effective'?'有效':'无效' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" fixed="right" min-width="120">
              <template slot-scope="{row}">
                <el-dropdown trigger="click" @command="handleOperate">
                  <el-button type="default" size="mini" @click.stop>更多操作<i class="el-icon-arrow-down el-icon--right" /></el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="{'operate':operate.addQuestion,'row':row}"><i class="el-icon-circle-plus-outline" />添加试题</el-dropdown-item>
                    <el-dropdown-item :command="{'operate':operate.questionSettings,'row':row}"><i class="el-icon-setting" />配置已添加试题</el-dropdown-item>
                    <el-dropdown-item :command="{'operate':operate.edit,'row':row}"><i class="el-icon-edit" />编辑</el-dropdown-item>
                    <el-dropdown-item :command="{'operate':operate.remove,'row':row}"><i class="el-icon-delete" />删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="queryForm.page" :limit.sync="queryForm.limit" @pagination="getList" />
        </el-card>
      </el-col>
    </el-row>

    <el-dialog :title="dialogTitleMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 500px; margin-left:100px;">
        <el-form-item label="问卷标题" prop="type">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="出题人" prop="type">
          <el-input v-model="temp.author" />
        </el-form-item>
        <el-form-item label="问题描述" prop="description">
          <el-input v-model="temp.description" />
        </el-form-item>
        <el-form-item label="回访类型" prop="status">
          <el-select v-model="temp.type" placeholder="---请选择---">
            <el-option label="电话回访" value="1" />
            <el-option label="书面回访" value="2" />
            <el-option label="淘宝线上回访" value="3" />
            <el-option label="官网线上回访" value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="地区" prop="description">
          <el-select v-model="temp.region" placeholder="---请选择---">
            <el-option label="北京" value="1" />
            <el-option label="上海" value="2" />
            <el-option label="深圳" value="3" />
            <el-option label="天津" value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否老年" prop="description">
          <el-select v-model="temp.isOld" placeholder="---请选择---">
            <el-option label="是" value="1" />
            <el-option label="否" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="性别" prop="description">
          <el-select v-model="temp.isOld" placeholder="---请选择---">
            <el-option label="男" value="0" />
            <el-option label="女" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="description">
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
    <el-dialog title="添加试题" :visible.sync="dialog2FormVisible">
      <el-scrollbar>
        <el-table ref="table" :key="0" v-loading="tableLoading" :data="questionTableData" max-height="400" row-key="id" stripe highlight-current-row @selection-change="selectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column label="问题类型" align="center" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column label="问题描述" align="center" min-width="500">
            <template slot-scope="scope">
              <span>{{ scope.row.description }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.status==='effective'?'有效':'无效' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="questionTotal>0" :total="questionTotal" :page.sync="queryForm.page" :limit.sync="queryForm.limit" @pagination="getQuestionList" />
      </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?create():update()">添加到试卷</el-button>
      </div>
    </el-dialog>
    <el-dialog title="已添加试题配置" :visible.sync="dialog3FormVisible">
      <el-scrollbar>
        <el-table ref="table" :key="0" v-loading="tableLoading" :data="questionTableData" max-height="400" row-key="id" stripe highlight-current-row @selection-change="selectionChange">
          <el-table-column type="index" width="55" />
          <el-table-column label="问题描述" align="center" min-width="300">
            <template slot-scope="scope">
              <span>{{ scope.row.description }}</span>
            </template>
          </el-table-column>
          <el-table-column label="选项A" align="center" min-width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.a+'  -->  '+ scope.row.aJumpTo }}<i class="row-operate-icon el-icon-setting" title="跳题" @click.stop="handleJumpQuestion()" /></span>
            </template>
          </el-table-column>
          <el-table-column label="选项B" align="center" min-width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.b+'  -->  '+ scope.row.bJumpTo }}<i class="row-operate-icon el-icon-setting" title="跳题" @click.stop="handleJumpQuestion()" /></span>
            </template>
          </el-table-column>
          <el-table-column label="选项C" align="center" min-width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.c+'  -->  '+ scope.row.cJumpTo }}<i class="row-operate-icon el-icon-setting" title="跳题" @click.stop="handleJumpQuestion()" /></span>
            </template>
          </el-table-column>
          <el-table-column label="选项D" align="center" min-width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.d+'  -->  '+ scope.row.dJumpTo }}<i class="row-operate-icon el-icon-setting" title="跳题" @click.stop="handleJumpQuestion()" /></span>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="questionTotal>0" :total="questionTotal" :page.sync="queryForm.page" :limit.sync="queryForm.limit" @pagination="getQuestionList" />
      </el-scrollbar>
    </el-dialog>
    <el-dialog title="跳题设置" :visible.sync="dialog4FormVisible">
      <el-form ref="groupSearchForm" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="问题描述">
              <el-input class="filter-item" placeholder="问题描述" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <div class="fr">
              <el-button type="primary" @click="()=>{}">查询</el-button>
              <el-button type="info" @click="resetQuery">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-scrollbar>
        <el-table ref="table" :key="0" v-loading="tableLoading" :data="questionTableData" max-height="400" row-key="id" stripe highlight-current-row @selection-change="selectionChange">
          <el-table-column type="index" width="55" />
          <el-table-column label="问题类型" align="center" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column label="问题描述" align="center" min-width="500">
            <template slot-scope="scope">
              <span>{{ scope.row.description }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.status==='effective'?'有效':'无效' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right" min-width="50">
            <template slot-scope="{row}">
              <i
                class="row-operate-icon el-icon-check"
                title="选择"
                @click.stop="()=>{
                  $message({
                    message: '操作成功',
                    type: 'success'
                  })
                  dialog4FormVisible=false
                }"
              />
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="questionTotal>0" :total="questionTotal" :page.sync="queryForm.page" :limit.sync="queryForm.limit" @pagination="getQuestionList" />
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script>
import { create, fetchList, update } from '@/api/intelligentQuestions/questionnaire'
import question from '@/api/intelligentQuestions/question'
import Pagination from '@/components/Pagination'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Question',
  components: { Pagination },
  data() {
    return {
      queryForm: {
        title: null,
        author: null,
        from: null,
        to: null,
        description: null,
        published: null,
        status: null,
        type: null,
        page: 1,
        limit: 10
      },
      tableLoading: true,
      tableData: null,
      questionTableData: null,
      total: 0,
      questionTotal: 0,
      dialogFormVisible: false,
      dialog2FormVisible: false,
      dialog3FormVisible: false,
      dialog4FormVisible: false,
      dialogStatus: '',
      dialogTitleMap: {
        create: '新建',
        update: '编辑'
      },
      operate: {
        addQuestion: 'addQuestion',
        questionSettings: 'questionSettings',
        edit: 'edit',
        remove: 'remove'
      },
      temp: {
        id: null,
        title: null,
        author: null,
        from: null,
        to: null,
        description: null,
        published: null,
        gender: null,
        isOld: null,
        status: 'effective',
        type: null,
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
    this.getQuestionList()
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
    getQuestionList() {
      this.tableLoading = true
      question.fetchList(this.queryForm).then((response) => {
        this.questionTableData = response.data.items
        this.questionTotal = response.data.total
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
        title: null,
        author: null,
        from: null,
        to: null,
        description: null,
        published: null,
        gender: null,
        isOld: null,
        status: 'effective',
        type: null,
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
    handleAddQuestion() {
      this.dialog2FormVisible = true
    },
    handleQuestionSettings() {
      this.dialog3FormVisible = true
    },
    selectionChange(rows) {
      this.selectionData = rows
    },
    handleOperate(command) { // 触发操作下拉
      if (command.operate === this.operate.addQuestion) {
        this.handleAddQuestion()
      } else if (command.operate === this.operate.questionSettings) {
        this.handleQuestionSettings()
      } else if (command.operate === this.operate.edit) {
        this.handleUpdate(command.row)
      } else if (command.operate === this.operate.remove) {
        this.handleRemove(command.row)
      }
    },
    handleJumpQuestion() {
      this.dialog4FormVisible = true
    }
  }
}
</script>
<style>
  .pagination-container {
    padding: 16px 16px !important;
    float: right;
  }
</style>
