<template>
  <el-dialog
    title="待办事项"
    center
    :show-close="false"
    :visible.sync="isAdd"
    width="500px"
  >
    <el-form ref="formDetail" :model="formDetail" :rules="rules" label-width="80px" class="demo-ruleForm">
      <el-form-item label="假日名称" prop="title">
        <el-select v-model="formDetail.title" placeholder="请选择">
          <el-option v-for="(item,index) in titles" :key="index" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="日期标志" prop="flag">
        <el-select v-model="formDetail.flag" placeholder="请选择">
          <el-option v-for="(item,index) in flags" :key="index" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="日期" prop="period">
        <el-date-picker
          v-model="formDetail.period"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button v-show="isShow" type="primary" @click="deleteDetail">删除数据</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
      <el-button @click="turnOff">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: ['isAdd', 'editItem', 'deleteEvent'],
  data() {
    return {
      rules: {
        title: [{ required: true, message: '请输入假日名称' }],
        flag: [{ required: true, message: '请输入日期标志' }],
        period: [{ required: true, message: '请输入日期' }]
      },
      formDetail: {
        id: '',
        title: '',
        flag: '',
        period: []
      },
      titles: ['元旦', '春节', '劳动节', '端午节', '国庆节', '清明节', '中秋节', '春节调休工作日', '端午节调休工作日'],
      flags: ['节假日', '特殊工作日'],
      isShow: false
    }
  },
  created() {
    if (this.editItem.id) { // 编辑并且只会执行一次
      this.formDetail.id = this.editItem.id
      this.formDetail.title = this.editItem.title
      this.formDetail.flag = this.editItem.flag
      this.formDetail.period[0] = this.editItem.start._i
      this.formDetail.period[1] = this.editItem.end._i
      if (this.editItem.id !== '') {
        this.isShow = true
      }
    }
  },
  methods: {
    submit() {
      this.$refs['formDetail'].validate((valid) => {
        if (valid) {
          this.$emit('add', JSON.stringify(this.formDetail))
          this.$emit('close')
        }
      })
    },
    turnOff() {
      this.$emit('close')
    },
    deleteDetail() {
      this.deleteEvent(this.editItem.id)
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-date-editor{
    width:100%;
  }
</style>
