<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <el-form ref="form" :model="listQuery" label-width="100px" size="small">
              <el-row>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="公司名称">
                    <el-input v-model="listQuery.companyName" :disabled="false" placeholder="公司名称" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="公司邮箱">
                    <el-input v-model="listQuery.companyEmail" :disabled="false" placeholder="公司邮箱" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <el-form-item label="审核状态">
                    <el-select v-model="listQuery.status" style="width:100%;" multiple placeholder="审核状态">
                      <el-option label="通过" value="1">通过</el-option>
                      <el-option label="不通过" value="0">不通过</el-option>
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
          <el-table ref="whiteListTable" :data="whiteList" :height="searchRow1" row-key="id" stripe highlight-current-row>
            <el-table-column label="公司名称" align="center">
              <template slot-scope="scope"><span>{{ scope.row.companyName }}</span></template>
            </el-table-column>
            <el-table-column label="公司邮箱" align="center">
              <template slot-scope="scope"><span>{{ scope.row.companyEmail }}</span></template>
            </el-table-column>
            <el-table-column label="公司地址" align="center">
              <template slot-scope="scope"><span>{{ scope.row.companyAddress }}</span></template>
            </el-table-column>
            <el-table-column label="固定电话" align="center">
              <template slot-scope="scope"><span>{{ scope.row.companyTelephone }}</span></template>
            </el-table-column>
            <el-table-column label="创建时间" align="center">
              <template slot-scope="scope"><span>{{ scope.row.createTime }}</span></template>
            </el-table-column>
            <el-table-column label="审核状态" align="center">
              <template slot-scope="scope"><span>{{ scope.row.status }}</span></template>
            </el-table-column>
            <el-table-column label="操作人" align="center">
              <template slot-scope="scope"><span>{{ scope.row.operator }}</span></template>
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
  computed: {
    ...mapState({
      searchRow1: state => state.commonData.searchRow1,
      searchRow2: state => state.commonData.searchRow2,
      searchRow3: state => state.commonData.searchRow3,
      searchRow4: state => state.commonData.searchRow4
    })
  },
  data() {
    return {
      total: 1,
      listQuery: {
        companyName: null,
        companyEmail: null,
        status: null
      },
      whiteList: [
        {
          companyName: null,
          companyEmail: null,
          companyAddress: null,
          companyTelephone: null,
          createTime: null,
          status: null,
          operateor: null
        }
      ]
    }
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
