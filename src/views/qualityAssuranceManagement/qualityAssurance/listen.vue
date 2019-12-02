<template>
  <div class="app-container">
    <el-row>
      <el-col>
        <el-card>
          <div slot="header" class="clearfix">
            <audio controls style="width: 100%;margin-top: 30px;">
              <source src="horse.ogg" type="audio/ogg">
              <source src="horse.mp3" type="audio/mpeg">
              您的浏览器不支持 audio 元素。
            </audio>
          </div>
          <el-form :label-position="left" label-width="180px" :model="formLabelAlign">
            <el-form-item v-for="label in labels" :label="label">
              <el-select placeholder="请选择">
                <el-option label="1分" value="1" />
                <el-option label="2分" value="2" />
                <el-option label="3分" value="3" />
                <el-option label="4分" value="4" />
                <el-option label="5分" value="5" />
              </el-select>
            </el-form-item>
            <el-form-item label="质检描述">
              <el-input type="textarea" resize="none" rows="5" placeholder="不多于255个字符" />
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" @click="onSubmit">提交</el-button>
              <el-button @click="$router.back()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import { createPreCustomer, fetchList, updatePreCustomer } from '@/api/demo/chart/chart2'
export default {
  name: 'QueryQualityListen',
  data() {
    return {
      select: '',
      tableKey: 0,
      list: null,
      options: [{
        value: '1',
        label: '已质检'
      }, {
        value: '2',
        label: '已复核'
      }, {
        value: '3',
        label: '已申诉'
      }],
      selectionList: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        sort: '+id'
      },
      temp: {// 操作时的临时对象
        id: undefined,
        name: '',
        gender: 0,
        idNo: undefined,
        callInNo: '',
        callInTime: '',
        customerType: '准客户',
        remark: ''
      },
      labels: null
    }
  },
  created() {
    this.getList()
    this.getLabel()
  },
  methods: {
    getLabel() {
      fetchList(this.listQuery).then(response => {
        this.labels = response.data.items.map(item => item.name)
      })
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
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
        name: '',
        gender: 0,
        idNo: undefined,
        callInNo: '',
        callInTime: '',
        customerType: '准客户',
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
          this.temp.customerType = '准客户'
          createPreCustomer(this.temp).then(() => {
            this.list.unshift(this.temp)
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
          updatePreCustomer(tempData).then(() => {
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
    handleDelete(row) {
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
    },
    confirmCustomer(row) {
      this.$store.confirmCustomer = row
      this.$notify({
        title: row.name,
        message: '确认客户成功',
        type: 'success',
        duration: 2000
      })
    }
  }
}
</script>
