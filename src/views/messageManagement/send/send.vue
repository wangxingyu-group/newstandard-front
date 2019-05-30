<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>发送短信</span>
    </div>
<div style="height:calc(100vh - 201px);overflow: scroll">
  <el-row>
    <el-col :span="20" :offset="2">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="提示">
          <span>短信发送受到运营商网络影响，并不能保证100%发送成功，且无法保证短信及时接收，因此如果短信内容对您的客户非常重要， 请随后用电话与客户确认信息是否收到。接收人填写格式为：(姓名)手机号，多个之间用英文分号;隔开，如(小明)13588888888;(小红)13812333333</span>
        </el-form-item>
        <el-form-item label="发送手机号" label-width="100px">
          <el-input v-model="form.sendNo" rows="5" type="textarea" resize="none" />
        </el-form-item>
        <el-form-item label="范文名称" label-width="100px">
          <el-select v-model="form.template" filterable placeholder="请选择">
            <el-option
              v-for="item in template"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="短信内容" label-width="100px">
          <el-input v-model="form.content" rows="10" type="textarea" resize="none" />
        </el-form-item>
        <el-form-item label="" label-width="100px">
          <div class="fr" style="color:#ff4949">
            <span>请勿发送营销色彩短信 每条短信最多允许输入240个字，还能输入：240字</span>
          </div>
        </el-form-item>
        <el-form-item label="" label-width="100px">
          <div class="fr">
            <el-button type="primary">发送短信</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</div>
  </el-card>
</template>

<script>
export default {
  name: 'Send',
  props: {
    form: {
      type: Object,
      required: true
    },
    template: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
