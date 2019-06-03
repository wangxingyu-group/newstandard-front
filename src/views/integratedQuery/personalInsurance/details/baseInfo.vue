<template>
  <el-scrollbar ref="scrollbar" wrap-class="scrollbar-wrapper">
    <div class="fit-height-200">
      <el-card>
        <div slot="header" class="clearfix">
          <span>合同信息</span>
        </div>
        <el-form v-model="contract" label-width="150px" size="small">
          <el-row>
            <el-col :sm="12" :lg="8">
              <el-form-item label="保单号">
                <el-input v-model="contract.contractNo" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="投保单号">
                <el-input v-model="contract.preContractNo" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="服务机构">
                <el-input v-model="contract.serviceOrganization" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="销售渠道">
                <el-input v-model="contract.saleChannel" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="银行通标识">
                <el-input v-model="contract.ybflag" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="客户签收日期">
                <el-input v-model="contract.signForContractDate" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="业务员编码">
                <el-input v-model="contract.agentCode" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="业务员姓名">
                <el-input v-model="contract.agentName" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="代理机构">
                <el-input v-model="contract.agentCompany" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="保单服务状态">
                <el-input v-model="contract.serviceStatus" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="签单机构">
                <el-input v-model="contract.signCompany" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="签单日期">
                <el-input v-model="contract.signDate" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="销售机构">
                <el-input v-model="contract.saleCompany" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="保单打印日期">
                <el-input v-model="contract.printDate" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="回单日期">
                <el-input v-model="contract.receiptDate" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="续期缴费银行账号">
                <el-input v-model="contract.receiptBankAccount" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="续期缴费账户名">
                <el-input v-model="contract.receiptAccountName" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="保单补发次数">
                <el-input v-model="contract.reissueCount" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="银行质押冻结">
                <el-input v-model="contract.bankPledge" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="销售方式">
                <el-input v-model="contract.saleType" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="续期转账开户行">
                <el-input v-model="contract.receiptBankName" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="付费转账开户行">
                <el-input v-model="contract.payBankName" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="付费转账账号">
                <el-input v-model="contract.payBankAccount" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="保单状态">
                <el-input v-model="contract.contractStatus" :readonly="true" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <el-card class="mt-10">
        <div slot="header" class="clearfix">
          <span>保单险种信息</span>
        </div>
        <el-table ref="riskInfoTable" :data="risk" row-key="id" stripe highlight-current-row>
          <el-table-column label="保单状态" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.contractStatus }}</span></template>
          </el-table-column>
          <el-table-column label="保额" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.amount }}</span></template>
          </el-table-column>
          <el-table-column label="生效日期" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.effectiveDate }}</span></template>
          </el-table-column>
          <el-table-column label="保险止期" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.endDate }}</span></template>
          </el-table-column>
          <el-table-column label="缴费形式" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.payType }}</span></template>
          </el-table-column>
          <el-table-column label="缴费对应日" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.payDate }}</span></template>
          </el-table-column>
          <el-table-column label="缴费年限" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.payRange }}</span></template>
          </el-table-column>
          <el-table-column label="基本保费" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.basePremium }}</span></template>
          </el-table-column>
          <el-table-column label="保费总额" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.totalPremium }}</span></template>
          </el-table-column>
          <el-table-column label="健康加费" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.healthFee }}</span></template>
          </el-table-column>
          <el-table-column label="职业加费" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.professionalFee }}</span></template>
          </el-table-column>
          <el-table-column label="投保年龄" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.ageAtInsure }}</span></template>
          </el-table-column>
          <el-table-column label="币种" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.currency }}</span></template>
          </el-table-column>
          <el-table-column label="保险期间" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.insureRange }}</span></template>
          </el-table-column>
          <el-table-column label="投资计划到期日" align="center" min-width="150">
            <template slot-scope="scope"><span>{{ scope.row.maturityDate }}</span></template>
          </el-table-column>
        </el-table>
        <pagination :total="1" page.sync="1" limit.sync="10" @pagination="[]" />
      </el-card>
      <el-card class="mt-10">
        <div slot="header" class="clearfix">
          <span>投保人信息</span>
        </div>
        <el-form v-model="contract" label-width="150px" size="small">
          <el-row>
            <el-col :sm="12" :lg="8">
              <el-form-item label="姓名">
                <el-input v-model="applicant.name" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="性别">
                <el-input v-model="applicant.gender" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="出生日期">
                <el-input v-model="applicant.birthday" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="客户号">
                <el-input v-model="applicant.customerNo" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="证件类型">
                <el-input v-model="applicant.idType" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="证件号码">
                <el-input v-model="applicant.idNo" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="职业等级">
                <el-input v-model="applicant.perfessionalLevel" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="国籍">
                <el-input v-model="applicant.nationality" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="电子邮箱">
                <el-input v-model="applicant.email" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="通讯地址">
                <el-input v-model="applicant.postalAddress" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="邮政编码">
                <el-input v-model="applicant.zipCode" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="住址">
                <el-input v-model="applicant.homeaddress" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="工作单位">
                <el-input v-model="applicant.workUint" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="固定电话">
                <el-input v-model="applicant.telephone" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="移动电话">
                <el-input v-model="applicant.mobileTelephone" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="8">
              <el-form-item label="回访电话">
                <el-input v-model="applicant.revisitPhone" :readonly="true" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <el-card class="mt-10">
        <div slot="header" class="clearfix">
          <span>被保人信息</span>
        </div>
        <el-table ref="insuredTable" :data="insureds" row-key="id" stripe highlight-current-row>
          <el-table-column label="被保人姓名" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.name }}</span></template>
          </el-table-column>
          <el-table-column label="客户号" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.customerNo }}</span></template>
          </el-table-column>
          <el-table-column label="性别" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.gender }}</span></template>
          </el-table-column>
          <el-table-column label="证件类型" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.idType }}</span></template>
          </el-table-column>
          <el-table-column label="证件号" align="center" min-width="200">
            <template slot-scope="scope"><span>{{ scope.row.idNo }}</span></template>
          </el-table-column>
          <el-table-column label="国籍" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.nationality }}</span></template>
          </el-table-column>
          <el-table-column label="职业等级" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.perfessionalLevel }}</span></template>
          </el-table-column>
          <el-table-column label="出生日期" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.birthday }}</span></template>
          </el-table-column>
        </el-table>
        <pagination :total="1" page.sync="1" limit.sync="10" @pagination="[]" />
      </el-card>
      <el-card class="mt-10">
        <div slot="header" class="clearfix">
          <span>受益人信息</span>
        </div>
        <el-table ref="beneficiaryTable" :data="beneficiary" row-key="id" stripe highlight-current-row>
          <el-table-column label="受益人类别" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.type }}</span></template>
          </el-table-column>
          <el-table-column label="姓名" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.name }}</span></template>
          </el-table-column>
          <el-table-column label="性别" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.gender }}</span></template>
          </el-table-column>
          <el-table-column label="证件类型" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.idType }}</span></template>
          </el-table-column>
          <el-table-column label="证件号" align="center" min-width="200">
            <template slot-scope="scope"><span>{{ scope.row.idNo }}</span></template>
          </el-table-column>
          <el-table-column label="与被保人关系" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.relationOfInsured }}</span></template>
          </el-table-column>
          <el-table-column label="收益顺序" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.order }}</span></template>
          </el-table-column>
          <el-table-column label="受益份额" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.share }}</span></template>
          </el-table-column>
          <el-table-column label="证件有效期" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.validityOfCredential }}</span></template>
          </el-table-column>
          <el-table-column label="所属被保人" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.insured }}</span></template>
          </el-table-column>
          <el-table-column label="出生日期" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.birthday }}</span></template>
          </el-table-column>
          <el-table-column label="生存金领取银行" align="center" min-width="150">
            <template slot-scope="scope"><span>{{ scope.row.bank }}</span></template>
          </el-table-column>
          <el-table-column label="账户名称" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.accountName }}</span></template>
          </el-table-column>
          <el-table-column label="银行账号" align="center" min-width="100">
            <template slot-scope="scope"><span>{{ scope.row.bankAccount }}</span></template>
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
  name: 'BaseInfo',
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
      contract: {
        contractNo: '86410020190210026668', preContractNo: '11010210867392', serviceOrganization: '北京本部营销服务部',
        saleChannel: '银行代理', ybflag: '否', signForContractDate: '2019-05-24',
        agentCode: '8641300087', agentName: '张三', agentCompany: '中国银行支行',
        serviceStatus: '正常保单', signCompany: '北京本部营销服务部', signDate: '2019-05-23',
        saleCompany: '北京本部营销服务部', printDate: '2019-05-23', receiptDate: '2019-05-24',
        receiptBankAccount: '6217858000065413585', receiptAccountName: null, reissueCount: '0',
        bankPledge: null, saleType: '中行手机银行', receiptBankName: '中国银行',
        payBankName: null, payBankAccount: '6217858000065413585', contractStatus: '犹退终止'
      },
      risk: [
        {
          id: '1',
          insured: '张三',
          riskCode: '314350',
          riskName: '保障险',
          renewalType: '否',
          contractStatus: '终止',
          amount: '10000',
          effectiveDate: '2019-05-24',
          endDate: '2019-05-24',
          payEndDate: '2019-05-24',
          payType: '一次交清',
          payDate: '2019-05-24',
          payRange: '6',
          basePremium: '12000',
          totalPremium: '12000',
          healthFee: '0',
          professionalFee: '0',
          ageAtInsure: '61',
          currency: '人民币',
          insureRange: '6',
          maturityDate: ''
        }
      ],
      applicant: {
        name: '王五', gender: '男', birthday: '1957-08-11',
        customerNo: '0003177886', idType: '身份证', idNo: '410322195708110123',
        perfessionalLevel: '五级', nationality: '中国', email: '15515302743@139.com',
        postalAddress: '北京市朝阳区', zipCode: '100076', homeaddress: '',
        workUint: '王五', telephone: '男', mobileTelephone: '15515302743',
        revisitPhone: ''
      },
      insureds: [
        {
          id: '1',
          name: '赵六',
          customerNo: '0003177886',
          gender: '女',
          idType: '身份证',
          idNo: '410322195708110345',
          nationality: '中国',
          perfessionalLevel: '五级',
          birthday: '1957-08-13'
        }
      ],
      beneficiary: [
        {
          id: null,
          type: null,
          name: null,
          gender: null,
          idType: null,
          idNo: null,
          relationOfInsured: null,
          order: null,
          share: null,
          validityOfCredential: null,
          insured: null,
          birthday: null,
          bankName: null,
          accountName: null,
          bankAccount: null
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
