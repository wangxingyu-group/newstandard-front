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
        <sticky :z-index="10">
          <el-card>
            <el-form ref="queryForm" :inline="true" :model="query" label-width="120px">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="">
                    <el-input v-model="search" placeholder="全文检索" style="width: 600px;" :clearable="true" />
                  </el-form-item>
                  <el-button type="primary" icon="fa fa-search" circle title="查询" @click="goToSearch" />
                </el-col>
              </el-row>
            </el-form>
          </el-card>
        </sticky>
        <el-row :gutter="10" class="mt-10">
          <el-col :span="8">  <el-card class="mt-10">
            <div slot="header">
              日点击排行
            </div>
            <div style="min-height: 200px;">
              1.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              2.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              3.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              4.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              5.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              6.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              7.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              8.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
            </div>
          </el-card></el-col>
          <el-col :span="8">  <el-card class="mt-10">
            <div slot="header">
              周点击排行
            </div>
            <div style="min-height: 200px;">
              1.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              2.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              3.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              4.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              5.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              6.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              7.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              8.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
            </div>
          </el-card></el-col>
          <el-col :span="8">  <el-card class="mt-10">
            <div slot="header">
              最新上传
            </div>
            <div style="min-height: 200px;">
              1.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              2.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              3.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              4.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              5.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              6.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              7.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              8.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
            </div>
          </el-card></el-col>
        </el-row>
        <el-row :gutter="10" class="mt-10">
          <el-col :span="8">  <el-card class="mt-10">
            <div slot="header">
              最新知识
            </div>
            <div style="min-height: 200px;">
              1.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              2.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              3.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              4.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              5.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              6.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              7.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              8.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
            </div>
          </el-card></el-col>
          <el-col :span="8">  <el-card class="mt-10">
            <div slot="header">
              收藏排行
            </div>
            <div style="min-height: 200px;">
              1.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              2.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              3.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              4.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              5.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              6.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              7.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
              8.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
            </div>
          </el-card></el-col>
        </el-row>
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
import { search } from '@/api/knowledgeBase/fullTextSearch'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapState } from 'vuex'
export default {
  name: 'KnowledgeBase',
  components: { Pagination },
  data() {
    return {
      search: null,
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
      query: {
        name: '',
        page: 1,
        limit: 10
      },
      pagination: {
        page: 1,
        limit: 10,
        total: 0
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
        search(this.pagination).then((response) => {
          this.tableData = response.data.list
          this.pagination.total = response.data.total
          // 模拟延迟
          setTimeout(() => {
            this.tableLoading = false
          }, 0.5 * 1000)
        })
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
    },
    rowClick(row, column, event) {
    },
    goToSearch() {
      this.$router.push('/knowledgeBase/fullTextSearch')
    }
  }
}
</script>
