<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="box-card">
          <el-tree
            :data="data"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :default-checked-keys="[0]"
            style=" height: 80vh;"
            @node-click="handleNodeClick"
          />
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card class="box-card">
          <div class="filter-container">
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
              添加
            </el-button>
            <el-button class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-close" @click="handleBatchDelete">
              删除
            </el-button>
          </div>
          <el-table :key="0" :data="tableData" row-key="id" fit stripe highlight-current-row style="width: 100%;height: 80vh;">
            <el-table-column type="selection" width="55" />
            <el-table-column label="编号" align="center">
              <template slot-scope="scope"><span>{{ scope.row.id }}</span></template>
            </el-table-column>
            <el-table-column label="名称" align="center">
              <template slot-scope="scope"><span>{{ scope.row.label }}</span></template>
            </el-table-column>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="handleUpdate(row)">
                  编辑
                </el-button>
                <el-button type="danger" size="small" @click="handleDelete(row)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>

const id = 1000

export default {
  data() {
    const data = [{
      id: 11,
      label: '服务项目明细',
      children: [{
        id: 14,
        label: '产品咨询',
        children: [{
          id: 9,
          label: '险种名称'
        }, {
          id: 10,
          label: '咨询要点'
        }]
      },
      {
        id: 12,
        label: '一般咨询',
        children: [{
          id: 91,
          label: '核保查询'
        }, {
          id: 1120,
          label: '承保咨询'
        }]
      }, {
        id: 1231,
        label: '保全咨询'
      }, {
        id: 12232,
        label: '系统问题'
      }, {
        id: 1212331,
        label: '理赔报案'
      }, {
        id: 1212,
        label: '投诉建议'
      }, {
        id: 121212,
        label: '其他'
      }]
    }]
    const tableData = []
    return {
      data: JSON.parse(JSON.stringify(data)),
      tableData: tableData
    }
  },
  methods: {
    handleNodeClick(data) {
      this.tableData = data.children
    }
  }
}
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
