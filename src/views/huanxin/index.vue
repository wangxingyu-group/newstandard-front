<template>
  <div class="app-container">
    <el-card>
      <div style="overflow: hidden">
        <iframe src="https://sinosoft.kefu.easemob.com/mo/agent/webapp/chat" style="width:calc(100% + 205px);height:calc( 100vh - 85px );margin-top:-55px;margin-left: -205px;" />
      </div>
    </el-card>
    <!--<el-card>-->
      <!--<div style="overflow: hidden">-->
        <!--<iframe src="https://sinosoft.kefu.easemob.com/mo/agent/webapp/mynotes" style="width:calc(100% + 205px);height:calc( 100vh - 85px );margin-top:-55px;margin-left: -205px;" />-->
      <!--</div>-->
    <!--</el-card>-->
    <!--<el-card>-->
      <!--<div style="overflow: hidden">-->
        <!--<iframe src="https://sinosoft.kefu.easemob.com/mo/agent/ticket/mytickets/ticketlist" style="width:calc(100% + 205px);height:calc( 100vh - 85px );margin-top:-55px;margin-left: -205px;" />-->
      <!--</div>-->
    <!--</el-card>-->
    <!--<el-card>-->
      <!--<div style="overflow: hidden">-->
        <!--<iframe src="https://sinosoft.kefu.easemob.com/mo/agent/webapp/me" style="width:calc(100% + 205px);height:calc( 100vh - 85px );margin-top:-55px;margin-left: -205px;" />-->
      <!--</div>-->
    <!--</el-card>-->
  </div>

</template>

<script>
export default {
  name: 'Huanxin',
  mounted() {
    this.$nextTick(() => {
      const iframes = document.getElementsByTagName('iframe')
      for (let i = 0; i < iframes.length; i++) {
        const iframe = iframes[i]
        if (iframe.attachEvent) {
          iframe.attachEvent('onload', function() {
            const iframeNode = window.frames['ifra'].document
            // var iwindow = iframe.contentWindow
            iframeNode.getElementsByTagName('html').style.marginLeft = '-500px'
            // console.log(iframeNode)
            // console.log(iwindow.document)
          })
        } else {
          iframe.onload = function() {
            // var iwindow = iframe.contentWindow
            // console.log(iwindow.document.getElementsByTagName('html')[0].style.marginLeft)
            // iwindow.document.getElementsByTagName('html')[0].style.marginLeft = '-500px'
          }
        }
      }
    })
  }
}
</script>

