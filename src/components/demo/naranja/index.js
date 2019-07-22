/**
 * 来电通知组件
 */
import notification from './notification'
import common from './common'

export default {
  log: function(options) {
    this.prepare()
    notification.create(this.$notificationContainer, this.$notificationAdvice, options)
  },
  $notificationContainer: document.querySelector('.naranja-notification-box'),
  $notificationAdvice: document.querySelector('.naranja-notification-advice'),
  prepare: function() {
    if (!this.$notificationContainer) {
      this.$notificationContainer = common.createElement('div', ['naranja-notification-box'])
      this.$notificationAdvice = common.createElement('div', ['naranja-notification-advice'])
      this.$notificationAdvice.addEventListener('click', function() {
        this.$notificationContainer.scrollTop = 0
      }.bind(this))
      this.$notificationContainer.appendChild(this.$notificationAdvice)
      document.body.appendChild(this.$notificationContainer)
      Object.getPrototypeOf(this.$notificationContainer).unshift = function(node) {
        this.insertBefore(node, this.childNodes[0])
      }
      this.$notificationContainer.addEventListener('scroll', function(e) {
        if (e.currentTarget.scrollTop < 20) {
          this.$notificationAdvice.classList.remove('active')
        }
      }.bind(this))
    }
  }
}
