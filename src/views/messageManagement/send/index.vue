<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :sm="24" :lg="8">
        <el-card>
          <div slot="header" class="clearfix">
            <span>电话列表</span>
          </div>
          <el-row :gutter="10">
            <el-col :span="16">
              <el-input v-model="customerName" placeholder="输入客户姓名" class="filter-item" @keyup.enter.native="()=>{}" />
            </el-col>
            <el-col :span="4">
              <el-button type="primary">查询</el-button>
            </el-col>
            <el-col :span="4">
              <el-button type="primary">确认</el-button>
            </el-col>
          </el-row>
          <el-table :key="0" v-loading="listLoading" height="calc(100vh - 311px)" :data="list" fit stripe highlight-current-row @sort-change="()=>{}" @selection-change="()=>{}">
            <el-table-column type="selection" width="55" />
            <el-table-column label="客户姓名" prop="id" sortable="custom" align="center">
              <template slot-scope="scope"><span>{{ scope.row.name }}</span></template>
            </el-table-column>
            <el-table-column label="客户电话" prop="id" sortable="custom" align="center">
              <template slot-scope="scope"><span>{{ scope.row.callInNo }}</span></template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </el-card>
      </el-col>
      <el-col :sm="24" :lg="16">
        <send :form="form" :template="template" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { fetchList } from '@/api/demo/customer/preCustomer'
import Pagination from '@/components/Pagination'
import Send from './send'

export default {
  name: 'SendIndex',
  components: { Pagination, Send },
  data() {
    return {
      customerName: null,
      listLoading: false,
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
      },
      form: {
        sendNo: null,
        template: null,
        content: null
      },
      template: [
        { label: '投保短信', value: '0' },
        { label: '模版一', value: '1' },
        { label: '模版二', value: '2' },
        { label: '模版三', value: '3' },
        { label: '模版四', value: '4' },
        { label: '模版五', value: '5' }
      ]
    }
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
    }
  }
}
</script>

