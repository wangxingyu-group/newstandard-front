<template>
  <div class="app-container">
    <sticky :z-index="10">
      <el-card>
        <el-form ref="queryForm" :inline="true" :model="query" label-width="120px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="">
                <el-input v-model="search" placeholder="全文检索" style="width: 600px;" :clearable="true" />
              </el-form-item>
              <el-button type="primary" icon="fa fa-search" circle title="查询" @click="goToSearch" />
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </sticky>
    <el-row :gutter="10" class="mt-10">
      <el-col :span="8">  <el-card class="mt-10">
        <div slot="header">
          日点击排行
        </div>
        <div style="min-height: 200px;">
          1.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          2.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          3.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          4.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          5.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          6.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          7.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          8.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
        </div>
      </el-card></el-col>
      <el-col :span="8">  <el-card class="mt-10">
        <div slot="header">
          周点击排行
        </div>
        <div style="min-height: 200px;">
          1.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          2.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          3.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          4.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          5.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          6.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          7.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          8.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
        </div>
      </el-card></el-col>
      <el-col :span="8">  <el-card class="mt-10">
        <div slot="header">
          最新上传
        </div>
        <div style="min-height: 200px;">
          1.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          2.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          3.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          4.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          5.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          6.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          7.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          8.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
        </div>
      </el-card></el-col>
    </el-row>
    <el-row :gutter="10" class="mt-10">
      <el-col :span="8">  <el-card class="mt-10">
        <div slot="header">
          最新知识
        </div>
        <div style="min-height: 200px;">
          1.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          2.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          3.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          4.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          5.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          6.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          7.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          8.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
        </div>
      </el-card></el-col>
      <el-col :span="8">  <el-card class="mt-10">
        <div slot="header">
          收藏排行
        </div>
        <div style="min-height: 200px;">
          1.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          2.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          3.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          4.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          5.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          6.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          7.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
          8.<i class="fa fa-book ml-10 mr-10 mt-10" />暂无记录<el-badge :value="0" type="primary" style="right: -5px;top: 4px;" /><br>
        </div>
      </el-card></el-col>
    </el-row>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky'
export default {
  name: 'Major',
  components: { Sticky },
  data() {
    return {
      query: {},
      search: null,
      operateSM: 24,
      operateLG: 24,
      tableLoading: true,
      tableData: [],
      selectedRow: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0
      }
    }
  },
  mounted() {
    this.$nextTick(() => {

    })
  },
  methods: {
    goToSearch() {
      this.$router.push('/knowledgeBase/fullTextSearch')
    }
  }
}
</script>

