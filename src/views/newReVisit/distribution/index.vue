<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <el-form ref="queryForm" :model="listQuery" label-width="100px" size="small">
              <el-row>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="销售渠道">
                    <el-select v-model="listQuery.channel">
                      <el-option v-for="(item, index) in channelList" :key="index" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="销售方式">
                    <el-select v-model="listQuery.sellType">
                      <el-option v-for="(item, index) in sellTypes" :key="index" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="代理机构">
                    <el-select v-model="listQuery.agent">
                      <el-option v-for="(item, index) in agents" :key="index" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="分支机构">
                    <el-select v-model="listQuery.agent">
                      <el-option v-for="(item, index) in agents" :key="index" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="保单号">
                    <el-input v-model="listQuery.policyNo" placeholder="保单号" class="filter-item" @keyup.enter.native="handleFilter" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="险种类型">
                    <el-select v-model="listQuery.risk">
                      <el-option v-for="(item, index) in risks" :key="index" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="签单日期">
                    <el-col :span="11">
                      <el-date-picker v-model="listQuery.from" type="date" style="width:100%;min-width:135px" placeholder="" />
                    </el-col>
                    <el-col :span="11">
                      <el-date-picker v-model="listQuery.to" type="date" style="width:100%;min-width:135px" placeholder="" />
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="客户签单日期">
                    <el-col :span="11">
                      <el-date-picker v-model="listQuery.cusfrom" type="date" style="width:100%;min-width:135px" placeholder="" />
                    </el-col>
                    <el-col :span="11">
                      <el-date-picker v-model="listQuery.custo" type="date" style="width:100%;min-width:135px" placeholder="" />
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="">
                    <div class="fr">
                      <el-button type="primary" size="small" @click="handleCreate">新增</el-button>
                      <el-button type="info" size="small" @click="clearList">清空</el-button>
                      <el-button type="primary" size="small" @click="handleFilter">查询</el-button>
                      <el-button type="primary" size="small" @click="handleBatchDelete">批量删除</el-button>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <el-table :key="tableKey" v-loading="listLoading" :height="searchRow1" style="min-height: 300px;" :data="list" fit stripe highlight-current-row @selection-change="selectionChange">
            <el-table-column type="selection" min-width="55" />
            <el-table-column label="签单日期" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.signDate }}</span></template>
            </el-table-column>
            <el-table-column label="保单号" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.policyNo }}</span></template>
            </el-table-column>
            <el-table-column label="客户签收日期" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.customSignDate }}</span></template>
            </el-table-column>
            <el-table-column label="回单日期" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.receiptDate }}</span></template>
            </el-table-column>
            <el-table-column label="承保日期" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.contractedDate }}</span></template>
            </el-table-column>
            <el-table-column label="产品名称(主/附)" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.productName }}</span></template>
            </el-table-column>
            <el-table-column label="保费" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.prem }}</span></template>
            </el-table-column>
            <el-table-column label="投保人姓名" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.appName }}</span></template>
            </el-table-column>
            <el-table-column label="犹豫期剩余天数" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.days }}</span></template>
            </el-table-column>
            <el-table-column label="销售渠道" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.channel }}</span></template>
            </el-table-column>
            <el-table-column label="保单状态" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.status }}</span></template>
            </el-table-column>
            <el-table-column label="呼叫结果" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.result }}</span></template>
            </el-table-column>
            <el-table-column label="操作次数" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.count }}</span></template>
            </el-table-column>
            <el-table-column label="最后一次呼叫时间" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.lastDateTime }}</span></template>
            </el-table-column>
            <el-table-column label="回访坐席号" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.number }}</span></template>
            </el-table-column>
            <el-table-column label="操作" align="center" fixed="right" width="100">
              <template slot-scope="{row}">
                <el-button type="primary" size="mini" @click="handleUpdate(row)">
                  修改
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 500px; margin-left:80px;">
        <el-form-item label="保单号" prop="policyNo">
          <el-input v-model="temp.policyNo" />
        </el-form-item>
        <el-form-item label="投保人姓名" prop="appName">
          <el-input v-model="temp.appName" />
        </el-form-item>
        <el-form-item label="产品名称" prop="productName">
          <el-input v-model="temp.productName" />
        </el-form-item>
        <el-form-item label="销售渠道" prop="channel">
          <el-select v-model="temp.channel">
            <el-option v-for="(item, index) in channelList" :key="index" :label="item.name" :value="item.id" />
          </el-select>
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
import { fetchList, createDistribution, updateDistribution } from '@/api/newReVisit/distribution/distribution'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapState } from 'vuex'

export default {
  name: 'Distribution',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      selectionList: null,
      listQuery: {
        channel: 1,
        sellType: '11',
        agent: '19',
        policyNo: '',
        cusfrom: '',
        custo: '',
        from: '',
        to: '',
        risk: '01',
        idcard: '',
        outNo: '', // 外呼服务单号
        page: 1,
        limit: 10
      },
      channelList: [{ id: 1, name: '经代' }, { id: 2, name: '网销' }, { id: 3, name: '直销' }, { id: 4, name: '银行代理' }],
      sellTypes: [{ id: '01', name: '业务员' }, { id: '07', name: '官网销售' }, { id: '11', name: '中介' }, { id: '19', name: '微信销售' }],
      agents: [{ id: '01', name: '惠泽' }, { id: '07', name: '北京分公司' }, { id: '11', name: '淘宝' }, { id: '19', name: '苏宁' }],
      risks: [{ id: '01', name: '保障险' }, { id: '02', name: '投连险' }, { id: '03', name: '万能险' }],
      temp: {// 操作时的临时对象
        id: undefined,
        signDate: '',
        policyNo: '',
        customSignDate: '',
        receiptDate: '',
        contractedDate: '',
        productName: '',
        prem: '',
        appName: '',
        days: '',
        channel: '',
        status: '',
        result: '',
        count: ''
      },
      dialogFormVisible: false, // dictionary弹窗的标志
      textMap: {// 操作弹窗标题
        update: '编辑',
        create: '新建'
      },
      rules: {// 验证规则
        dictionaryType: [{ required: true, message: '必填项', trigger: 'change' }],
        dictionaryName: [{ required: true, message: '必填项', trigger: 'change' }]
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
    resetTemp() {
      this.temp = {
        id: undefined,
        signDate: '',
        policyNo: '',
        customSignDate: '',
        receiptDate: '',
        contractedDate: '',
        productName: '',
        prem: '',
        appName: '',
        days: '',
        channel: '',
        status: '',
        result: '',
        count: ''
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
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024
          createDistribution(this.temp).then(() => {
            this.total = this.list.unshift(this.temp) // 返回长度
            this.dialogFormVisible = false
            this.$message({
              message: '创建成功',
              type: 'success'
            })
          })
        }
      })
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
    selectionChange(val) {
      this.selectionList = val
    },
    handleBatchDelete() {
      this.$confirm('确认删除选中的记录?', '提示', {
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
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateDistribution(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
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
    clearList() {
      this.list = []
    }
  }
}
</script>

<style>
</style>
