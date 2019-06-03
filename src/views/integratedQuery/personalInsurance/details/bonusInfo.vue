<template>
  <el-scrollbar ref="scrollbar" wrap-class="scrollbar-wrapper">
    <div class="fit-height-200">
      <el-card>
        <div slot="header" class="clearfix">
          <span>分红信息</span>
        </div>
        <el-table ref="bonusInfoTable" height="572" :data="bonusInfo" row-key="id" stripe highlight-current-row>
          <el-table-column label="会计年度" align="center" min-width="200">
            <template slot-scope="scope"><span>{{ scope.row.accountingYear }}</span></template>
          </el-table-column>
          <el-table-column label="分红金额" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.bonusMoney }}</span></template>
          </el-table-column>
          <el-table-column label="分配标志" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.bonusFlag }}</span></template>
          </el-table-column>
          <el-table-column label="应分日期 " align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.sGetDate }}</span></template>
          </el-table-column>
          <el-table-column label="领取方式" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.getType }}</span></template>
          </el-table-column>
          <el-table-column label="分配日期" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.aGetDate }}</span></template>
          </el-table-column>
          <el-table-column label="抵交保费金额  " align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.premiumAmount }}</span></template>
          </el-table-column>
          <el-table-column label="累计账户余额  " align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.accountbalance }}</span></template>
          </el-table-column>
          <el-table-column label="增额交清的保额  " align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.sumInsured }}</span></template>
          </el-table-column>
          <el-table-column label="分配后累计保额" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.distributionAmount }}</span></template>
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
  name: 'BonusInfo',
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
      bonusInfo: [
        {
          id: null,
          accountingYear: null,
          bonusMoney: null,
          bonusFlag: null,
          sGetDate: null,
          bonusGetType: null,
          aGetDate: null,
          premiumAmount: null,
          accountbalance: null,
          sumInsured: null,
          distributionAmount: null
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

