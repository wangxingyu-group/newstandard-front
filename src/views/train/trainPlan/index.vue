<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <el-tabs v-if="workOrderSettings" v-model="activeTab" @tab-click="handleClick">
            <el-tab-pane v-for="categorizedSettings in workOrderSettings.children" :key="categorizedSettings.id" :name="String(categorizedSettings.id)" :label="categorizedSettings.label">
              <el-scrollbar ref="tableScrollbar" wrap-class="scrollbar-wrapper">
                <div class="fit-height-200">
                  <el-form ref="form" :model="form" label-width="100px" size="small" style="display:-webkit-box;-webkit-box-orient:vertical;height:100%;">
                    <div style="-webkit-box-flex:1;-webkit-flex:1;flex:1;overflow:auto;">
                      <el-card>
                        <div slot="header" class="clearfix">
                          <span>月度计划基本信息</span>
                        </div>
                        <el-row>
                          <el-col :span="8">
                            <el-form-item label="计划编码">
                              <el-input v-model="form.id" placeholder="计划编码" />
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="计划名称">
                              <el-input v-model="form.name" placeholder="计划名称" />
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="管理机构">
                              <el-input v-model="value" :disabled="true" placeholder="编码" style="width: 35%" />
                              <el-select v-model="value" style="width: 60%" placeholder="管理机构">
                                <el-option v-for="(item, index) in idlist" :key="index" :label="item.key" :value="item.value" />
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="8">
                            <el-form-item label="计划年月">
                              <el-date-picker v-model="form.from" type="month" style="width:100%;min-width:135px" placeholder="起始日期" />
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </el-card>
                      <el-card class="mt-10">
                        <div slot="header" class="clearfix">
                          <span>月度计划信息</span>
                        </div>
                        <el-row>
                          <el-col :span="8">
                            <el-form-item label="管理信息">
                              <el-input v-model="form.name" placeholder="管理信息" />
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="计划名称">
                              <el-input v-model="form.name" placeholder="计划名称" />
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="签单日期">
                              <el-col :span="11">
                                <el-date-picker v-model="form.from2" type="month" style="width:100%;min-width:135px" placeholder="起始日期" />
                              </el-col>
                              <el-col style="text-align: center" :span="2">-</el-col>
                              <el-col :span="11">
                                <el-date-picker v-model="form.to2" type="month" style="width:100%;min-width:135px" placeholder="截止日期" />
                              </el-col>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="24">
                            <div class="fr">
                              <el-button type="primary" size="small">查询</el-button>
                              <el-button type="info" size="small">重置</el-button>
                            </div>
                          </el-col>
                        </el-row>
                      </el-card>
                      <el-card class="mt-10">
                        <div slot="header" class="clearfix">
                          <span>月度计划查询结果</span>
                        </div>
                        <el-scrollbar ref="tableScrollbar" wrap-class="scrollbar-wrapper">
                          <div style="min-height:100px">
                            <el-table ref="table" :key="0" :data="policyData" row-key="id" stripe highlight-current-row>
                              <el-table-column type="selection" min-width="55" />
                              <el-table-column label="序号" align="center" min-width="100">
                                <template slot-scope="scope"><span>{{ scope.row.id }}</span></template>
                              </el-table-column>
                              <el-table-column label="月度计划编码" align="center" min-width="150">
                                <template slot-scope="scope"><span>{{ scope.row.applicant }}</span></template>
                              </el-table-column>
                              <el-table-column label="阅读计划名称" align="center" min-width="150">
                                <template slot-scope="scope"><span>{{ scope.row.customerNo }}</span></template>
                              </el-table-column>
                              <el-table-column label="管理机构" align="center" min-width="150">
                                <template slot-scope="scope"><span>{{ scope.row.insured }}</span></template>
                              </el-table-column>
                              <el-table-column label="计划年月" align="center" min-width="150">
                                <template slot-scope="scope"><span>{{ scope.row.effectiveDate }}</span></template>
                              </el-table-column>
                            </el-table>
                          </div>
                        </el-scrollbar>
                      </el-card>
                      <el-card class="mt-10">
                        <div slot="header" class="clearfix">
                          <span>月度计划开班信息</span>
                        </div>
                        <el-scrollbar ref="tableScrollbar" wrap-class="scrollbar-wrapper">
                          <div style="height:244px">
                            <el-table ref="table" :key="0" :data="list" row-key="id" stripe highlight-current-row :height="searchRow1">
                              <el-table-column type="selection" min-width="55" />
                              <el-table-column label="班级类别" align="center" min-width="100">
                                <template slot-scope="scope"><span>{{ scope.row.ty }}</span></template>
                              </el-table-column>
                              <el-table-column label="计划开始日期" align="center" min-width="150">
                                <template slot-scope="scope"><span>{{ scope.row.startDate }}</span></template>
                              </el-table-column>
                              <el-table-column label="计划开班时间" align="center" min-width="150">
                                <template slot-scope="scope"><span>{{ scope.row.startTime }}</span></template>
                              </el-table-column>
                              <el-table-column label="计划结班日期" align="center" min-width="150">
                                <template slot-scope="scope"><span>{{ scope.row.endDate }}</span></template>
                              </el-table-column>
                              <el-table-column label="计划结班时间" align="center" min-width="150">
                                <template slot-scope="scope"><span>{{ scope.row.endTime }}</span></template>
                              </el-table-column>
                              <el-table-column label="计划培训人数" align="center" min-width="150">
                                <template slot-scope="scope"><span>{{ scope.row.planNum }}</span></template>
                              </el-table-column>
                              <el-table-column label="培训类型" align="center" min-width="150">
                                <template slot-scope="scope"><span>{{ scope.row.type }}</span></template>
                              </el-table-column>
                              <el-table-column label="培训形式" align="center" min-width="150">
                                <template slot-scope="scope"><span>{{ scope.row.theme }}</span></template>
                              </el-table-column>
                              <el-table-column label="预算" align="center" min-width="150">
                                <template slot-scope="scope"><span>{{ scope.row.num }}</span></template>
                              </el-table-column>
                              <el-table-column label="是否已执行" align="center" min-width="150">
                                <template slot-scope="scope"><span>{{ scope.row.isN }}</span></template>
                              </el-table-column>
                            </el-table>
                            <pagination v-show="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList" />
                          </div>
                        </el-scrollbar>
                      </el-card>
                    </div>
                    <el-card style="width: calc(100% - 6px);">
                      <el-row>
                        <el-col :span="24">
                          <div class="fr">
                            <el-button type="primary" size="small">导出</el-button>
                          </div>
                        </el-col>
                      </el-row>
                    </el-card>
                  </el-form>
                </div>
              </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane label="批量导入" name="second">
              <el-scrollbar ref="tableScrollbar" wrap-class="scrollbar-wrapper">
                <div class="fit-height-200" />
              </el-scrollbar>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// 用于获取工单配置信息
import { fetchList } from '@/api/train/trainPlan'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapState } from 'vuex'
export default {
  components: { Pagination },
  data() {
    return {
      workOrderSettings: {
        children: [
          {
            id: '123',
            label: '单个维护'
          }
        ]
      },
      total: 0,
      list: [],
      value: '',
      activeTab: String('123'),
      idlist: [{ key: '银保监', value: '123' }],
      form: {
        id: '', // 编码
        from: '',
        name: '',
        from2: '',
        to: '',
        limit: 10,
        page: 1
      },
      policyData: [
        {
          id: '1',
          applicant: '12311',
          customerNo: '阅读计划',
          insured: '代理机构',
          effectiveDate: '2019-01'
        }
      ],
      content: '',
      editorOption: {}
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
      fetchList(this.form).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        // 模拟延迟
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      })
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
