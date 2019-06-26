<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

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
      default: '500px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      sidebarElm: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })

    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHandler)
    }

    // 监听侧边栏的变化
    this.sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHandler)
    }

    this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)

    this.chart.dispose()
    this.chart = null
  },
  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    },
    setOptions({ voiceData, onlineData, inData, talk, waite, num } = {}) {
      this.chart.setOption({
        xAxis: {
          data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['在线客服数', '坐席登录数', '坐席迁入数', '通话数', '等待数', '坐席手动暂停数']
        },
        series: [{
          name: '在线客服数', itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: voiceData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '坐席登录数',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: onlineData,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        },
        {
          name: '坐席迁入数',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#131f80',
              lineStyle: {
                color: '#131f80',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: inData,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        },
        {
          name: '通话数',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#FFFF00',
              lineStyle: {
                color: '#FFFF00',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: talk,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        },
        {
          name: '等待数',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#00FF7F',
              lineStyle: {
                color: '#00FF7F',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: waite,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        },
        {
          name: '坐席手动暂停数',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#00BFFF',
              lineStyle: {
                color: '#00BFFF',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: num,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>
