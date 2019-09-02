<template>
  <div class="app-container">
    <el-row :gutter="5">
      <el-col :span="4">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="card-title-without-option">知识库</span>
          </div>
          <el-scrollbar ref="treeScrollbar" wrap-class="scrollbar-wrapper">
            <el-tree
              ref="tree"
              v-loading="listLoading"
              class="fit-height-211"
              node-key="id"
              highlight-current
              default-expand-all
              :data="treeData"
              :expand-on-click-node="false"
              @node-click="handleNodeClick"
            />
          </el-scrollbar>
        </el-card>
      </el-col>
      <el-col :span="20">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-form ref="form" :model="listQuery" label-width="100px" size="small">
              <el-row>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="当前选择项" label-width="130px">
                    <el-input v-model="displayLabel" :disabled="false" placeholder="当前选择项" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="查询条件">
                    <el-input v-model="listQuery.name" :disabled="false" placeholder="查询条件" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="fr">
              <el-button type="success" size="mini" @click="getDetail">查询</el-button>
              <el-button type="danger" size="mini" @click="handleBatchDelete">批量删除</el-button>
            </div>
          </div>
          <el-scrollbar ref="tableScrollbar" wrap-class="scrollbar-wrapper">
            <div class="fit-height-211">
              <el-table ref="table" :key="tableKey" :data="detailList" row-key="id" :height="searchRow1" stripe highlight-current-row @selection-change="selectionChange" @row-click="toggleSelection">
                <el-table-column type="selection" min-width="55" />
                <el-table-column label="编号" align="center" min-width="80">
                  <template slot-scope="scope"><span>{{ scope.row.id }}</span></template>
                </el-table-column>
                <el-table-column label="题名" align="center" min-width="150">
                  <template slot-scope="scope"><span>{{ scope.row.title }}</span></template>
                </el-table-column>
                <el-table-column label="作者" align="center" min-width="100">
                  <template slot-scope="scope"><span>{{ scope.row.author }}</span></template>
                </el-table-column>
                <el-table-column label="发表时间" align="center" min-width="180">
                  <template slot-scope="scope"><span>{{ scope.row.time }}</span></template>
                </el-table-column>
                <el-table-column label="下载" align="center" min-width="80">
                  <template slot-scope="scope"><span>{{ scope.row.download }}</span></template>
                </el-table-column>
                <el-table-column label="操作" align="center" fixed="right" min-width="180">
                  <template slot-scope="{row}">
                    <el-button type="warning" icon="el-icon-star-off" circle />
                    <el-button type="success" icon="el-icon-download" circle />
                    <el-button type="success" icon="el-icon-tickets" circle />
                    <el-button type="danger" icon="el-icon-delete" circle @click="handleDelete(row)" />
                  </template>
                </el-table-column>
              </el-table>
              <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
            </div>
          </el-scrollbar>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 500px; margin-left:100px;">
        <el-form-item label="编号" prop="id">
          <el-input v-model="temp.id" :readonly="dialogStatus!=='create'" />
        </el-form-item>
        <el-form-item label="名称" prop="label">
          <el-input v-model="temp.label" />
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
import { createServiceDetails, fetchList, updateServiceDetails, fetchServiceDetails } from '@/api/knowledgeBase/knowledgeBase'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapState } from 'vuex'
export default {
  name: 'KnowledgeBase',
  components: { Pagination },
  data() {
    return {
      treeData: null, // tree数据
      selectionTreeList: null,
      currentNode: null, // tree当前选中节点
      displayLabel: '', // 节点显示信息
      tableKey: 0,
      detailList: [],
      tableData: [], // table数据
      selectionTableList: null,
      total: 0,
      listLoading: true,
      listQuery: {
        name: '',
        page: 1,
        limit: 10
      },
      temp: {// 操作时的临时对象
        id: undefined,
        label: ''
      },
      dialogFormVisible: false,
      dialogStatus: '', // create或者update
      textMap: {// 操作弹窗标题
        update: '编辑',
        create: '新建'
      },
      rules: {// 验证规则
        id: [
          { required: true, message: '必填项', trigger: 'change' },
          { pattern: /\w{1,5}/, message: '只能输入数字', trigger: 'change' }
        ],
        label: [{ required: true, message: '必填项', trigger: 'change' }]
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
    this.getDetail()
  },
  mounted() {
  },
  methods: {
    getDetail() {
      this.listLoading = true
      fetchServiceDetails(this.listQuery).then((response) => {
        this.detailList = response.data.items
        this.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
          this.$refs.treeScrollbar.update()
        }, 0)
      })
    },
    getList() { // 初始化数据
      this.listLoading = true
      fetchList(this.listQuery).then((response) => {
        this.treeData = response.data.items
        this.currentNode = this.treeData[0]
        this.displayLabel = this.treeData[0].label
        this.tableData = this.treeData[0].children.reduce((tableData, current) => {
          tableData.push({ id: current.id, parentId: current.parentId, label: current.label })
          return tableData
        }, [])
        setTimeout(() => {
          this.listLoading = false
          this.$refs.treeScrollbar.update()
        }, 0)
      })
    },
    handleNodeClick(data) { // tree节点选中事件
      this.currentNode = data
      this.displayLabel = data.label
      if (data.children) {
        this.tableData = data.children.reduce((tableData, current) => {
          tableData.push({ id: current.id, parentId: current.parentId, label: current.label })
          return tableData
        }, [])
      } else {
        this.tableData = null
      }
    },
    resetTemp() {
      this.temp = {
        parentId: undefined,
        id: undefined,
        label: '',
        level: undefined
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
    createData() { // 新建table数据,关联tree
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.parentId = this.currentNode.id
          this.temp.parentLabel = this.currentNode.label
          this.temp.level = this.currentNode.level + 1
          createServiceDetails(this.temp).then(() => {
            if (this.tableData) {
              this.tableData.unshift(this.temp)
            } else {
              this.tableData = []
              this.tableData.unshift(this.temp)
            }
            if (!this.currentNode.children) {
              this.$set(this.currentNode, 'children', [])
            }
            this.currentNode.children.unshift(this.temp)
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
      this.$refs.table.clearSelection()
      this.$refs.table.setCurrentRow(row)
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() { // 更新table数据,关联tree
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateServiceDetails(tempData).then(() => {
            for (const v of this.tableData) {
              if (v.id === this.temp.id) {
                const index = this.tableData.indexOf(v)
                this.tableData.splice(index, 1, this.temp)
                this.update(this.treeData[0], this.temp.id, this.temp)
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
    handleDelete(row) { // 单个删除
      this.$refs.table.clearSelection()
      this.$refs.table.setCurrentRow(row)
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
    handleBatchDelete() { // 批量删除
      this.$confirm('确认删除选中的记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.selectionTableList.forEach((row) => {
          this.tableData.splice(this.tableData.indexOf(row), 1)
          this.remove(this.treeData[0], row.id)
        })
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
    },
    selectionChange(rows) {
      this.selectionTableList = rows
    },
    toggleSelection(row) {
      if (row) {
        this.$refs.table.toggleRowSelection(row)
      } else {
        this.$refs.table.clearSelection()
      }
    },
    update(node, id, temp) { // 更新tree节点
      if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          if (node.children[i].id === id) {
            node.children[i].label = temp.label
            return
          } else {
            this.update(node.children[i], id, temp)
          }
        }
      }
    },
    remove(node, id) { // 删除tree节点
      if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          if (node.children[i].id === id) {
            node.children.splice(i, 1)
            return
          } else {
            this.remove(node.children[i], id)
          }
        }
      }
    }
  }
}
</script>
