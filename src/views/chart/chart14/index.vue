<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <el-form ref="queryForm" :model="listQuery" label-width="100px" size="small">
              <el-row>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="选择团队">
                    <el-select v-model="listQuery.group" style="width: 100%;" placeholder="选择团队">
                      <el-option label="测试" value="1" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="坐席组">
                    <el-drag-select v-model="listQuery.siteGroup" multiple style="width: 100%;" placeholder="坐席组">
                      <el-option label="信用卡单位" value="1" />
                      <el-option label="教育机构" value="2" />
                    </el-drag-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="坐席">
                    <el-drag-select v-model="listQuery.site" multiple style="width: 100%;" placeholder="坐席">
                      <el-option label="6001" value="1" />
                      <el-option label="6002" value="2" />
                      <el-option label="6003" value="3" />
                      <el-option label="6004" value="4" />
                      <el-option label="6005" value="5" />
                      <el-option label="6006" value="6" />
                      <el-option label="6007" value="7" />
                    </el-drag-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="统计类型">
                    <el-col :span="11">
                      <el-select v-model="listQuery.tys" style="width: 100%;" placeholder="选择类型">
                        <el-option v-for="(item,index) in StatisticalTypes" :key="index" :value="index" :label="item.name" />
                      </el-select>
                    </el-col>
                    <el-col style="text-align: center" :span="2">-</el-col>
                    <el-col :span="11">
                      <el-select v-model="listQuery.sa" style="width: 100%;" placeholder="类型名称">
                        <el-option v-for="(item) in sysType" :key="item" :value="item" :label="item" />
                      </el-select>
                    </el-col>
                  </el-form-item>
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
                <el-col :sm="12" :lg="8">
                  <el-form-item label="表现形式">
                    <el-select v-model="chartType" style="width: 100%;" placeholder="表现形式">
                      <el-option label="直线图" value="line" />
                      <el-option label="柱形图" value="bar" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="fr">
                    <el-button type="primary" size="small" @click="getList">查询</el-button>
                    <el-button type="success" size="small" @click="getList">下载</el-button>
                    <el-select v-model="chartTypea" style="width: 30%;" placeholder="下载格式">
                      <el-option label="html" value="line" />
                      <el-option label="Img" value="bar" />
                    </el-select>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div>
            <line-chart :chart-data="lineChartData" :chart-type="chartType" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ElDragSelect from '@/components/DragSelect' // base on element-ui
import { fetchList } from '@/api/demo/chart/chart10'
import LineChart from '../chart13/LineChart'
const lineChartData = {
  preCustomer: {
    voiceData: [100, 120, 161, 134, 105, 160, 165],
    onlineData: [120, 82, 91, 154, 162, 140, 145],
    inData: [88, 130, 120, 90, 120, 80, 150],
    talk: [50, 33, 32, 77, 87, 60, 44]
  }
}

export default {
  name: 'Chart13',
  components: { LineChart, ElDragSelect },
  data() {
    return {
      lineChartData: lineChartData.preCustomer,
      chartTypea: '',
      tableKey: 0,
      list: null,
      selectionList: null,
      StatisticalTypes: [{ name: '工作时长', value: ['置忙总时长', '咨询总时长', '保持时长', '呼入总时长', '呼入通话时长'] },
        { name: '话务量', value: ['呼入应答量', '外呼话务量', '呼入话务量', '外呼应答量', '总话务量', '总应答量'] },
        { name: '工作率', value: ['呼入应答率', '呼入转接率', '呼入咨询率', '呼出接通率', '呼入接通率'] },
        { name: '平均时长', value: ['呼入平均放弃时长', '呼入平均放弃时长', '呼入平均通话时长', '呼出平均通话时长', '呼入平均振铃时长'] }],
      sysType: [],
      total: 0,
      listLoading: true,
      totalList: [{ num: 1 }],
      chartType: 'bar',
      listQuery: {
        tys: '',
        from: '',
        to: '',
        group: '',
        sa: '',
        siteGroup: ['1', '2'],
        site: ['3', '5'],
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
      }
    }
  },
  watch: {
    listQuery: {
      deep: true,
      handler(val) {
        this.sysType = this.StatisticalTypes[val.tys ].value
        this.listQuery.sa = this.sysType[0]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
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
    }
  }
}
</script>
