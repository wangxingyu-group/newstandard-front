<template>
  <el-container>
    <el-row>
      <el-col :span="24">
        <el-button @click="prop('客户来电','',false,'keep')">代理人</el-button>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import naranja from 'naranja'
import 'naranja/lib/naranja.min.css'
export default {
  computed: {
    ...mapGetters([
      'device'
    ])
  },
  methods: {
    prop(title, text, icon, timeout) {
      if (this.$store.getters.device !== 'mobile') {
        naranja()['log']({
          title: title,
          text: text,
          icon: icon,
          timeout: timeout,
          buttons: [
            {
              text: '接听',
              click: function(e) {
                // click event close notifiaction
                // unless you use preventClose method
                e.preventClose()
                // if you want close notifiaction
                // manually, use closeNotification
                e.closeNotification()
              }
            }
          ]
        })
      }
    }
  }
}

</script>

