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
                    <el-button type="primary" size="small" @click="getList">团队</el-button>
                    <el-button type="primary" size="small" @click="getList">坐席组</el-button>
                    <el-button type="primary" size="small" @click="getList">确定</el-button>
                    <el-button type="primary" size="small" @click="getList">打开大屏展示页面</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-form ref="form" :model="query" label-width="100px" size="small">
      <el-row>
        <el-col :sm="24" :lg="2">
          <el-form-item label="测试" label-width="100px" />
        </el-col>
        <el-col :sm="24" :lg="2">
          <el-form-item label="签入：0" label-width="100px" />
        </el-col>
        <el-col :sm="24" :lg="2">
          <el-form-item label="空闲：0" label-width="100px" />
        </el-col>
        <el-col :sm="24" :lg="2">
          <el-form-item label="通话：0" label-width="100px" />
        </el-col>
        <el-col :sm="24" :lg="2">
          <el-form-item label="暂停：0" label-width="100px" />
        </el-col>
        <el-col :sm="24" :lg="2">
          <el-form-item label="话后：0" label-width="100px" />
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-col :span="24">
        <el-card>
          <el-form ref="form" :model="query" label-width="100px" size="small">
            <el-row>
              <el-col :sm="24" :lg="2">
                <el-form-item label="信用卡单位" label-width="100px" />
              </el-col>
              <el-col :sm="24" :lg="2">
                <el-form-item label="签入：0" label-width="100px" />
              </el-col>
              <el-col :sm="24" :lg="2">
                <el-form-item label="空闲：0" label-width="100px" />
              </el-col>
              <el-col :sm="24" :lg="2">
                <el-form-item label="振铃：0" label-width="100px" />
              </el-col>
              <el-col :sm="24" :lg="2">
                <el-form-item label="通话：0" label-width="100px" />
              </el-col>
              <el-col :sm="24" :lg="2">
                <el-form-item label="暂停：0" label-width="80px" />
              </el-col>
              <el-col :sm="24" :lg="2">
                <el-form-item label="话后：0" label-width="80px" />
              </el-col>
              <el-col :sm="24" :lg="2">
                <el-form-item label="排队人数：0" label-width="100px" />
              </el-col>
              <el-col :sm="24" :lg="2">
                <el-form-item label="最大等待时间：0" label-width="160px" />
              </el-col>
              <el-col :sm="24" :lg="4">
                <el-form-item label="服务水平">
                  <el-select style="width:65%;" placeholder="请选择">
                    <el-option label="15秒内接听数：0" value="shanghai" />
                    <el-option label="10秒内接听数：0" value="shanghai" />
                    <el-option label="20秒内接听数：0" value="shanghai" />
                    <el-option label="30秒内接听数：0" value="shanghai" />
                    <el-option label="60秒内接听数：0" value="shanghai" />
                    <el-option label="大于60秒接听数：0" value="shanghai" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-table :key="tableKey" v-loading="listLoading" border :data="list" fit stripe highlight-current-row style="width: 100%;" @sort-change="sortChange" @selection-change="selectionChange">
            <el-table-column label="坐席" prop="id" align="center" min-width="80">
              <template slot-scope="scope"><span>{{ scope.row.set }}</span></template>
            </el-table-column>
            <el-table-column label="状态" prop="id" align="center" min-width="80">
              <template slot-scope="scope"><span>{{ scope.row.status }}</span></template>
            </el-table-column>
            <el-table-column label="状态起始时间" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.datetime }}</span></template>
            </el-table-column>
            <el-table-column label="优先级" align="center" min-width="80">
              <template slot-scope="scope"><span>{{ scope.row.level }}</span></template>
            </el-table-column>
            <el-table-column label="应答数（呼入/呼出）" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.inOut }}</span></template>
            </el-table-column>
            <el-table-column label="拨打数（呼入/呼出）" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.inOut2 }}</span></template>
            </el-table-column>
            <el-table-column label="通话时间（呼入/呼出）" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.inOut3 }}</span></template>
            </el-table-column>
            <el-table-column label="客户号码" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.callInNo }}</span></template>
            </el-table-column>
            <el-table-column label="签入时间" align="center" min-width="180">
              <template slot-scope="scope"><span>{{ scope.row.datetime2 }}</span></template>
            </el-table-column>
            <el-table-column label="距上次通话" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.time }}</span></template>
            </el-table-column>
            <el-table-column label="坐席类型" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.type }}</span></template>
            </el-table-column>
            <el-table-column label="在线状态" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.Status }}</span></template>
            </el-table-column>
          </el-table>
          <el-table :key="tableKey" v-loading="listLoading" border :data="list1" fit stripe highlight-current-row style="width: 100%;" @sort-change="sortChange" @selection-change="selectionChange">
            <el-table-column label="主叫" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.in }}</span></template>
            </el-table-column>
            <el-table-column label="主叫名称" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.name1 }}</span></template>
            </el-table-column>
            <el-table-column label="等待时间" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.time }}</span></template>
            </el-table-column>
            <el-table-column label="业务类型" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.type }}</span></template>
            </el-table-column>
            <el-table-column label="业务名" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.name2 }}</span></template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card>
          <el-form ref="form" :model="query" label-width="100px" size="small">
            <el-row>
              <el-col :sm="24" :lg="2">
                <el-form-item label="教育机构" label-width="100px" />
              </el-col>
              <el-col :sm="24" :lg="2">
                <el-form-item label="签入：0" label-width="100px" />
              </el-col>
              <el-col :sm="24" :lg="2">
                <el-form-item label="空闲：0" label-width="100px" />
              </el-col>
              <el-col :sm="24" :lg="2">
                <el-form-item label="振铃：0" label-width="100px" />
              </el-col>
              <el-col :sm="24" :lg="2">
                <el-form-item label="通话：0" label-width="100px" />
              </el-col>
              <el-col :sm="24" :lg="2">
                <el-form-item label="暂停：0" label-width="80px" />
              </el-col>
              <el-col :sm="24" :lg="2">
                <el-form-item label="话后：0" label-width="80px" />
              </el-col>
              <el-col :sm="24" :lg="2">
                <el-form-item label="排队人数：0" label-width="100px" />
              </el-col>
              <el-col :sm="24" :lg="2">
                <el-form-item label="最大等待时间：0" label-width="160px" />
              </el-col>
              <el-col :sm="24" :lg="4">
                <el-form-item label="服务水平">
                  <el-select style="width:65%;" placeholder="请选择">
                    <el-option label="15秒内接听数：0" value="shanghai" />
                    <el-option label="10秒内接听数：0" value="shanghai" />
                    <el-option label="20秒内接听数：0" value="shanghai" />
                    <el-option label="30秒内接听数：0" value="shanghai" />
                    <el-option label="60秒内接听数：0" value="shanghai" />
                    <el-option label="大于60秒接听数：0" value="shanghai" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-table :key="tableKey" v-loading="listLoading" border :data="list" fit stripe highlight-current-row style="width: 100%;" @sort-change="sortChange" @selection-change="selectionChange">
            <el-table-column label="坐席" prop="id" align="center" min-width="80">
              <template slot-scope="scope"><span>{{ scope.row.set }}</span></template>
            </el-table-column>
            <el-table-column label="状态" prop="id" align="center" min-width="80">
              <template slot-scope="scope"><span>{{ scope.row.status }}</span></template>
            </el-table-column>
            <el-table-column label="状态起始时间" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.datetime }}</span></template>
            </el-table-column>
            <el-table-column label="优先级" align="center" min-width="80">
              <template slot-scope="scope"><span>{{ scope.row.level }}</span></template>
            </el-table-column>
            <el-table-column label="应答数（呼入/呼出）" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.inOut }}</span></template>
            </el-table-column>
            <el-table-column label="拨打数（呼入/呼出）" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.inOut2 }}</span></template>
            </el-table-column>
            <el-table-column label="通话时间（呼入/呼出）" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.inOut3 }}</span></template>
            </el-table-column>
            <el-table-column label="客户号码" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.callInNo }}</span></template>
            </el-table-column>
            <el-table-column label="签入时间" align="center" min-width="180">
              <template slot-scope="scope"><span>{{ scope.row.datetime2 }}</span></template>
            </el-table-column>
            <el-table-column label="距上次通话" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.time }}</span></template>
            </el-table-column>
            <el-table-column label="坐席类型" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.type }}</span></template>
            </el-table-column>
            <el-table-column label="在线状态" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.Status }}</span></template>
            </el-table-column>
          </el-table>
          <el-table :key="tableKey" v-loading="listLoading" border :data="list1" fit stripe highlight-current-row style="width: 100%;" @sort-change="sortChange" @selection-change="selectionChange">
            <el-table-column label="主叫" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.in }}</span></template>
            </el-table-column>
            <el-table-column label="主叫名称" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.name1 }}</span></template>
            </el-table-column>
            <el-table-column label="等待时间" align="center" min-width="150">
              <template slot-scope="scope"><span>{{ scope.row.time }}</span></template>
            </el-table-column>
            <el-table-column label="业务类型" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.type }}</span></template>
            </el-table-column>
            <el-table-column label="业务名" align="center" min-width="100">
              <template slot-scope="scope"><span>{{ scope.row.name2 }}</span></template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { createSettings, updateSettings, fetchList } from '@/api/systemRealTimeMessage/seatGroupMonitoring'
import { mapState } from 'vuex'

export default {
  name: 'SeatGroupMonitoring',
  data() {
    return {
      tableKey: 0,
      list: null,
      list1: null,
      detailList: null,
      selectionList: null,
      total: 0,
      listLoading: true,
      listQuery: {
        name: '',
        type: '',
        page: 1,
        limit: 10
      },
      temp: {// 操作时的临时对象
        id: undefined,
        dictionaryType: '',
        dictionaryName: '',
        dictionaryCode: '',
        remark: ''
      },
      dialogFormVisible: false, // dictionary弹窗的标志
      dialogStatus: '',
      textMap: {// 操作弹窗标题
        update: '编辑',
        create: '新建'
      },
      rules: {// 验证规则
        dictionaryType: [{ required: true, message: '必填项', trigger: 'change' }],
        dictionaryName: [{ required: true, message: '必填项', trigger: 'change' }]
      }
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
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.list1 = response.data.show
        // 模拟延迟
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        dictionaryType: '',
        dictionaryName: '',
        dictionaryCode: '',
        dictionarySort: '',
        remark: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024
          createSettings(this.temp).then(() => {
            this.total = this.list.unshift(this.temp) // 返回长度
            this.dialogFormVisible = false
            this.$message({
              message: '创建成功',
              type: 'success'
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateSettings(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$message({
              message: '更新成功',
              type: 'success'
            })
          })
        }
      })
    },
    handleDelete: function(row) {
      this.$confirm('确认删除选中的记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
    },
    handleBatchDelete() {
      this.$confirm('确认删除选中的记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.selectionList.forEach((r) => this.list.splice(this.list.indexOf(r), 1))
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
    },
    selectionChange(val) {
      this.selectionList = val
    }
  }
}
</script>

