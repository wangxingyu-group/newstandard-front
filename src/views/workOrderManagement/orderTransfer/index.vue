<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <el-form ref="form" :model="form" label-width="100px" size="small">
              <el-row>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="受理日期从">
                    <el-col :span="11">
                      <el-date-picker v-model="form.from" type="date" style="width:100%;min-width:135px" placeholder="" />
                    </el-col>
                    <el-col style="text-align: center" :span="2">-</el-col>
                    <el-col :span="11">
                      <el-date-picker v-model="form.to" type="date" style="width:100%;min-width:135px" placeholder="" />
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="通话号码">
                    <el-input v-model="form.name" :disabled="false" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="业务分类">
                    <el-select v-model="form.region" style="width:100%;" placeholder="业务分类">
                      <el-option label="01--产品咨询" value="shanghai" />
                      <el-option label="02--一般咨询" value="shanghai" />
                      <el-option label="03--保全咨询" value="shanghai" />
                      <el-option label="04--系统问题" value="shanghai" />
                      <el-option label="05--理赔报案" value="shanghai" />
                      <el-option label="06--投诉建议" value="shanghai" />
                      <el-option label="07--其他" value="shanghai" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="坐席工号">
                    <el-input v-model="form.name" :disabled="false" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="客户姓名">
                    <el-input v-model="form.name" :disabled="false" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="客户身份证号">
                    <el-input v-model="form.name" :disabled="false" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="服务单状态">
                    <el-select v-model="form.region" style="width:100%;" placeholder="服务单状态">
                      <el-option label="1--未转办" value="shanghai" />
                      <el-option label="2--已退回" value="shanghai" />
                      <el-option label="3--受理中" value="shanghai" />
                      <el-option label="4--完成" value="shanghai" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="服务单号">
                    <el-input v-model="form.name" :disabled="false" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="fr">
                    <el-button type="primary" size="small">查询</el-button>
                    <el-button type="info" size="small">清空</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <el-table ref="table" :key="0" :data="workOrderData" :height="searchRow3" row-key="id" stripe highlight-current-row>
            <el-table-column label="服务单号" align="center">
              <template slot-scope="scope">
                <span class="link-type" @click="gotoDetails(row)">{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column label="服务单类型" align="center">
              <template slot-scope="scope"><span>{{ scope.row.type }}</span></template>
            </el-table-column>
            <el-table-column label="服务单状态" align="center">
              <template slot-scope="scope"><span>{{ scope.row.status }}</span></template>
            </el-table-column>
            <el-table-column label="坐席姓名" align="center">
              <template slot-scope="scope"><span>{{ scope.row.seats }}</span></template>
            </el-table-column>
            <el-table-column label="通话时间" align="center">
              <template slot-scope="scope"><span>{{ scope.row.callDuration }}</span></template>
            </el-table-column>
            <el-table-column label="来电人姓名" align="center">
              <template slot-scope="scope"><span>{{ scope.row.callInName }}</span></template>
            </el-table-column>
            <el-table-column label="来电号码" align="center">
              <template slot-scope="scope"><span>{{ scope.row.callInNo }}</span></template>
            </el-table-column>
            <el-table-column label="转办机构" align="center">
              <template slot-scope="scope"><span>{{ scope.row.transferOrg }}</span></template>
            </el-table-column>
            <el-table-column label="转办部门" align="center">
              <template slot-scope="scope"><span>{{ scope.row.transferOraA }}</span></template>
            </el-table-column>
            <el-table-column label="转办岗位" align="center">
              <template slot-scope="scope"><span>{{ scope.row.transferOraB }}</span></template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" page.sync="1" limit.sync="10" @pagination="workOrderData" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapState } from 'vuex'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      total: 1,
      form: {
        source: 'callIn',
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      workOrderData: [
        {
          id: '011711081832251005',
          type: '产品咨询',
          status: '未转办',
          seats: '坐席5',
          callDuration: '2017-11-08 18:31:32',
          callInName: '白浅',
          callInNo: '17610601398',
          transferOrg: '机构A',
          transferOraA: '部门A',
          transferOraB: '岗位A'
        }
      ],
      optiosValue: ['1', '2'],
      options: [{
        value: '1',
        label: '未转办'
      }, {
        value: '2',
        label: '未退回'
      }, {
        value: '3',
        label: '被退回'
      }]
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
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    onSubmit() {
      console.log('submit!')
    },
    gotoDetails() {
      this.$router.push('/workOrderManagement/registration')
    }
  }
}
</script>
