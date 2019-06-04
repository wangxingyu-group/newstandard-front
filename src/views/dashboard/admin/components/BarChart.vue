<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

const animationDuration = 6000

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '满意',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [17, 15, 30, 43, 49, 43, 32],
          animationDuration
        }, {
          name: '一般',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [2, 5, 4, 4, 4, 4, 2],
          color:['#FFB980'],
          animationDuration
        }, {
          name: '很差',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [0, 1, 2, 3, 4, 4, 2],
          color:['#D87A80'],
          animationDuration
        }]
      })
    }
  }
}
</script>
