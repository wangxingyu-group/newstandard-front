<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div>
            <el-form ref="queryForm" :model="listQuery" label-width="100px" size="small">
              <el-row>
                <el-col :span="24">
                  <div>
                    <el-button type="primary" size="small" @click="getList">单个维护</el-button>
                    <el-button type="primary" size="small" @click="getList">批量导入</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card>
          <el-form ref="form" :model="query" label-width="100px" size="small">
            <el-row>
              <el-col :sm="24" :lg="2">
                <el-form-item label="学员信息" label-width="150px" />
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="24" :lg="6">
                <el-form-item label="姓名">
                  <el-input class="filter-item" placeholder="姓名" @keyup.enter.native="handleFilter" />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :lg="6">
                <el-form-item label="证件类型">
                  <el-input class="filter-item" placeholder="证件类型" @keyup.enter.native="handleFilter" />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :lg="6">
                <el-form-item label="证件编号">
                  <el-input class="filter-item" placeholder="证件编号" @keyup.enter.native="handleFilter" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="24" :lg="6">
                <el-form-item label="性别">
                  <el-input class="filter-item" placeholder="性别" @keyup.enter.native="handleFilter" />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :lg="6">
                <el-form-item label="出生日期">
                  <el-date-picker class="filter-item" placeholder="出生日期" style="width:100%;min-width:135px" @keyup.enter.native="handleFilter" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card>
          <el-form ref="form" :model="query" label-width="100px" size="small">
            <el-row>
              <el-col :sm="24" :lg="2">
                <el-form-item label="班级信息" placeholder="班级信息" label-width="150px" />
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="24" :lg="6">
                <el-form-item label="班级编码">
                  <el-input class="filter-item" placeholder="班级编码" @keyup.enter.native="handleFilter" />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :lg="6">
                <el-form-item label="班级名称">
                  <el-input class="filter-item" placeholder="班级名称" @keyup.enter.native="handleFilter" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card>
          <el-form ref="form" :model="query" label-width="100px" size="small">
            <el-row>
              <el-col :sm="24" :lg="2">
                <el-form-item label="请输入筛选条件" label-width="150px" />
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="24" :lg="6">
                <el-form-item label="管理机构">
                  <el-input class="filter-item" placeholder="管理机构" @keyup.enter.native="handleFilter" />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :lg="6">
                <el-form-item label="入司日期始期">
                  <el-date-picker class="filter-item" placeholder="入司日期始期" style="width:100%;min-width:135px" @keyup.enter.native="handleFilter" />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :lg="6">
                <el-form-item label="入司日期止期">
                  <el-date-picker class="filter-item" placeholder="入司日期止期" style="width:100%;min-width:135px" @keyup.enter.native="handleFilter" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="24" :lg="6">
                <el-form-item label="工号">
                  <el-input class="filter-item" placeholder="工号" @keyup.enter.native="handleFilter" />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :lg="6">
                <el-form-item label="姓名">
                  <el-input class="filter-item" placeholder="姓名" @keyup.enter.native="handleFilter" />
                </el-form-item>
              </el-col>
              <el-row>
                <el-col :sm="24" :lg="6">
                  <el-form-item label="学员属性">
                    <el-input class="filter-item" placeholder="学员属性" @keyup.enter.native="handleFilter" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :sm="24" :lg="6">
                  <el-form-item label="职级">
                    <el-input class="filter-item" placeholder="职级" @keyup.enter.native="handleFilter" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div>
                    <el-button type="primary" size="small" @click="getList">查询</el-button>
                    <el-button type="primary" size="small" @click="getList">重置</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-row></el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card>
          <el-form ref="form" :model="query" label-width="100px" size="small">
            <el-row>
              <el-col :sm="24" :lg="2">
                <el-form-item label="学员信息" label-width="150px" />
              </el-col>
            </el-row>
            <el-row>
              <el-table :key="tableKey" v-loading="listLoading" :data="List" :height="searchRow2" fit stripe highlight-current-row style="width: 100%;" @sort-change="()=>{}" @selection-change="selectionChange">
                <el-table-column type="selection" width="55" />
                <el-table-column label="序号" prop="phoneNo" sortable="custom" align="center" width="160">
                  <template slot-scope="scope"><span>{{ scope.row.id }}</span></template>
                </el-table-column>
                <el-table-column label="管理机构" align="center">
                  <template slot-scope="scope"><span>{{ scope.row.company }}</span></template>
                </el-table-column>
                <el-table-column label="培训编码" align="center" width="120">
                  <template slot-scope="scope"><span>{{ scope.row.id2 }}</span></template>
                </el-table-column>
                <el-table-column label="工号" align="center" width="120">
                  <template slot-scope="scope"><span>{{ scope.row.id3 }}</span></template>
                </el-table-column>
                <el-table-column label="姓名" align="center" width="200">
                  <template slot-scope="scope"><span>{{ scope.row.name }}</span></template>
                </el-table-column>
                <el-table-column label="职级" align="center" width="200">
                  <template slot-scope="scope"><span>{{ scope.row.level }}</span></template>
                </el-table-column>
                <el-table-column label="证件类型" align="center" width="200">
                  <template slot-scope="scope"><span>{{ scope.row.type }}</span></template>
                </el-table-column>
                <el-table-column label="证件号码" align="center" width="200">
                  <template slot-scope="scope"><span>{{ scope.row.ID }}</span></template>
                </el-table-column>
                <el-table-column label="是否需要参加考试" align="center" width="200">
                  <template slot-scope="scope"><span>{{ scope.row.TorF }}</span></template>
                </el-table-column>
              </el-table>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div>
                  <el-button type="primary" size="small" @click="getList">保存</el-button>
                  <el-button type="primary" size="small" @click="getList">返回</el-button>
                  <el-button type="primary" size="small" @click="getList">全部参加/不参加考试切换</el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card>
          <el-form ref="form" :model="query" label-width="100px" size="small">
            <el-row>
              <el-col :sm="24" :lg="2">
                <el-form-item label="批量导入学员" label-width="150px" />
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div>
                  <el-button type="primary" size="small" @click="getList">下载学员批量导入模板</el-button>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="24" :lg="6">
                <el-form-item label="文件地址">
                  <el-input class="filter-item" @keyup.enter.native="handleFilter" />
                  <el-button type="primary" size="small" style="margin-right: 30px" @click="getList">浏览</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div>
                  <el-button type="primary" size="small" @click="getList">导入</el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
  name: 'TrainPlan',
  data() {
    return {
      List: [{
        id: '03',
        company: '腾达',
        id2: '1023457',
        id3: '10384924346',
        name: '李思',
        level: '一级',
        type: '普通',
        ID: '120489765422890765',
        TorF: '是'
      }],
      query: {
        type: 1,
        queryNo: null
      }
    }
  }
}
</script>

<style scoped>

</style>
