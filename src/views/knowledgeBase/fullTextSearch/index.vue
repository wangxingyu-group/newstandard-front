<template>
  <div class="app-container">
    <sticky :z-index="10">
      <el-card>
        <el-form ref="queryForm" :inline="true" :model="query" label-width="120px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="">
                <el-input v-model="search" placeholder="全文检索" style="width: 600px;" :clearable="true" />
              </el-form-item>
              <el-button type="primary" icon="fa fa-search" circle title="查询" @click="()=>{}" />
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </sticky>
    <el-card class="mt-10">
      <el-table :data="tableData" style="width: 100%" :show-header="false" fit stripe highlight-current-row @row-click="rowClick">
        <el-table-column label="日期" min-width="100%">
          <template slot-scope="scope">
            <h2 style="color: #1890ff"><span class="mr-10">{{ scope.row.id }}.</span><span>{{ scope.row.title }}</span></h2>
            <el-tag type="info"><i class="fa fa-user-o" /><span style="margin-left: 10px">{{ scope.row.author }}</span></el-tag>
            <el-tag type="info"><i class="fa fa-clock-o" /><span style="margin-left: 10px">{{ scope.row.createTime }}</span></el-tag>
            <p style="text-indent:2em;border-bottom: 1px solid #e6ebf5;padding-bottom: 10px;">{{ scope.row.context+'。。。。。' }}</p>
            <span style="color: #1890ff">{{ scope.row.fileName+scope.row.ext }}</span><i class="fa fa-download ml-10" style="cursor: pointer"/>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="pagination.total>0" :total="pagination.total" :page.sync="pagination.page" :limit.sync="pagination.limit" :page-sizes="[10, 50, 100]" @pagination="queryList" />
    </el-card>
  </div>
</template>

<script>
import { search } from '@/api/knowledgeBase/fullTextSearch'
import Sticky from '@/components/Sticky'
import Pagination from '@/components/Pagination'
export default {
  name: 'StickyDemo',
  components: { Sticky, Pagination },
  data() {
    return {
      query: {},
      search: null,
      operateSM: 24,
      operateLG: 24,
      tableLoading: true,
      tableData: [],
      selectedRow: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.queryList()
    })
  },
  methods: {
    queryList() { // 初始化数据
      this.tableLoading = true
      search(this.pagination).then((response) => {
        this.tableData = response.data.list
        this.pagination.total = response.data.total
        // 模拟延迟
        setTimeout(() => {
          this.tableLoading = false
        }, 0.5 * 1000)
      })
    },
    rowClick(row, column, event) {
    }
  }
}
</script>

