import { mapGetters } from 'vuex'
import store from '@/store'

export default {
  computed: {
    ...mapGetters([
      'timeStr'
    ])
  },

  h: 0,
  m: 0,
  s: 0,
  ms: 0,
  timeMark: 0,
  timeInterval: null,
  watch: {
    timeStr(value) {
      console.log(value)
    }
  },
  _forward: function(that) {
    return function() {
      that.forward(that)
    }
  },
  forward: function(that) {
    if (new Date().getTime() - that.timeMark > 50) {
      that.ms = that.ms + (new Date().getTime() - that.timeMark)
    } else {
      that.ms = that.ms + 50
    }
    if (that.ms >= 1000) {
      that.ms = 0
      that.s = that.s + 1
    }
    if (that.s >= 60) {
      that.s = 0
      that.m = that.m + 1
    }
    if (that.m >= 60) {
      that.m = 0
      that.h = that.h + 1
    }
    // that.toDub(that.h) + ':' + that.toDub(that.m) + ':' + that.toDub(that.s) + '' + that.toDubms(that.ms) + '毫秒'
    store.commit('app/SET_TIME_STR', that.toDub(that.h) + ':' + that.toDub(that.m) + ':' + that.toDub(that.s))
    that.timeMark = new Date().getTime()
  },

  reset: function() {
    window.clearInterval(this.timeInterval)
    this.timeInterval = null
    this.h = 0
    this.m = 0
    this.ms = 0
    this.s = 0
    store.commit('app/SET_TIME_STR', '00:00:00')
  },

  start: function() {
    if (!this.timeInterval) {
      this.timeMark = new Date().getTime()
      this.timeInterval = window.setInterval(this._forward(this), 50)
    }
  },

  stop: function() {
    window.clearInterval(this.timeInterval)
    this.timeInterval = null
  },

  toDub: function(n) {
    if (n < 10) {
      return '0' + n
    } else {
      return '' + n
    }
  },

  toDubms: function(n) {
    if (n < 10) {
      return '00' + n
    } else {
      return '0' + n
    }
  }
}
