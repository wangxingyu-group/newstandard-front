import naranja from '@/components/demo/naranja'
import '@/components/demo/naranja/lib/naranja.min.css'

// 添加来电通知
exports.install = function(Vue, options) {
  Vue.prototype.callNotification = (device, title, text, icon, timeout) => {
    document.onkeydown = function(event) {
      var e = event || window.event
      if (e && e.keyCode === 67) { // 按 c
        if (device !== 'mobile') {
          naranja()['log']({
            title: title.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3'),
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
}
