export default {
  bind(el, binding, vnode) {
    // const dragDom = el.querySelector('.nsf-drag')
    const dragHeaderEl = el.querySelector('.nsf-drag__header')
    dragHeaderEl.style.cssText += ';cursor:move;'

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const getStyle = (function() {
      if (window.document.currentStyle) {
        return (dom, attr) => dom.currentStyle[attr]
      } else {
        return (dom, attr) => getComputedStyle(dom, false)[attr]
      }
    })()

    dragHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - el.offsetLeft
      const disY = e.clientY - el.offsetTop

      const screenWidth = document.body.clientWidth
      const screenHeight = document.body.clientHeight

      let elWidth = getStyle(el, 'width')
      let elHeight = getStyle(el, 'height')
      if (elWidth.includes('%')) {
        elWidth = +document.body.clientWidth * (+elWidth.replace(/\%/g, '') / 100)
        elHeight = +document.body.clientHeight * (+elHeight.replace(/\%/g, '') / 100)
      } else {
        elWidth = elWidth.replace(/\px/g, '')
        elHeight = elWidth.replace(/\px/g, '')
      }
      const maxLeft = screenWidth - elWidth
      const maxTop = screenHeight - elHeight
      document.onmousemove = function(e) {
        let left = e.clientX - disX
        let top = e.clientY - disY
        console.log('disX:' + disX + ', disY:' + disY)
        console.log('left:' + left + ', top:' + top)
        console.log('screenWidth:' + screenWidth + ', screenHeight:' + screenHeight)
        if (left < 0) {
          left = 0
        } else if (left > maxLeft) {
          left = maxLeft
        }
        if (top < 0) {
          top = 0
        } else if (top > maxTop) {
          top = maxTop
        }
        el.style.cssText += `;left:${left}px;top:${top}px;`
      }

      document.onmouseup = function(e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}
