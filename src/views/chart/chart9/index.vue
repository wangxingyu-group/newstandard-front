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
                  <el-form-item label="坐席组">
                    <el-select v-model="listQuery.siteGroup" style="width: 100%;" placeholder="坐席组">
                      <el-option label="合计" value="1" />
                      <el-option label="信用卡单位" value="2" />
                      <el-option label="教育机构" value="3" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="坐席">
                    <el-select v-model="listQuery.site" style="width: 100%;" placeholder="坐席">
                      <el-option label="合计" value="1" />
                      <el-option label="6001" value="2" />
                      <el-option label="6002" value="3" />
                      <el-option label="6003" value="3" />
                      <el-option label="6004" value="3" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="7">
                  <el-form-item label="时间模式">
                    <el-select v-model="listQuery.type" style="width: 100%;" placeholder="时间模式">
                      <el-option label="按全部" value="1" />
                      <el-option label="按年" value="2" />
                      <el-option label="按月" value="3" />
                      <el-option label="按周" value="3" />
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
          <el-table :key="tableKey" v-loading="listLoading" :height="searchRow2" :data="list" fit stripe highlight-current-row style="width: 100%;" @sort-change="sortChange" @selection-change="selectionChange">
            <el-table-column type="selection" min-width="55" />
            <el-table-column label="坐席组" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.group }}</span></template>
            </el-table-column>
            <el-table-column label="开始时间" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.startTime }}</span></template>
            </el-table-column>
            <el-table-column label="呼入总量" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.num }}</span></template>
            </el-table-column>
            <el-table-column label="呼入接通率" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.rate }}</span></template>
            </el-table-column>
            <el-table-column label="呼入接通量" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.num }}</span></template>
            </el-table-column>
            <el-table-column label="呼入平均通话时长" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.talk }}</span></template>
            </el-table-column>
            <el-table-column label="呼入坐席平均振铃时长" align="center" min-width="250">
              <template slot-scope="scope"><span>{{ scope.row.timer_clock }}</span></template>
            </el-table-column>
            <el-table-column label="平均排队时长" align="center" min-width="250">
              <template slot-scope="scope"><span>{{ scope.row.timer_clock }}</span></template>
            </el-table-column>
            <el-table-column label="10S内接听水平" align="center" min-width="250">
              <template slot-scope="scope"><span>{{ scope.row.rate }}</span></template>
            </el-table-column>
            <el-table-column label="15S内接听水平" align="center" min-width="250">
              <template slot-scope="scope"><span>{{ scope.row.rate }}</span></template>
            </el-table-column>
            <el-table-column label="30S内接听水平" align="center" min-width="250">
              <template slot-scope="scope"><span>{{ scope.row.rate }}</span></template>
            </el-table-column>
            <el-table-column label="60S内接听水平" align="center" min-width="250">
              <template slot-scope="scope"><span>{{ scope.row.rate }}</span></template>
            </el-table-column>
            <el-table-column label="呼入通话总时长" align="center" min-width="250">
              <template slot-scope="scope"><span>{{ scope.row.talk }}</span></template>
            </el-table-column>
            <el-table-column label="呼出总量" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.num }}</span></template>
            </el-table-column>
            <el-table-column label="呼出接通量" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.timer_clock }}</span></template>
            </el-table-column>
            <el-table-column label="呼出客户平均振铃时长" align="center" min-width="250">
              <template slot-scope="scope"><span>{{ scope.row.timer_clock }}</span></template>
            </el-table-column>
            <el-table-column label="呼出平均通话时长" align="center" min-width="250">
              <template slot-scope="scope"><span>{{ scope.row.timer_clock }}</span></template>
            </el-table-column>
            <el-table-column label="呼出通话总时长" align="center" min-width="250">
              <template slot-scope="scope"><span>{{ scope.row.timer_clock }}</span></template>
            </el-table-column>
            <el-table-column label="呼入咨询量" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.num }}</span></template>
            </el-table-column>
            <el-table-column label="呼出咨询量" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.num }}</span></template>
            </el-table-column>
            <el-table-column label="呼出平均咨询时长" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.timer_clock }}</span></template>
            </el-table-column>
            <el-table-column label="呼入会议量" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.num }}</span></template>
            </el-table-column>
            <el-table-column label="话后处理量" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.num }}</span></template>
            </el-table-column>
            <el-table-column label="话后处理平均时长" align="center" min-width="250">
              <template slot-scope="scope"><span>{{ scope.row.timer_clock }}</span></template>
            </el-table-column>
            <el-table-column label="保持量" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.num }}</span></template>
            </el-table-column>
            <el-table-column label="保持时长" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.timer_clock }}</span></template>
            </el-table-column>
            <el-table-column label="放弃量" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.num }}</span></template>
            </el-table-column>
            <el-table-column label="平均放弃量" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.num }}</span></template>
            </el-table-column>
            <el-table-column label="平均放弃时长" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.timer_clock }}</span></template>
            </el-table-column>
            <el-table-column label="平均放弃率" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.rate }}</span></template>
            </el-table-column>
            <el-table-column label="呼入转接量" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.num }}</span></template>
            </el-table-column>
            <el-table-column label="呼出转接量" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.num }}</span></template>
            </el-table-column>
            <el-table-column label="呼入转接率" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.rate }}</span></template>
            </el-table-column>
            <el-table-column label="呼入咨询率" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.rate }}</span></template>
            </el-table-column>
            <el-table-column label="呼入会议率" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.rate }}</span></template>
            </el-table-column>
            <el-table-column label="保持率" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.rate }}</span></template>
            </el-table-column>
            <el-table-column label="平均应答速度" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.timer_clock }}</span></template>
            </el-table-column>
            <el-table-column label="平均话务处理时长" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.timer_clock }}</span></template>
            </el-table-column>
            <el-table-column label="平均振铃次数" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.num }}</span></template>
            </el-table-column>
            <el-table-column label="评价语音播放次数" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.num }}</span></template>
            </el-table-column>
            <el-table-column label="评价放音比例" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.rate }}</span></template>
            </el-table-column>
            <el-table-column label="评价数量" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.num }}</span></template>
            </el-table-column>
            <el-table-column label="评价比率" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.rate }}</span></template>
            </el-table-column>
            <el-table-column label="评价健1比例" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.rate }}</span></template>
            </el-table-column>
            <el-table-column label="评价健2比例" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.rate }}</span></template>
            </el-table-column>
            <el-table-column label="评价健3比例" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.rate }}</span></template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchList } from '@/api/demo/chart/chart9'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapState } from 'vuex'

export default {
  name: 'Chart9',
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

