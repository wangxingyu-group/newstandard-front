<template>
  <div class="app-container">
    <el-row>
      <div class="fit-height-200">
        <el-form ref="form" :model="form" label-width="100px" size="small" >
            <el-col :span="24">
              <el-card>
                <div slot="header" class="clearfix">
                  <span>基本信息</span>
                </div>
                <el-row>
                  <el-col :span="6" :offset="1">
                    <el-form-item label="服务单号" label-width="130px">
                      <el-input v-model="form.name" placeholder="服务单号" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" :offset="2">
                    <el-form-item label="来电人姓名" label-width="130px">
                      <el-input v-model="form.name" placeholder="来电人姓名" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" :offset="2">
                    <el-form-item label="性别">
                      <el-input v-model="form.name" placeholder="性别" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6" :offset="1">
                    <el-form-item label="来电号码" label-width="130px">
                      <el-input v-model="form.name" placeholder="来电号码" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" :offset="2">
                    <el-form-item label="来电时间" label-width="130px">
                      <el-input v-model="form.name" placeholder="来电时间" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" :offset="2">
                    <el-form-item label="来电地区">
                      <el-input v-model="form.name" placeholder="来电地区" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6" :offset="1">
                    <el-form-item label="身份证号码" label-width="130px">
                      <el-input v-model="form.name" placeholder="身份证号码" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" :offset="2">
                    <el-form-item label="客户身份" label-width="130px">
                      <el-input v-model="form.name" placeholder="客户身份" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" :offset="2">
                    <el-form-item label="备注">
                      <el-input v-model="form.name" placeholder="备注" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6" :offset="1">
                    <el-form-item label="服务来源" label-width="130px">
                      <el-select v-model="form.source" placeholder="服务来源" style="width: 100%">
                        <el-option label="呼入" value="callIn" />
                        <el-option label="外呼" value="beijing" />
                        <el-option label="留言处理" value="beijing" />
                        <el-option label="IVR处理" value="beijing" />
                        <el-option label="理赔" value="beijing" />
                        <el-option label="保全" value="beijing" />
                        <el-option label="回访" value="beijing" />
                        <el-option label="在线客服" value="beijing" />
                        <el-option label="保监投诉" value="beijing" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
            <el-col :span="12" class="mt-10">
              <el-card>
                <div slot="header" class="clearfix">
                  <span>话术关键内容</span>
                </div>
                <el-table ref="table" :key="0" v-loading="tableLoading2" :data="talkTableData" max-height="200" row-key="id" stripe highlight-current-row @selection-change="selectionChange">
                  <el-table-column type="index" width="55" />
                  <el-table-column label="业务场景" align="center" min-width="100">
                    <template slot-scope="scope">
                      <span>{{ scope.row.scene }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="话术内容" align="center" min-width="300">
                    <template slot-scope="scope">
                      <span>{{ scope.row.context }}</span>
                    </template>
                  </el-table-column>
                </el-table>
                <pagination v-show="talkTotal>0" :total="talkTotal" :page.sync="queryForm.page" :limit.sync="queryForm.limit" @pagination="getTalkList" />
              </el-card>
            </el-col>
            <el-col :span="12" class="mt-10">
              <el-card>
                <div slot="header" class="clearfix">
                  <span>订单概要信息</span>
                </div>
                <el-table ref="table" :key="0" v-loading="tableLoading3" :data="orderTableData" max-height="200" row-key="id" stripe highlight-current-row @selection-change="selectionChange">
                  <el-table-column type="index" width="55" />
                  <el-table-column label="订单号" align="center" min-width="100">
                    <template slot-scope="scope">
                      <span>{{ scope.row.id }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="客户姓名" align="center" min-width="100">
                    <template slot-scope="scope">
                      <span>{{ scope.row.name }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="产品名称" align="center" min-width="100">
                    <template slot-scope="scope">
                      <span>{{ scope.row.product }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="订单金额" align="center" min-width="100">
                    <template slot-scope="scope">
                      <span>{{ scope.row.money }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="订单状态" align="center" min-width="100">
                    <template slot-scope="scope">
                      <span>{{ scope.row.status }}</span>
                    </template>
                  </el-table-column>
                </el-table>
                <pagination v-show="orderTotal>0" :total="orderTotal" :page.sync="queryForm.page" :limit.sync="queryForm.limit" @pagination="getTalkList" />
              </el-card>
            </el-col>
            <el-col :span="24" class="mt-10">
              <el-card>
                <div slot="header" class="clearfix">
                  <span>问卷内容</span>
                </div>
                <el-table ref="table" :key="0" v-loading="tableLoading" :data="questionTableData" max-height="200" row-key="id" stripe highlight-current-row @selection-change="selectionChange">
                  <el-table-column type="index" width="55" />
                  <el-table-column label="问题描述" align="center" min-width="300">
                    <template slot-scope="scope">
                      <span>{{ scope.row.description }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="选项A" align="center" min-width="100">
                    <template slot-scope="scope">
                      <span>{{ scope.row.a }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="选项B" align="center" min-width="100">
                    <template slot-scope="scope">
                      <span>{{ scope.row.b }}</span>  </template>
                  </el-table-column>
                  <el-table-column label="选项C" align="center" min-width="100">
                    <template slot-scope="scope">
                      <span>{{ scope.row.c }}</span></template>
                  </el-table-column>
                  <el-table-column label="选项D" align="center" min-width="100">
                    <template slot-scope="scope">
                      <span>{{ scope.row.d }}</span> </template>
                  </el-table-column>
                </el-table>
                <pagination v-show="questionTotal>0" :total="questionTotal" :page.sync="queryForm.page" :limit.sync="queryForm.limit" @pagination="getQuestionList" />
              </el-card>
            </el-col>
        </el-form>
      </div>
    </el-row>
  </div>
</template>

<script>
import question from '@/api/intelligentQuestions/question'
import { fetchListTalk, fetchListOrder } from '@/api/otherRevisit/call/call'
import Pagination from '@/components/Pagination'
export default {
  name: 'Call',
  components: { Pagination },
  data() {
    return {
      form: {
        source: 'callIn',
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        activeName: 'second'
      },
      queryForm: {
        title: null,
        author: null,
        from: null,
        to: null,
        description: null,
        published: null,
        status: null,
        type: null,
        page: 1,
        limit: 10
      },
      selectionData: null,
      tableLoading: true,
      questionTableData: null,
      questionTotal: 0,
      tableLoading2: true,
      talkTableData: null,
      talkTotal: 0,
      tableLoading3: true,
      orderTableData: null,
      orderTotal: 0
    }
  },
  created() {
    this.getTalkList()
    this.getOrderList()
    this.getQuestionList()
  },
  methods: {
    getTalkList() {
      this.tableLoading2 = true
      fetchListTalk(this.queryForm).then((response) => {
        this.talkTableData = response.data.items
        this.talkTotal = response.data.total
        // 模拟延迟
        setTimeout(() => {
          this.tableLoading2 = false
        }, 0.2 * 1000)
      })
    },
    getOrderList() {
      this.tableLoading3 = true
      fetchListOrder(this.queryForm).then((response) => {
        this.orderTableData = response.data.items
        this.orderTotal = response.data.total
        // 模拟延迟
        setTimeout(() => {
          this.tableLoading3 = false
        }, 0.2 * 1000)
      })
    },
    getQuestionList() {
      this.tableLoading = true
      question.fetchList(this.queryForm).then((response) => {
        this.questionTableData = response.data.items
        this.questionTotal = response.data.total
        // 模拟延迟
        setTimeout(() => {
          this.tableLoading = false
        }, 0.2 * 1000)
      })
    },
    selectionChange(rows) {
      this.selectionData = rows
    }
  }
}
</script>

<style scoped>

</style>
