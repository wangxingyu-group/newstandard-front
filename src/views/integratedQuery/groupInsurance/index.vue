<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-scrollbar ref="tableScrollbar" wrap-class="scrollbar-wrapper">
          <div class="fit-height-104">
            <el-card>
              <div slot="header" class="clearfix">
                <el-form ref="queryForm" :model="listQuery" label-width="100px" size="small">
                  <el-row>
                    <el-col :sm="12" :lg="8">
                      <el-form-item label="团体保单号" label-width="130px">
                        <el-input v-model="listQuery.groupContractNo" placeholder="团体保单号" class="filter-item" @keyup.enter.native="()=>{}" />
                      </el-form-item>
                    </el-col>
                    <el-col :sm="12" :lg="8">
                      <el-form-item label="投保单号" label-width="130px">
                        <el-input v-model="listQuery.groupPreContractNo" placeholder="投保单号" class="filter-item" @keyup.enter.native="()=>{}" />
                      </el-form-item>
                    </el-col>
                    <el-col :sm="12" :lg="8">
                      <el-form-item label="单位名称">
                        <el-input v-model="listQuery.unitName" placeholder="单位名称" class="filter-item" @keyup.enter.native="()=>{}" />
                      </el-form-item>
                    </el-col>
                    <el-col :sm="12" :lg="8">
                      <el-form-item label="个人保单号" label-width="130px">
                        <el-input v-model="listQuery.contractNo" placeholder="个人保单号" class="filter-item" @keyup.enter.native="()=>{}" />
                      </el-form-item>
                    </el-col>
                    <el-col :sm="12" :lg="8">
                      <el-form-item label="个人客户号" label-width="130px">
                        <el-input v-model="listQuery.customerNo" placeholder="个人客户号" class="filter-item" @keyup.enter.native="()=>{}" />
                      </el-form-item>
                    </el-col>
                    <el-col :sm="12" :lg="8">
                      <el-form-item label="证件号">
                        <el-input v-model="listQuery.idNo" placeholder="证件号" class="filter-item" @keyup.enter.native="()=>{}" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <div class="fr">
                        <el-button type="primary" size="small" @click="()=>{}">查询</el-button>
                        <el-button type="info" size="small" @click="()=>{}">清空</el-button>
                      </div>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
              <el-row :gutter="20" class="flex-accordant-height">
                <el-col :sm="24" :lg="4" class="flex-center table-left-bg">
                  团体保单信息
                </el-col>
                <el-col :sm="24" :lg="20">
                  <el-table ref="groupContractInfoTable" height="264" :data="groupContractInfo" row-key="id" stripe highlight-current-row>
                    <el-table-column label="集体险种号 " align="center" min-width="100">
                      <template slot-scope="scope"><span>{{ scope.row.groupRiskNo }}</span></template>
                    </el-table-column>
                    <el-table-column label="险种编码 " align="center" min-width="100">
                      <template slot-scope="scope"><span>{{ scope.row.groupRiskCode }}</span></template>
                    </el-table-column>
                    <el-table-column label="险种名称 " align="center" min-width="100">
                      <template slot-scope="scope"><span>{{ scope.row.groupRiskName }}</span></template>
                    </el-table-column>
                    <el-table-column label="投保人名称 " align="center" min-width="100">
                      <template slot-scope="scope"><span>{{ scope.row.applicant }}</span></template>
                    </el-table-column>
                    <el-table-column label="生效日期 " align="center" min-width="200">
                      <template slot-scope="scope"><span>{{ scope.row.effectiveDate }}</span></template>
                    </el-table-column>
                    <el-table-column label="承保人数 " align="center" min-width="100">
                      <template slot-scope="scope"><span>{{ scope.row.insuredCount }}</span></template>
                    </el-table-column>
                    <el-table-column label="总保费 " align="center" min-width="100">
                      <template slot-scope="scope"><span>{{ scope.row.totalPremium }}</span></template>
                    </el-table-column>
                    <el-table-column label="总保额 " align="center" min-width="100">
                      <template slot-scope="scope"><span>{{ scope.row.totalAmount }}</span></template>
                    </el-table-column>
                    <el-table-column label="保单状态 " align="center" min-width="100">
                      <template slot-scope="scope"><span>{{ scope.row.status }}</span></template>
                    </el-table-column>
                  </el-table>
                  <pagination :total="1" page.sync="1" limit.sync="10" @pagination="[]" />
                </el-col>
              </el-row>
              <el-row :gutter="20" class="flex-accordant-height mt-10">
                <el-col :sm="24" :lg="4" class="flex-center table-left-bg">
                  个人保单信息
                </el-col>
                <el-col :sm="24" :lg="20">
                  <el-table ref="personalContractInfoTable" :data="personalContractInfo" height="264" row-key="id" stripe highlight-current-row>
                    <el-table-column label="个人保单好" align="center" min-width="150">
                      <template slot-scope="scope"><span>{{ scope.row.contractNo }}</span></template>
                    </el-table-column>
                    <el-table-column label="个人客户号 " align="center" min-width="150">
                      <template slot-scope="scope"><span>{{ scope.row.customerNo }}</span></template>
                    </el-table-column>
                    <el-table-column label="姓名" align="center" min-width="100">
                      <template slot-scope="scope"><span>{{ scope.row.name }}</span></template>
                    </el-table-column>
                    <el-table-column label="性别" align="center" min-width="100">
                      <template slot-scope="scope"><span>{{ scope.row.gender }}</span></template>
                    </el-table-column>
                    <el-table-column label="出生日期" align="center" min-width="200">
                      <template slot-scope="scope"><span>{{ scope.row.birthday }}</span></template>
                    </el-table-column>
                    <el-table-column label="证件类型" align="center" min-width="200">
                      <template slot-scope="scope"><span>{{ scope.row.idType }}</span></template>
                    </el-table-column>
                    <el-table-column label="证件号码" align="center" min-width="200">
                      <template slot-scope="scope"><span>{{ scope.row.idNo }}</span></template>
                    </el-table-column>
                    <el-table-column label="职业代码" align="center" min-width="200">
                      <template slot-scope="scope"><span>{{ scope.row.prefessionalCode }}</span></template>
                    </el-table-column>
                    <el-table-column label="职业类型" align="center" min-width="200">
                      <template slot-scope="scope"><span>{{ scope.row.prefessionalType }}</span></template>
                    </el-table-column>
                    <el-table-column label="户籍" align="center" min-width="200">
                      <template slot-scope="scope"><span>{{ scope.row.register }}</span></template>
                    </el-table-column>
                    <el-table-column label="婚姻状况" align="center" min-width="200">
                      <template slot-scope="scope"><span>{{ scope.row.maritalStatus }}</span></template>
                    </el-table-column>
                    <el-table-column label="险种" align="center" min-width="200">
                      <template slot-scope="scope"><span>{{ scope.row.risk }}</span></template>
                    </el-table-column>
                    <el-table-column label="生效日期" align="center" min-width="200">
                      <template slot-scope="scope"><span>{{ scope.row.effectiveDate }}</span></template>
                    </el-table-column>
                    <el-table-column label="终止日期" align="center" min-width="200">
                      <template slot-scope="scope"><span>{{ scope.row.endDate }}</span></template>
                    </el-table-column>
                  </el-table>
                  <pagination :total="1" page.sync="1" limit.sync="10" @pagination="[]" />
                </el-col>
              </el-row>
            </el-card>
          </div>
        </el-scrollbar>
      </el-col>
    </el-row>
  </div></template>

<script>
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data() {
    return {
      listQuery: {
        groupContractNo: null,
        groupPreContractNo: null,
        unitName: null,
        contractNo: null,
        customerNo: null,
        idNo: null
      },
      groupContractInfo: [
        {
          id: null,
          groupRiskNo: null,
          groupRiskCode: null,
          groupRiskName: null,
          applicant: null,
          effectiveDate: null,
          insuredCount: null,
          totalPremium: null,
          totalAmount: null,
          status
        }
      ],
      personalContractInfo: [
        {
          id: null,
          contractNo: null,
          customerNo: null,
          name: null,
          gender: null,
          birthday: null,
          idType: null,
          idNo: null,
          prefessionalCode: null,
          prefessionalType: null,
          register: null,
          maritalStatus: null,
          risk: null,
          effectiveDate: null,
          endDate: null
        }
      ]
    }
  }
}
</script>

