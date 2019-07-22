export default {
  createElement: function(tag, classes) {
    const $HTMLElement = document.createElement(tag)
    if (classes) {
      classes.forEach(function(className) {
        $HTMLElement.classList.add(className)
      })
    }
    return $HTMLElement
  },
  createText: function(text) {
    return document.createTextNode(text)
  },
  setSideUpAnimation: function(finalNotification) {
    setTimeout(function() {
      const notificationHeight = finalNotification.querySelector('.naranja-body-notification').offsetHeight
      finalNotification.style.height = notificationHeight + 'px'
    }, 0)
  }
}
