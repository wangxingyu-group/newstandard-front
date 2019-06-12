import naranja from '@/components/demo/naranja'
import '@/components/demo/naranja/lib/naranja.min.css'

// 添加来电通知
export default {
  components: {
    naranja
  },
  install(Vue) {
    Vue.prototype.callNotification = (device, title, text, icon, timeout, store, notify) => {
      document.onkeydown = function(event) {
        var e = event || window.event
        if (e && e.keyCode === 66) { // 按 b
          if (device !== 'mobile') {
            naranja()['log']({
              title: title.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3') + '【北京】',
              text: text,
              icon: icon,
              timeout: timeout,
              buttons: [
                {
                  text: '接听',
                  click: function(e) {
                    const temp = {// 操作时的临时对象
                      id: 123,
                      name: '张三',
                      gender: 0,
                      idNo: '撒旦法撒旦法23123',
                      callInNo: '1381060758',
                      callInTime: '',
                      customerType: '准客户',
                      remark: ''
                    }
                    store.commit('commonData/SET_CURRENT_CUSTOMER', temp)
                    notify({
                      title: temp.name,
                      message: '当前客户',
                      type: 'success',
                      duration: 2000
                    })
                    e.closeNotification()
                  }
                }
              ]
            })
          }
        }
      }
    }
  }
}
