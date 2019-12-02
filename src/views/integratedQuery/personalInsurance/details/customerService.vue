<template>
  <el-scrollbar ref="scrollbar" wrap-class="scrollbar-wrapper">
    <div class="fit-height-200">
      <el-card>
        <div slot="header" class="clearfix">
          <span>退保试算</span>
        </div>
        <el-form v-model="cancellationTrial" label-width="150px" size="small">
          <el-row>
            <el-col :sm="12" :lg="8">
              <el-form-item label="订单生效日期">
                <el-input v-model="cancellationTrial.effectiveDate" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="客户签收日期">
                <el-input v-model="cancellationTrial.signForContractDate" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="缴费对应日">
                <el-input v-model="cancellationTrial.payDate" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="已满订单年度">
                <el-input v-model="cancellationTrial.pastPolicyYear" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="补退费金额合计">
                <el-input v-model="cancellationTrial.trialResult" :readonly="true" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="fr">
                <el-button type="primary" size="small">退保试算</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <el-card class="mt-10">
        <div slot="header" class="clearfix">
          <span>保全历史</span>
        </div>
        <el-row :gutter="20" class="flex-accordant-height">
          <el-col :sm="24" :lg="4" class="flex-center table-left-bg">
            保全历史
          </el-col>
          <el-col :sm="24" :lg="20">
            <el-table ref="customerServiceHistoryTable" height="264" :data="customerServiceHistory" row-key="id" stripe highlight-current-row>
              <el-table-column type="selection" width="55" />
              <el-table-column label="批单号" align="center" min-width="200">
                <template slot-scope="scope"><span>{{ scope.row.batchOrderNo }}</span></template>
              </el-table-column>
              <el-table-column label="申请日期" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.applicationDate }}</span></template>
              </el-table-column>
              <el-table-column label="生效日期" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.effectiveDate }}</span></template>
              </el-table-column>
              <el-table-column label="批改类型 " align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.type }}</span></template>
              </el-table-column>
              <el-table-column label="补/退费金额" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.deductionAmount }}</span></template>
              </el-table-column>
              <el-table-column label="批改状态" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.status }}</span></template>
              </el-table-column>
              <el-table-column label="受理机构 " align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.operatingOrganization }}</span></template>
              </el-table-column>
              <el-table-column label="申请方式 " align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.applicationType }}</span></template>
              </el-table-column>
              <el-table-column label="操作岗位 " align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.operatingPost }}</span></template>
              </el-table-column>
              <el-table-column label="操作员" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.operator }}</span></template>
              </el-table-column>
            </el-table>
            <pagination :total="1" page.sync="1" limit.sync="10" @pagination="[]" />
          </el-col>
        </el-row>
        <el-row :gutter="20" class="flex-accordant-height mt-10">
          <el-col :sm="24" :lg="4" class="flex-center table-left-bg">
            历史明细
          </el-col>
          <el-col :sm="24" :lg="20">
            <el-table ref="historyDetailsTable" height="264" :data="historyDetails" row-key="id" stripe highlight-current-row>
              <el-table-column label="批单号" align="center" min-width="200">
                <template slot-scope="scope"><span>{{ scope.row.batchOrderNo }}</span></template>
              </el-table-column>
              <el-table-column label="批改类型" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.type }}</span></template>
              </el-table-column>
              <el-table-column label="应收付日期" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.accrualDate }}</span></template>
              </el-table-column>
              <el-table-column label="收付费到账日期 " align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.receivedDate }}</span></template>
              </el-table-column>
              <el-table-column label="发盘日期  " align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.offerDate }}</span></template>
              </el-table-column>
              <el-table-column label="回盘日期  " align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.bankDealDate }}</span></template>
              </el-table-column>
              <el-table-column label="收付费状态  " align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.status }}</span></template>
              </el-table-column>
              <el-table-column label="开户行  " align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.bankName }}</span></template>
              </el-table-column>
              <el-table-column label="账户名  " align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.accountName }}</span></template>
              </el-table-column>
              <el-table-column label="账号  " align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.bankAccount }}</span></template>
              </el-table-column>
              <el-table-column label="付费金额 " align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.amount }}</span></template>
              </el-table-column>
            </el-table>
            <pagination :total="1" page.sync="1" limit.sync="10" @pagination="[]" />
          </el-col>
        </el-row>
      </el-card>
    </div>
  </el-scrollbar>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'CustomerService',
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
      cancellationTrial: {
        effectiveDate: '2019-05-24',
        signForContractDate: '2019-05-23',
        payDate: '2025-05-24',
        pastPolicyYear: '1',
        trialResult: null
      },
      customerServiceHistory: [
        {
          id: '1',
          batchOrderNo: '86410020190420010718',
          applicationDate: '2019-05-24',
          effectiveDate: '2019-05-24',
          type: '犹豫期退保',
          deductionAmount: '-120000',
          status: '确认生效',
          operatingOrganization: '北京营销总部',
          applicationType: '手机银行',
          operatingPost: '保全确认',
          operator: '张三'
        }
      ],
      historyDetails: [
        {
          id: '1',
          batchOrderNo: '86410020190420010718',
          type: '犹豫期退保',
          accrualDate: '2019-05-24',
          receivedDate: '2019-05-27',
          offerDate: '2019-05-27',
          bankDealDate: '2019-05-27',
          status: '处理成功',
          bankName: '中国银行',
          accountName: '李四',
          bankAccount: '6217858000065413585',
          amount: '-120000'
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
