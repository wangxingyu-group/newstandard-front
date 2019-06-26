<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <el-form ref="queryForm" :model="listQuery" label-width="100px" size="small">
              <el-row>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="用户名">
                    <el-col :span="11">
                      <el-select style="width:90%;" placeholder="请选择">
                        <el-option label=" = " value="shanghai" />
                        <el-option label=" != " value="shanghai" />
                        <el-option label="任意匹配" value="shanghai" />
                        <el-option label="头部匹配" value="shanghai" />
                        <el-option label="尾部匹配" value="shanghai" />
                        <el-option label=" > " value="shanghai" />
                        <el-option label=" < " value="shanghai" />
                      </el-select>
                    </el-col>
                    <el-col :span="2" />
                    <el-col :span="11">
                      <el-select style="width:90%;" placeholder="请选择">
                        <el-option label=" 空值 " value="shanghai" />
                      </el-select>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="IP">
                    <el-col :span="11">
                      <el-select style="width:90%;" placeholder="请选择">
                        <el-option label=" = " value="shanghai" />
                        <el-option label=" != " value="shanghai" />
                        <el-option label="任意匹配" value="shanghai" />
                        <el-option label="头部匹配" value="shanghai" />
                        <el-option label="尾部匹配" value="shanghai" />
                        <el-option label=" > " value="shanghai" />
                        <el-option label=" < " value="shanghai" />
                      </el-select>
                    </el-col>
                    <el-col :span="2" />
                    <el-col :span="11">
                      <el-select style="width:90%;" placeholder="请选择">
                        <el-option label=" 空值 " value="shanghai" />
                      </el-select>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="坐席号">
                    <el-col :span="11">
                      <el-select style="width:90%;" placeholder="请选择">
                        <el-option label=" = " value="shanghai" />
                        <el-option label=" != " value="shanghai" />
                        <el-option label="任意匹配" value="shanghai" />
                        <el-option label="头部匹配" value="shanghai" />
                        <el-option label="尾部匹配" value="shanghai" />
                        <el-option label=" > " value="shanghai" />
                        <el-option label=" < " value="shanghai" />
                      </el-select>
                    </el-col>
                    <el-col :span="2" />
                    <el-col :span="11">
                      <el-select style="width:90%;" placeholder="请选择">
                        <el-option label=" 空值 " value="shanghai" />
                      </el-select>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="登录类型">
                    <el-col :span="11">
                      <el-select style="width:90%;" placeholder="请选择">
                        <el-option label=" = " value="shanghai" />
                        <el-option label=" != " value="shanghai" />
                      </el-select>
                    </el-col>
                    <el-col :span="2" />
                    <el-col :span="11">
                      <el-select style="width:90%;" placeholder="请选择">
                        <el-option label=" 空值 " value="shanghai" />
                        <el-option label=" 用户 " value="shanghai" />
                        <el-option label=" 坐席 " value="shanghai" />
                        <el-option label=" 其他s " value="shanghai" />
                      </el-select>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="创建时间">
                    <el-col :span="11">
                      <el-date-picker v-model="listQuery.from" type="date" style="width:90%;min-width:150px" placeholder="起始日期" />
                    </el-col>
                    <el-col :span="2" />
                    <el-col :span="11">
                      <el-date-picker v-model="listQuery.to" type="date" style="width:90%;min-width:150px" placeholder="截止日期" />
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="fr">
                    <el-button type="danger" size="small">重置</el-button>
                    <el-button type="primary" size="small" @click="getList">搜索</el-button>
                    <el-button type="success" size="small" @click="handleBatchDelete">导出</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <el-table :key="tableKey" v-loading="listLoading" :height="searchRow2" :data="list" fit stripe highlight-current-row style="width: 100%;" @sort-change="sortChange" @selection-change="selectionChange">
            <el-table-column type="selection" min-width="55" />
            <el-table-column label="用户名" prop="id" sortable="custom" align="center" min-width="170">
              <template slot-scope="scope"><span>{{ scope.row.name }}</span></template>
            </el-table-column>
            <el-table-column label="IP" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.IP }}</span></template>
            </el-table-column>
            <el-table-column label="登录类型" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.status }}</span></template>
            </el-table-column>
            <el-table-column label="账户组名" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.group }}</span></template>
            </el-table-column>
            <el-table-column label="创建时间" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.datetime }}</span></template>
            </el-table-column>
            <el-table-column label="更新时间" align="center" min-width="160">
              <template slot-scope="scope"><span>{{ scope.row.datetime2 }}</span></template>
            </el-table-column>
            <el-table-column label="上次登录" align="center" min-width="160">
              <template slot-scope="scope"><span>{{ scope.row.lastAnswer }}</span></template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchList } from '@/api/systemRealTimeMessage/onlineUser'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapState } from 'vuex'

export default {
  name: 'Chart5',
  components: { Pagination },
  data() {
    return {

      tableKey: 0,
      list: null,
      selectionList: null,
      total: 0,
      listLoading: true,
      listQuery: {
        from: '',
        to: '',
        group: '',
        siteGroup: '',
        site: '',
        type: '',
        page: 1,
        limit: 10,
        sort: '+id'
      },
      temp: {// 操作时的临时对象
        id: undefined,
        name: '',
        gender: 0,
        idNo: undefined,
        callInNo: '',
        callInTime: '',
        customerType: '',
        remark: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {// 操作弹窗标题
        update: '编辑',
        create: '新建'
      },
      rules: {// 验证规则
        name: [{ required: true, message: '必填项', trigger: 'change' }],
        idNo: [{ required: true, message: '必填项', trigger: 'change' }]
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
    this.changeDate(1)
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
        name: '',
        gender: 0,
        idNo: undefined,
        callInNo: '',
        callInTime: '',
        customerType: '质检统计报表',
        remark: ''
      }
    },
    handleBatchDelete() {
      this.$confirm('确认导出选中的记录?', '提示', {
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
    changeDate(num) {
      const date = new Date()
      const startDate = new Date()
      const endDate = new Date()
      if (num === 1) { // 今日
        this.listQuery.from = date
        this.listQuery.to = date
      }
      if (num === 2) { // 昨天
        this.listQuery.from = date.setDate(date.getDate() - 1)
        this.listQuery.to = this.listQuery.from
      }
      if (num === 3) { // 本周
        this.listQuery.from = date.setDate(date.getDate() - date.getDay() + 1)
        this.listQuery.to = date.setDate(date.getDate() + 6)
      }
      if (num === 4) { // 本月
        this.listQuery.from = date.setDate(1)
        date.setMonth(date.getMonth() + 1)
        this.listQuery.to = date.setDate(date.getDate() - 1)
      }
      if (num === 5) { // 上三月
        startDate.setDate(1)
        this.listQuery.from = startDate.setMonth(date.getMonth() - 2)
        endDate.setDate(1)
        endDate.setMonth(endDate.getMonth() + 1)
        this.listQuery.to = endDate.setDate(endDate.getDate() - 1)
      }
      if (num === 6) { // 今年
        this.listQuery.from = new Date(endDate.getFullYear(), 0, 1)
        this.listQuery.to = new Date(endDate.getFullYear(), 11, 31)
      }
      if (num === 7) { // 去年
        this.listQuery.from = new Date(endDate.getFullYear() - 1, 0, 1)
        this.listQuery.to = new Date(endDate.getFullYear() - 1, 11, 31)
      }
    }
  }
}
</script>

