<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <el-form ref="form" :model="form" label-width="100px" size="small">
              <el-row>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="创建时间" label-width="130px">
                    <el-col :span="11">
                      <el-date-picker v-model="form.from" type="date" style="width:100%;min-width:135px" placeholder="起始时间" />
                    </el-col>
                    <el-col style="text-align: center" :span="2">-</el-col>
                    <el-col :span="11">
                      <el-date-picker v-model="form.to" type="date" style="width:100%;min-width:135px" placeholder="截止时间" />
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="流程名称">
                    <el-input v-model="form.name" :disabled="false" placeholder="流程名称" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="流程归属" label-width="130px">
                    <el-select v-model="form.region" style="width:100%;" placeholder="流程归属">
                      <el-option label="01--质检" value="shanghai" />
                      <el-option label="02--工单" value="shanghai" />
                    </el-select>
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
            <el-table-column label="流程归属" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.id }}</span></template>
            </el-table-column>
            <el-table-column label="流程名称" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.type }}</span></template>
            </el-table-column>
            <el-table-column label="流程描述" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.status }}</span></template>
            </el-table-column>
            <el-table-column label="创建人" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.seats }}</span></template>
            </el-table-column>
            <el-table-column label="创建时间" align="center" min-width="200">
              <template slot-scope="scope"><span>{{ scope.row.callDuration }}</span></template>
            </el-table-column>
            <el-table-column label="修改人" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.callInName }}</span></template>
            </el-table-column>
            <el-table-column label="修改时间" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.callInNo }}</span></template>
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="250">
              <template slot-scope="{row}">
                <el-button type="primary" size="mini" @click="handleUpdate(row)">
                  查看
                </el-button>
                <el-button type="danger" size="mini" @click="handleDelete(row)">
                  编辑
                </el-button>
                <el-button type="danger" size="mini" @click="handledeloy(row)">
                  重新部署
                </el-button>
              </template>
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
          id: '质检',
          type: '质检流程图',
          status: '保单质检流程描述',
          seats: 'system',
          callDuration: '2018-11-08 18:31:32',
          callInName: '',
          callInNo: '',
          edit: 'http://39.105.54.133:10008/public/modeler/modeler.html?modelId=17501'
        },
        {
          id: '工单',
          type: '工单流程图',
          status: '工单操作流程描述',
          seats: 'system',
          callDuration: '2018-11-08 19:24:22',
          callInName: '',
          callInNo: '',
          edit: 'http://39.105.54.133:10008/public/modeler/modeler.html?modelId=1'
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
    },
    handleUpdate(row) {
      window.open(row.edit)
    },
    handleDelete(row) {
      window.open(row.edit)
    },
    handledeloy(row) {
      console.log('submit!')
    }
  }
}
</script>
