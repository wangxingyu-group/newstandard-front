<template>
  <el-dialog title="通话总结" :visible.sync="callSummaryVisible" width="768px" :close-on-click-modal="false" @close="close">
    <el-scrollbar wrap-class="hidden-scroll-x dialog-scroll-warp-height">
      <el-form ref="personSearchForm" :model="query" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="通话分类">
              <el-select v-model="query.params.type" style="width:100%;min-width:135px" placeholder="通话分类">
                <el-option label="新契约" value="shanghai" />
                <el-option label="回访" value="shanghai" />
                <el-option label="申诉" value="shanghai" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="通话小结" prop="remark">
          <el-input v-model="query.record.callSummary" type="textarea" resize="none" rows="5" placeholder="不多于255个字符" />
        </el-form-item>
      </el-form>
    </el-scrollbar>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="()=>{this.$emit('setCallSummaryVisible', false)}">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'CallSummary',
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      callSummaryVisible: this.visible,
      query: {
        record: {
          callSummary: ''
        },
        params: {
          type: ''
        }
      }
    }
  },
  watch: {
    visible(value) { // 监听visible
      this.callSummaryVisible = value
    }
  },
  methods: {
    close() {
      this.$emit('setCallSummaryVisible', false)
    }
  }
}
</script>
