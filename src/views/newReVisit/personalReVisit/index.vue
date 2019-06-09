<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <el-form ref="queryForm" :model="listQuery" label-width="100px" size="small">
              <el-row>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="分配时间" label-width="140px">
                    <el-col :span="12">
                      <el-date-picker v-model="listQuery.from" type="date" style="width:100%;min-width:135px" placeholder="起始时间" />
                    </el-col>
                    <el-col :span="12">
                      <el-date-picker v-model="listQuery.to" type="date" style="width:100%;min-width:135px" placeholder="截止时间" />
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8" label-width="140px">
                  <el-form-item label="是否有约">
                    <el-select v-model="listQuery.appoint" placeholder="---请选择---">
                      <el-option v-for="(item, index) in appoints" :key="index" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="7">
                  <el-form-item label="保单号">
                    <el-input v-model="listQuery.policyNo" placeholder="保单号" class="filter-item" @keyup.enter.native="handleFilter" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="回访状态" label-width="140px">
                    <el-select v-model="listQuery.reVisit" placeholder="---请选择---">
                      <el-option v-for="(item, index) in reVisits" :key="index" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="拨打次数">
                    <el-select v-model="listQuery.number" placeholder="---请选择---">
                      <el-option v-for="(item, index) in numbers" :key="index" :label="item" :value="item" />
                    </el-select>
                  </el-form-item>
                </el-col>

              </el-row>
              <el-row>
                <el-col :sm="12" :lg="8" style="align:right" class="fr">
                  <div class="fr">
                    <el-button type="primary" size="small" @click="handleFilter">查询</el-button>
                    <el-button type="info" size="small" @click="clearList">清空</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <el-table :key="tableKey" v-loading="listLoading" :height="searchRow1" style="min-height: 300px;" :data="list" fit stripe highlight-current-row @selection-change="selectionChange">
            <el-table-column type="selection" min-width="55" />
            <el-table-column label="保单号" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.policyNo }}</span></template>
            </el-table-column>
            <el-table-column label="签单日期" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.signDate }}</span></template>
            </el-table-column>
            <el-table-column label="投保人编号" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.appntno }}</span></template>
            </el-table-column>
            <el-table-column label="回访结果" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.reVisit }}</span></template>
            </el-table-column>
            <el-table-column label="工单状态" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.status }}</span></template>
            </el-table-column>
            <el-table-column label="描述" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.describe }}</span></template>
            </el-table-column>
            <el-table-column label="保单状态" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.status }}</span></template>
            </el-table-column>
            <el-table-column label="最后一次呼叫时间" align="center" min-width="220">
              <template slot-scope="scope"><span>{{ scope.row.lastDateTime }}</span></template>
            </el-table-column>
            <el-table-column label="是否预约" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.orderflag }}</span></template>
            </el-table-column>
            <el-table-column label="预约时间" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.orderdate }}</span></template>
            </el-table-column>
            <el-table-column label="呼叫次数" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.fbcount }}</span></template>
            </el-table-column>
            <el-table-column label="是否多单" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.ismany }}</span></template>
            </el-table-column>
            <el-table-column label="备注" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.examnote }}</span></template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchList } from '@/api/newReVisit/personalReVisit/personalReVisit'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapState } from 'vuex'

export default {
  name: 'PersonalReVisit',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      selectionList: null,
      appoints: [{ id: 1, name: '是' }, { id: 2, name: '否' }],
      reVisits: [{ id: 1, name: '1-暂存' }, { id: 10, name: '10-已分配' }, { id: 2, name: '2-问题件' }, { id: 2, name: '3-信函件' }],
      numbers: [1, 2, 3, 4, 5],
      listQuery: {
        number: '',
        reVisit: '',
        appoint: '',
        mobile: '',
        idcard: '',
        from: '',
        to: '',
        result: '',
        policyNo: '',
        type: '',
        page: 1,
        limit: 10
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
    handleBatchSubmit() {
      this.$confirm('确认提交选中的记录?', '提示', {
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
    clearList() {
      this.list = []
    }
  }
}
</script>

<style>
  .customWidth{
    width: 1000px;
    height: 580px;
    top: -50px;
  }
</style>
