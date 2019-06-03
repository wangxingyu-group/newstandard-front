<template>
  <el-scrollbar ref="scrollbar" wrap-class="scrollbar-wrapper">
    <div class="fit-height-200">
      <el-card>
        <div slot="header" class="clearfix">
          <span>理赔记录</span>
        </div>
        <el-table ref="claimsInfoTable" height="572" :data="claimsInfo" row-key="id" stripe highlight-current-row>
          <el-table-column label="是否结案" align="center" min-width="200">
            <template slot-scope="scope"><span>{{ scope.row.endCaseFlag }}</span></template>
          </el-table-column>
          <el-table-column label="理赔类型" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.claimType }}</span></template>
          </el-table-column>
          <el-table-column label="报案日期" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.reportDate }}</span></template>
          </el-table-column>
          <el-table-column label="出险日期 " align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.accidentDate }}</span></template>
          </el-table-column>
          <el-table-column label="事故描述" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.accidentDescription }}</span></template>
          </el-table-column>
          <el-table-column label="理赔结果" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.claimResult }}</span></template>
          </el-table-column>
          <el-table-column label="结案时间 " align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.endCaseDate }}</span></template>
          </el-table-column>
          <el-table-column label="赔付金额 " align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.realPay }}</span></template>
          </el-table-column>
          <el-table-column label="到账日期 " align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.receivedDate }}</span></template>
          </el-table-column>
          <el-table-column label="银行卡号" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.bankAccount }}</span></template>
          </el-table-column>
          <el-table-column label="开户行" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.bankName }}</span></template>
          </el-table-column>
          <el-table-column label="受益人" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.beneficiary }}</span></template>
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
  name: 'ClaimsInfo',
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
      claimsInfo: [
        {
          id: '1',
          endCaseFlag: null,
          claimType: null,
          reportDate: null,
          accidentDate: null,
          accidentDescription: null,
          claimResult: null,
          endCaseDate: null,
          realPay: null,
          receivedDate: null,
          bankAccount: null,
          bankName: null,
          beneficiary: null
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
