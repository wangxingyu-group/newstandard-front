<template>
  <el-scrollbar ref="scrollbar" wrap-class="scrollbar-wrapper">
    <div class="fit-height-200">
      <el-card>
        <div slot="header" class="clearfix">
          <span>承保前</span>
        </div>
        <el-row :gutter="20" class="flex-accordant-height">
          <el-col :sm="24" :lg="4" class="flex-center table-left-bg">
            核保过程
          </el-col>
          <el-col :sm="24" :lg="20">
            <el-table ref="underwritingTrackTable" height="264" :data="underwritingTrack" row-key="id" stripe highlight-current-row>
              <el-table-column label="投保单号" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.preContractNo }}</span></template>
              </el-table-column>
              <el-table-column label="操作员" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.operator }}</span></template>
              </el-table-column>
              <el-table-column label="操作开始日期" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.startDate }}</span></template>
              </el-table-column>
              <el-table-column label="操作结束日期" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.endDate }}</span></template>
              </el-table-column>
              <el-table-column label="操作后状态" align="center" min-width="200">
                <template slot-scope="scope"><span>{{ scope.row.status }}</span></template>
              </el-table-column>
              <el-table-column label="上报类型" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.reportType }}</span></template>
              </el-table-column>
            </el-table>
            <pagination :total="1" page.sync="1" limit.sync="10" @pagination="[]" />
          </el-col>
        </el-row>
        <el-row :gutter="20" class="flex-accordant-height mt-10">
          <el-col :sm="24" :lg="4" class="flex-center table-left-bg">
            首期收费
          </el-col>
          <el-col :sm="24" :lg="20">
            <el-table ref="firstFeeTable" :data="firstFee" height="264" row-key="id" stripe highlight-current-row>
              <el-table-column label="扣费时间" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.deductionDate }}</span></template>
              </el-table-column>
              <el-table-column label="扣费结果" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.deductionResult }}</span></template>
              </el-table-column>
              <el-table-column label="扣费金额" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.deductionAmount }}</span></template>
              </el-table-column>
              <el-table-column label="开户行" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.bankName }}</span></template>
              </el-table-column>
              <el-table-column label="银行卡号" align="center" min-width="200">
                <template slot-scope="scope"><span>{{ scope.row.bankAccount }}</span></template>
              </el-table-column>
            </el-table>
            <pagination :total="1" page.sync="1" limit.sync="10" @pagination="[]" />
          </el-col>
        </el-row>
      </el-card>
      <el-card class="mt-10">
        <div slot="header" class="clearfix">
          <span>承包后</span>
        </div>
        <el-row :gutter="20" class="flex-accordant-height">
          <el-col :sm="24" :lg="4" class="flex-center table-left-bg">
            回访结果
          </el-col>
          <el-col :sm="24" :lg="20">
            <el-table ref="revisitResultTable" height="264" :data="revisitResult" row-key="id" stripe highlight-current-row>
              <el-table-column label="回访时间" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.revisitDate }}</span></template>
              </el-table-column>
              <el-table-column label="回访方式" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.type }}</span></template>
              </el-table-column>
              <el-table-column label="回访结果" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.result }}</span></template>
              </el-table-column>
            </el-table>
            <pagination :total="1" page.sync="1" limit.sync="10" @pagination="[]" />
          </el-col>
        </el-row>
        <el-row :gutter="20" class="flex-accordant-height mt-10">
          <el-col :sm="24" :lg="4" class="flex-center table-left-bg">
            纸质合同
          </el-col>
          <el-col :sm="24" :lg="20">
            <el-table ref="paperContractTable" height="264" :data="paperContract" row-key="id" stripe highlight-current-row>
              <el-table-column label="申请日期" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.applicationDate }}</span></template>
              </el-table-column>
              <el-table-column label="打印日期" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.printDate }}</span></template>
              </el-table-column>
              <el-table-column label="申请人" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.applicant }}</span></template>
              </el-table-column>
              <el-table-column label="快递单号" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.trackingNumber }}</span></template>
              </el-table-column>
            </el-table>
            <pagination :total="1" page.sync="1" limit.sync="10" @pagination="[]" />
          </el-col>
        </el-row>
        <el-row :gutter="20" class="flex-accordant-height mt-10">
          <el-col :sm="24" :lg="4" class="flex-center table-left-bg">
            承保短信
          </el-col>
          <el-col :sm="24" :lg="20">
            <el-table ref="messageTable" height="264" :data="message" row-key="id" stripe highlight-current-row>
              <el-table-column label="发送时间" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.sendDate }}</span></template>
              </el-table-column>
              <el-table-column label="发送状态" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.status }}</span></template>
              </el-table-column>
              <el-table-column label="手机号" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.phone }}</span></template>
              </el-table-column>
              <el-table-column label="短信内容" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.content }}</span></template>
              </el-table-column>
            </el-table>
            <pagination :total="1" page.sync="1" limit.sync="10" @pagination="[]" />
          </el-col>
        </el-row>
        <el-row :gutter="20" class="flex-accordant-height mt-10">
          <el-col :sm="24" :lg="4" class="flex-center table-left-bg">
            电子保单查询
          </el-col>
          <el-col :sm="24" :lg="20">
            <el-table ref="eContractTable" height="264" :data="eContract" row-key="id" stripe highlight-current-row>
              <el-table-column label="发送时间" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.sendDate }}</span></template>
              </el-table-column>
              <el-table-column label="发送状态" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.status }}</span></template>
              </el-table-column>
              <el-table-column label="电子邮箱" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.email }}</span></template>
              </el-table-column>
              <el-table-column label="邮件主题" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.subject }}</span></template>
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
  name: 'NewContract',
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
      underwritingTrack: [
        {
          id: null,
          preContractNo: '11010210868392',
          operator: '王丽丽',
          startDate: '2019-04-05',
          endDate: '2019-04-05',
          status: '核保通过',
          reportType: null
        }
      ],
      firstFee: [
        {
          id: null,
          deductionDate: '2019-05-23',
          deductionResult: '已收费',
          deductionAmount: '12000',
          bankName: '中国银行',
          bankAccount: '6217858000065713585'
        }
      ],
      revisitResult: [
        {
          id: null,
          revisitDate: null,
          type: null,
          result: null
        }
      ],
      paperContract: [
        {
          id: null,
          applicationDate: null,
          printDate: null,
          applicant: null,
          trackingNumber: null
        }
      ],
      message: [
        {
          id: null,
          sendDate: null,
          status: null,
          phone: null,
          content: null
        }
      ],
      eContract: [
        {
          id: null,
          sendDate: '2019-03-08 10:31:04.0',
          status: '已发送',
          email: '13812546758@qq.com',
          subject: '邮箱验证'
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
