export default {
  bind(el, binding, vnode) {
    const dragHeaderEl = el.querySelector('.nsf-drag__header')
    dragHeaderEl.style.cssText += ';cursor:move;'
    const dragDom = el.querySelector('.nsf-drag')

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
    }
  }
}
