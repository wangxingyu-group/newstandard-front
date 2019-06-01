<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <el-tabs v-model="defaultActiveTab" @tab-click="handleClick">
            <el-tab-pane :key="tabs.baseInfo.key" :name="tabs.baseInfo.name" :label="tabs.baseInfo.label">
              <base-info :contract-no="contractNo" />
            </el-tab-pane>
            <el-tab-pane :key="tabs.newContract.key" :name="tabs.newContract.name" :label="tabs.newContract.label">
              <new-contract :contract-no="contractNo" />
            </el-tab-pane>
            <el-tab-pane :key="tabs.renewalInfo.key" :name="tabs.renewalInfo.name" :label="tabs.renewalInfo.label">
              <el-scrollbar ref="scrollbar" wrap-class="scrollbar-wrapper">
                <div class="fit-height-200">{{ tabs.renewalInfo.label }}</div>
              </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane :key="tabs.customerService.key" :name="tabs.customerService.name" :label="tabs.customerService.label">
              <el-scrollbar ref="scrollbar" wrap-class="scrollbar-wrapper">
                <div class="fit-height-200">{{ tabs.customerService.label }}</div>
              </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane :key="tabs.claimsInfo.key" :name="tabs.claimsInfo.name" :label="tabs.claimsInfo.label">
              <el-scrollbar ref="scrollbar" wrap-class="scrollbar-wrapper">
                <div class="fit-height-200">{{ tabs.claimsInfo.label }}</div>
              </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane :key="tabs.accountInfo.key" :name="tabs.accountInfo.name" :label="tabs.accountInfo.label">
              <el-scrollbar ref="scrollbar" wrap-class="scrollbar-wrapper">
                <div class="fit-height-200">{{ tabs.accountInfo.label }}</div>
              </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane :key="tabs.bonusInfo.key" :name="tabs.bonusInfo.name" :label="tabs.bonusInfo.label">
              <el-scrollbar ref="scrollbar" wrap-class="scrollbar-wrapper">
                <div class="fit-height-200">{{ tabs.bonusInfo.label }}</div>
              </el-scrollbar>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BaseInfo from './baseInfo'
import NewContract from './newContract.vue'
import RenewalInfo from './renewalInfo.vue'
import CustomerService from './customerService.vue'
import ClaimsInfo from './claimsInfo.vue'
import AccountInfo from './accountInfo.vue'
import BonusInfo from './bonusInfo.vue'
export default {
  name: 'PersonalInsuranceDetails',
  components: {
    BaseInfo, NewContract, RenewalInfo, CustomerService, ClaimsInfo, AccountInfo, BonusInfo
  },
  data() {
    return {
      contractNo: this.$route.params.contractNo ? this.$route.params.contractNo : -1,
      tabs: {
        baseInfo: {
          key: 'baseInfo', name: 'baseInfo', label: '基本信息'
        },
        newContract: {
          key: 'newContract', name: 'newContract', label: '新契约信息'
        },
        renewalInfo: {
          key: 'renewalInfo', name: 'renewalInfo', label: '续期缴费'
        },
        customerService: {
          key: 'customerService', name: 'customerService', label: '保全信息'
        },
        claimsInfo: {
          key: 'claimsInfo', name: 'claimsInfo', label: '理赔记录'
        },
        accountInfo: {
          key: 'accountInfo', name: 'accountInfo', label: '账户价值'
        },
        bonusInfo: {
          key: 'bonusInfo', name: 'bonusInfo', label: '分红信息'
        }
      },
      defaultActiveTab: 'baseInfo'
    }
  },
  methods: {
    handleClick(tab, event) {
    }
  }
}
</script>

