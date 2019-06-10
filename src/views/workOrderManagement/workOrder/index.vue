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
                      <el-date-picker v-model="form.from" type="date" style="width:100%;min-width:135px" placeholder="请选择日期" />
                    </el-col>
                    <el-col style="text-align: center" :span="2">-</el-col>
                    <el-col :span="11">
                      <el-date-picker v-model="form.to" type="date" style="width:100%;min-width:135px" placeholder="请选择日期" />
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="通话号码">
                    <el-input v-model="form.name" :disabled="false" placeholder="通话号码" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="转办状态">
                    <el-drag-select v-model="optiosValue" style="width:100%;" multiple placeholder="请选择">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-drag-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="坐席工号">
                    <el-input v-model="form.name" :disabled="false" placeholder="坐席工号" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="客户姓名">
                    <el-input v-model="form.name" :disabled="false" placeholder="客户姓名" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="客户身份证号">
                    <el-input v-model="form.name" :disabled="false" placeholder="客户身份证号" />
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
                    <el-input v-model="form.name" :disabled="false" placeholder="服务单号" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="fr">
                    <el-button type="primary" size="small">查询</el-button>
                    <el-button type="info" size="small">清空</el-button>
                    <el-button type="success" size="small">新建</el-button>
                    <el-button type="danger" size="small">批量删除</el-button>
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
            <el-table-column label="转办状态" align="center">
              <template slot-scope="scope"><span>{{ scope.row.transferStatus }}</span></template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" page.sync="1" limit.sync="10" @pagination="workOrderData" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ElDragSelect from '@/components/DragSelect' // base on element-ui
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapState } from 'vuex'

export default {
  components: {
    ElDragSelect,
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
          transferStatus: '未转办'
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
