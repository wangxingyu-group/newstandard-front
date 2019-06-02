<template>
  <el-scrollbar ref="scrollbar" wrap-class="scrollbar-wrapper">
    <div class="fit-height-200">
      <el-card>
        <div slot="header" class="clearfix">
          <span>当前账户价值</span>
        </div>
        <el-row>
          <el-col :span="24">
            <el-table ref="currentAccountValueTable" height="264" :data="currentAccountValue" row-key="id" stripe highlight-current-row>
              <el-table-column label="投资账户号码" align="center" min-width="200">
                <template slot-scope="scope"><span>{{ scope.row.accountNo }}</span></template>
              </el-table-column>
              <el-table-column label="初期现金金额" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.firstValue }}</span></template>
              </el-table-column>
              <el-table-column label="账户结算日期 " align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.balanceDate }}</span></template>
              </el-table-column>
              <el-table-column label="账户现值" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.value }}</span></template>
              </el-table-column>
              <el-table-column label="账户单位数" align="center" min-width="200">
                <template slot-scope="scope"><span>{{ scope.row.unit }}</span></template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="24" :lg="12">
            <el-row :gutter="20" class="flex-accordant-height mt-30">
              <el-col :sm="24" :lg="12" class="flex-center table-left-bg">
                账户价值
              </el-col>
              <el-col :sm="24" :lg="12">
                <el-input :readonly="true" />
              </el-col>
            </el-row>
          </el-col>
          <el-col :sm="24" :lg="12">
            <pagination :total="1" page.sync="1" limit.sync="10" @pagination="[]" />
          </el-col>
        </el-row>
      </el-card>
      <el-card class="mt-10">
        <div slot="header" class="clearfix">
          <span>历史账户轨迹</span>
        </div>
        <el-table ref="accountValueHistoryTable" height="264" :data="accountValueHistory" row-key="id" stripe highlight-current-row>
          <el-table-column label="投资账户号码 " align="center" min-width="200">
            <template slot-scope="scope"><span>{{ scope.row.accountNo }}</span></template>
          </el-table-column>
          <el-table-column label="应该计价日期 " align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.valuationDate }}</span></template>
          </el-table-column>
          <el-table-column label="实际处理日期" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.realDate }}</span></template>
          </el-table-column>
          <el-table-column label="卖出价" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.priceSell }}</span></template>
          </el-table-column>
          <el-table-column label="买入价 " align="center" min-width="200">
            <template slot-scope="scope"><span>{{ scope.row.priceBuy }}</span></template>
          </el-table-column>
          <el-table-column label="账户价值 " align="center" min-width="150">
            <template slot-scope="scope"><span>{{ scope.row.value }}</span></template>
          </el-table-column>
        </el-table>
        <pagination :total="1" page.sync="1" limit.sync="10" @pagination="[]" />
      </el-card>
    </div>
  </el-scrollbar>
</template>

<script>
import Pagination from '@/components/Pagination'

export default {
  name: 'AccountInfo',
  components: {
    Pagination
  },
  props: {
    contractNo: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      currentAccountValue: [
        {
          id: null,
          accountNo: null,
          firstValue: null,
          balanceDate: null,
          value: null,
          unit: null
        }
      ],
      accountValueHistory: [
        {
          id: null,
          valuationDate: null,
          realDate: null,
          priceSell: null,
          priceBuy: null,
          value: null
        }
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      console.log(this.contractNo)
    }
  }
}
</script>

<style scoped>

</style>
