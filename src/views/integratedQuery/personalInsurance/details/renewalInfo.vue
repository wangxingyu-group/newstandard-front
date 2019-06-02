<template>
  <el-scrollbar ref="scrollbar" wrap-class="scrollbar-wrapper">
    <div class="fit-height-200">
      <el-card>
        <div slot="header" class="clearfix">
          <span>保费缴纳记录</span>
        </div>
        <el-row>
          <el-col :span="24">
            <el-table ref="payRecordTable" height="264" :data="payRecord" row-key="id" stripe highlight-current-row>
              <el-table-column type="selection" width="55" />
              <el-table-column label="缴费收据号码" align="center" min-width="200">
                <template slot-scope="scope"><span>{{ scope.row.receiptNo }}</span></template>
              </el-table-column>
              <el-table-column label="实交金额" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.realPay }}</span></template>
              </el-table-column>
              <el-table-column label="缴费间隔" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.payRange }}</span></template>
              </el-table-column>
              <el-table-column label="缴费对应日" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.payDate }}</span></template>
              </el-table-column>
              <el-table-column label="宽限期截止日期" align="center" min-width="200">
                <template slot-scope="scope"><span>{{ scope.row.expirationDate }}</span></template>
              </el-table-column>
              <el-table-column label="交费核销日期" align="center" min-width="150">
                <template slot-scope="scope"><span>{{ scope.row.writeDate }}</span></template>
              </el-table-column>
              <el-table-column label="交费类型" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.payType }}</span></template>
              </el-table-column>
              <el-table-column label="现交至日期 " align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.currentPayToDate }}</span></template>
              </el-table-column>
              <el-table-column label="缴费次数" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.payCount }}</span></template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="24" :lg="12">
            <el-row :gutter="20" class="flex-accordant-height mt-30">
              <el-col :sm="24" :lg="12" class="flex-center table-left-bg">
                当前有效险种保费合计
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
          <span>扣费明细</span>
        </div>
        <el-table ref="deductionRecordTable" height="264" :data="deductionRecord" row-key="id" stripe highlight-current-row>
          <el-table-column label="暂收费号码" align="center" min-width="200">
            <template slot-scope="scope"><span>{{ scope.row.tempReceiptNo }}</span></template>
          </el-table-column>
          <el-table-column label="业务号码" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.business }}</span></template>
          </el-table-column>
          <el-table-column label="账户名" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.accountName }}</span></template>
          </el-table-column>
          <el-table-column label="开户行" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.bankName }}</span></template>
          </el-table-column>
          <el-table-column label="账号" align="center" min-width="200">
            <template slot-scope="scope"><span>{{ scope.row.bankAccount }}</span></template>
          </el-table-column>
          <el-table-column label="收费金额" align="center" min-width="150">
            <template slot-scope="scope"><span>{{ scope.row.deductionAmount }}</span></template>
          </el-table-column>
          <el-table-column label="应收日期" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.accrualDate }}</span></template>
          </el-table-column>
          <el-table-column label="到账日期 " align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.receivedDate }}</span></template>
          </el-table-column>
          <el-table-column label="发盘日期" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.offerDate }}</span></template>
          </el-table-column>
          <el-table-column label="回盘日期" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.bankDealDate }}</span></template>
          </el-table-column>
          <el-table-column label="收费状态" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.status }}</span></template>
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
  name: 'RenewalInfo',
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
      payRecord: [
        {
          id: '1',
          receiptNo: '86410020190970158719',
          realPay: '0',
          payRange: '不定期交',
          payDate: '/',
          expirationDate: '/',
          writeDate: '2019-05-23',
          payType: '正常',
          currentPayToDate: '',
          payCount: '1'
        },
        {
          id: '2',
          receiptNo: '86410020190970158719',
          realPay: '120000',
          payRange: '不定期交',
          payDate: '/',
          expirationDate: '/',
          writeDate: '2019-05-23',
          payType: '正常',
          currentPayToDate: '',
          payCount: '1'
        }
      ],
      deductionRecord: [
        {
          id: '1',
          tempReceiptNo: null,
          business: null,
          accountName: null,
          bankName: null,
          bankAccount: null,
          deductionAmount: null,
          accrualDate: null,
          receivedDate: null,
          offerDate: null,
          bankDealDate: null,
          status: null
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
