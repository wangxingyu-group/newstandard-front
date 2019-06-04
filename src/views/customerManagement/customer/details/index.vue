<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>基本信息</span>
          </div>
          <el-form ref="form" label-width="100px" size="small">
            <el-row>
              <el-col :sm="12" :lg="8">
                <el-form-item label="姓名">
                  <el-input value="张三" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :sm="12" :lg="8">
                <el-form-item label="性别">
                  <el-input value="男" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :sm="12" :lg="8">
                <el-form-item label="出生日期">
                  <el-input value="1989-01-21" :disabled="true" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="12" :lg="8">
                <el-form-item label="身份证号">
                  <el-input value="152106198901310034" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :sm="12" :lg="8">
                <el-form-item label="学历">
                  <el-input value="本科" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :sm="12" :lg="8">
                <el-form-item label="通讯地址">
                  <el-input value="北京市朝阳区" :disabled="true" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="12" :lg="8">
                <el-form-item label="手机号">
                  <el-input value="13810453247" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :sm="12" :lg="8">
                <el-form-item label="座机号">
                  <el-input value="" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :sm="12" :lg="8">
                <el-form-item label="邮箱">
                  <el-input value="12342345@qq.com" :disabled="true" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="12" :lg="8">
                <el-form-item label="微信号">
                  <el-input value="张三" :disabled="true" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <el-card class="mt-10">
          <el-tabs value="callInHistory">
            <el-tab-pane key="callInHistory" name="callInHistory" label="来电流水">
              <el-table :data="callInHistory" height="calc(100vh - 589px)" fit stripe highlight-current-row style="width: 100%;" @sort-change="()=>{}" @selection-change="()=>{}">
                <el-table-column label="日期" prop="phoneNo" align="center" min-width="100">
                  <template slot-scope="scope"><span>{{ scope.row.date }}</span></template>
                </el-table-column>
                <el-table-column label="时间" prop="phoneNo" sortable="custom" align="center" min-width="80">
                  <template slot-scope="scope"><span>{{ scope.row.time }}</span></template>
                </el-table-column>
                <el-table-column label="通话时长" prop="phoneNo" sortable="custom" align="center" min-width="80">
                  <template slot-scope="scope"><span>{{ scope.row.callDuration }}</span></template>
                </el-table-column>
                <el-table-column label="内容小结" prop="phoneNo" sortable="custom" align="center" min-width="80">
                  <template slot-scope="scope"><span>{{ scope.row.content }}</span></template>
                </el-table-column>
              </el-table>
              <pagination :total="total" :page.sync="page" :limit.sync="limit" @pagination="[]" />
            </el-tab-pane>
            <el-tab-pane key="visitHistory" name="visitHistory" label="访问流水">
              <el-table :data="visitHistory" height="calc(100vh - 589px)" fit stripe highlight-current-row style="width: 100%;" @sort-change="()=>{}" @selection-change="()=>{}">
                <el-table-column label="日期" prop="phoneNo" align="center" min-width="100">
                  <template slot-scope="scope"><span>{{ scope.row.date }}</span></template>
                </el-table-column>
                <el-table-column label="渠道" prop="phoneNo" sortable="custom" align="center" min-width="80">
                  <template slot-scope="scope"><span>{{ scope.row.channel }}</span></template>
                </el-table-column>
              </el-table>
              <pagination :total="total" :page.sync="page" :limit.sync="limit" @pagination="[]" />
            </el-tab-pane>
            <el-tab-pane key="workOrderHistory" name="workOrderHistory" label="工单流水">
              <el-table :data="workOrderHistory" height="calc(100vh - 589px)" fit stripe highlight-current-row style="width: 100%;" @sort-change="()=>{}" @selection-change="()=>{}">
                <el-table-column label="工单号" prop="phoneNo" align="center" min-width="100">
                  <template slot-scope="scope"><span>{{ scope.row.workOrderNo }}</span></template>
                </el-table-column>
                <el-table-column label="工单类型" prop="phoneNo" sortable="custom" align="center" min-width="80">
                  <template slot-scope="scope"><span>{{ scope.row.orderType }}</span></template>
                </el-table-column>
                <el-table-column label="工单概要" prop="phoneNo" sortable="custom" align="center" min-width="80">
                  <template slot-scope="scope"><span>{{ scope.row.summary }}</span></template>
                </el-table-column>
                <el-table-column label="是否完成" prop="phoneNo" sortable="custom" align="center" min-width="80">
                  <template slot-scope="scope"><span>{{ scope.row.status }}</span></template>
                </el-table-column>
                <el-table-column label="录音" prop="phoneNo" sortable="custom" align="center" min-width="80">
                  <template slot-scope="scope"><span>{{ scope.row.record }}</span></template>
                </el-table-column>
              </el-table>
              <pagination :total="total" :page.sync="page" :limit.sync="limit" @pagination="[]" />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { mapState } from 'vuex'
export default {
  components: { Pagination },
  data() {
    return {
      total: 20,
      page: 1,
      limit: 20,
      callInHistory: [
        {
          date: '2019-05-16',
          time: '12:04:39',
          callDuration: '3:40',
          content: '理赔相关咨询'
        }
      ],
      visitHistory: [
        {
          date: '2019-05-11',
          channel: '微信'
        },
        {
          date: '2019-05-11',
          channel: '微博'
        },
        {
          date: '2019-05-12',
          channel: '小程序'
        }, {
          date: '2019-05-12',
          channel: '专属APP'
        }
      ],
      workOrderHistory: [
        {
          workOrderNo: '121232049235',
          orderType: '一般咨询',
          summary: '理赔咨询',
          status: '完成',
          record: 'ftp://h-k..rr:0-90-9:0-9'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      searchRow1: state => state.commonData.searchRow1,
      searchRow2: state => state.commonData.searchRow2,
      searchRow3: state => state.commonData.searchRow3,
      searchRow4: state => state.commonData.searchRow4
    })
  }
}
</script>

