<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <el-form ref="queryForm" :model="listQuery" label-width="100px" size="small">
              <el-row>
                <el-col :sm="12" :lg="9">
                  <el-button-group style="float: right">
                    <el-button type="primary" size="small" plain @click="changeDate(1)">今日</el-button>
                    <el-button type="primary" size="small" plain @click="changeDate(2)">昨天</el-button>
                    <el-button type="primary" size="small" plain @click="changeDate(3)">本周</el-button>
                    <el-button type="primary" size="small" plain @click="changeDate(4)">本月</el-button>
                    <el-button type="primary" size="small" plain @click="changeDate(5)">上三月</el-button>
                    <el-button type="primary" size="small" plain @click="changeDate(6)">今年</el-button>
                    <el-button type="primary" size="small" plain @click="changeDate(7)">去年</el-button>
                  </el-button-group>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="查询日期">
                    <el-col :span="11">
                      <el-date-picker v-model="listQuery.from" type="date" style="width:100%;min-width:135px" placeholder="起始日期" />
                    </el-col>
                    <el-col style="text-align: center" :span="2">-</el-col>
                    <el-col :span="11">
                      <el-date-picker v-model="listQuery.to" type="date" style="width:100%;min-width:135px" placeholder="截止日期" />
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="7">
                  <el-form-item label="选择团队">
                    <el-select v-model="listQuery.group" style="width: 100%;" placeholder="选择团队">
                      <el-option label="测试" value="1" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="9">
                  <el-form-item label="对象">
                    <el-select v-model="listQuery.siteGroup" style="width: 100%;" placeholder="对象">
                      <el-option label="坐席" value="1" />
                      <el-option label="分机" value="2" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="坐席组名">
                    <el-select v-model="listQuery.siteGroup" style="width: 100%;" placeholder="坐席组名">
                      <el-option label="全部" value="1" />
                      <el-option label="广发信用卡" value="2" />
                      <el-option label="海峰教育" value="3" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="7">
                  <el-form-item label="坐席名">
                    <el-select v-model="listQuery.siteGroup" style="width: 100%;" placeholder="坐席名">
                      <el-option label="全部" value="1" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="fr">
                    <el-button type="primary" size="small" @click="getList">查询</el-button>
                    <el-button type="success" size="small" @click="handleBatchDelete">导出</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <el-table
            :key="tableKey"
            v-loading="listLoading"
            :summary-method="getSummaries"
            show-summary
            :height="searchRow2"
            :data="list"
            fit
            stripe
            highlight-current-row
            style="width: 100%;"
          >
            <el-table-column label="坐席工号" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.setId }}</span></template>
            </el-table-column>
            <el-table-column label="坐席组名" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.group }}</span></template>
            </el-table-column>
            <el-table-column label="坐席名" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.mark }}</span></template>
            </el-table-column>
            <el-table-column label="主叫号码" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.callInNo }}</span></template>
            </el-table-column>
            <el-table-column label="被叫号码" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.callOutNo }}</span></template>
            </el-table-column>
            <el-table-column label="开始时间" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.startTime }}</span></template>
            </el-table-column>
            <el-table-column label="结束时间" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.endTime }}</span></template>
            </el-table-column>
            <el-table-column label="IVR时长" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.timer_clock }}</span></template>
            </el-table-column>
            <el-table-column label="排队时长" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.timer_clock }}</span></template>
            </el-table-column>
            <el-table-column label="振铃时长" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.timer_clock }}</span></template>
            </el-table-column>
            <el-table-column label="通话时长" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.talk }}</span></template>
            </el-table-column>
            <el-table-column label="总时长" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.talk }}</span></template>
            </el-table-column>
            <el-table-column label="结束状态" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.status }}</span></template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchList } from '@/api/demo/chart/chart8'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapState } from 'vuex'

export default {
  name: 'Chart8',
  components: { Pagination },
  data() {
    return {

      tableKey: 0,
      list: null,
      selectionList: null,
      total: 0,
      listLoading: true,
      totalList: [{ num: 1 }],
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
    },
    getSummaries(param) {
      const { columns } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        if (index === 7) { // 总振铃时长
          sums[index] = '00:12:34'
          return
        }
        if (index === 8) { // 总通话时长
          sums[index] = '00:24:22'
          return
        }
        if (index === 9) { // 总时长
          sums[index] = '00:24:22'
          return
        }
        if (index === 10) { // 总时长
          sums[index] = '00:33:22'
          return
        }
        if (index === 11) { // 总时长
          sums[index] = '00:33:22'
          return
        }
      })
      return sums
    }
  }
}
</script>

