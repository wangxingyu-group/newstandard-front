<template>
  <ul  class="list" :style="stylesWrap" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <template v-for="(item, index) in marqueeList">
      <li ref="li" :key="index" class="row" :style="stylesItem" @transitionend="onTransitionend">
        {{ item }}
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  name: 'Marquee',
  props: {
    width: { // 宽度
      type: String,
      default: '200px'
    },
    height: { // 高度
      type: String,
      default: '38px'
    },
    color: { // 字体颜色
      type: String,
      default: '#fff'
    },
    fontSize: { // 字体大小
      type: String,
      default: '12px'
    },
    showSpeed: { // 下滑速度
      type: Number,
      validator(val) { return /^\d+$/.test(val) },
      default: 30
    },
    pauseTime: { // 切换间隔时间(ms)
      type: Number,
      validator(val) { return /^\d+$/.test(val) },
      default: 2500
    },
    scrollSpeed: { // 滚动速度
      type: Number,
      validator(val) { return /^\d+$/.test(val) },
      default: 60
    },
    pauseOnHover: { // 悬停时暂停
      type: Boolean,
      default: false
    },
    marqueeList: { // 内容
      type: Array,
      default: function() { return [] }
    },
    showTimes: {
      type: Number,
      validator(val) { return /^\d+$/.test(val) },
      default: 3
    }
  },
  data() {
    return {
      current: -1,
      stylesWrap: { // ul样式
        width: this.width,
        height: this.height
      },
      stylesItem: { // li样式
        height: this.height,
        lineHeight: this.height,
        color: this.color,
        fontSize: this.fontSize
      },
      scrollHeight: 0,
      status: 'slideIn', // 切换动作
      paused: false, // 暂停
      delay: this.pauseTime, // 显示时间
      scrollLeftTransform: '', // 滚动的位置
      eventTag: 0,
      slideOutFn: null, // 滑出方法
      alreadyTimes: 0 // 已经显示次数
    }
  },
  watch: {
    marqueeList(val) {
      if (val.length > 0) {
        this.init()
      }
    }
  },
  mounted() {
    if (this.marqueeList.length > 0) {
      this.init()
    }
  },
  activated() {
    if (this.marqueeList.length > 0) {
      this.paused = false
      this.init()
    }
  },
  deactivated() {
    this.current = -1
    this.paused = true
  },
  destroyed() {
    this.current = -1
    this.paused = true
  },
  methods: {
    init() {
      this.mqLength = this.marqueeList.length
      this.scrollHeight = this.height.replace(/[^0-9]/gi, '')
      this.$nextTick(() => {
        this.showNext()
      })
    },
    showNext() {
      this.status = 'slideIn'
      this.delay = this.pauseTime
      this.current++

      if (this.current >= this.mqLength) {
        this.current = 0
      }

      const li = this.$refs.li[this.current]
      li.style.transition = 'all 0s linear'
      li.style.transform = 'translate(0px, -100%)'
      li.style.visibility = 'hidden'

      const duration = this.scrollHeight / this.showSpeed
      setTimeout(() => {
        li.style.transition = `all ${duration}s linear`
        li.style.transform = 'translate(0px, 0px)'
        li.style.visibility = 'visible'
      }, 0)
    },
    onTransitionend() {
      if (this.eventTag === 0) { // 防止重复执行
        this.eventTag = 1
        setTimeout(() => {
          this.eventTag = 0
        }, 100)
      } else {
        return
      }

      if (this.alreadyTimes === this.showTimes) {
        this.$emit('destroy')
        return
      }

      const li = this.$refs.li[this.current]

      switch (this.status) {
        case 'slideIn':
          if (!this.paused) {
            this.timeOut(li)
          }
          break
        case 'slideOut':
          this.showNext()
          break
        case 'scrollLeft':
          this.showNext()
          break
      }
    },
    onMouseenter() {
      if (!this.pauseOnHover === true) return false
      this.paused = true
      if (this.slideOutFn) {
        clearTimeout(this.slideOutFn)
      }
      const li = this.$refs.li[this.current]
      switch (this.status) {
        case 'slideIn':
        case 'slideOut':
          break
        case 'scrollLeft': {
          // 记录暂停时滚动的位置
          this.scrollLeftTransform = window.getComputedStyle(li).transform
          li.style.transition = 'all 0s linear'
          li.style.transform = this.scrollLeftTransform
          break
        }
      }
    },
    onMouseleave() {
      if (!this.pauseOnHover === true) return false
      this.paused = false
      li = this.$refs.li[this.current]
      this.timeOut(li)
      let li = this.$refs.li[this.current]
      switch (this.status) {
        case 'slideIn': {
          const transform = window.getComputedStyle(li).transform
          let slideInMatrix
          if (!!window.ActiveXObject || 'ActiveXObject' in window) {
            // IE
            slideInMatrix = new MSCSSMatrix(transform)
          } else {
            // WebKit
            slideInMatrix = new WebKitCSSMatrix(transform)
          }
          // 进入过程中不执行切换，进入完成才切换
          if (slideInMatrix.m42 >= 0) {
            this.delay = 0
            this.onTransitionend()
          }
          break
        }
        case 'slideOut':
          break
        case 'scrollLeft': {
          let scrollLeftMatrix
          if (!!window.ActiveXObject || 'ActiveXObject' in window) {
            // IE
            scrollLeftMatrix = new MSCSSMatrix(this.scrollLeftTransform)
          } else {
            // WebKit
            scrollLeftMatrix = new WebKitCSSMatrix(this.scrollLeftTransform)
          }
          // 去掉已经滚动的长度，再计算时间
          const translateX = li.scrollWidth + scrollLeftMatrix.m41
          const duration = translateX / this.scrollSpeed
          li.style.transition = `all ${duration}s linear`
          li.style.transform = `translate(-${li.scrollWidth}px, 0px)`
          li.style.visibility = 'visible'
          break
        }
      }
    },
    timeOut(li) {
      if (this.current === this.$refs.li.length - 1) {
        this.alreadyTimes++
      }
      if (li.scrollWidth > li.clientWidth) {
        this.status = 'scrollLeft'
        // 左移
        this.slideOutFn = setTimeout(() => {
          const duration = li.scrollWidth / this.scrollSpeed
          li.style.transition = `all ${duration}s linear`
          li.style.transform = `translate(-${li.scrollWidth}px, 0px)`
          li.style.visibility = 'visible'
        }, 500)
      } else {
        this.status = 'slideOut'
        // 下移动至底部不可见区域
        this.slideOutFn = setTimeout(() => {
          const duration = this.scrollHeight / this.showSpeed
          li.style.transition = `all ${duration}s linear`
          li.style.transform = 'translate(0px, 100%)'
          li.style.visibility = 'hidden'
        }, this.delay)
      }
    }
  }
}
</script>

<style>
.list {
  overflow: hidden;
  position: relative;
  width: 100%;
  display: inline-block;
}

.row {
  display: block;
  white-space: nowrap;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(0px, -100%);
}
</style>
