<!-- 柱状图 -->
<style lang="stylus" scoped>
  .columnChart
    height 800px
    background url('/bg.jpg') no-repeat
    background-size 100% 100%
    color white
    .main
      width 100%
      height calc(100% - 100px)
      margin-top -15px
</style>
<template>
  <div class="columnChart">
    <v-header :name="name" :legend-arr="legendArr" :my-chart="myChart" />
    <v-filter v-if="myChart._dom" :my-chart="myChart" :title="'渠道'" />
    <div class="main" />
  </div>
</template>

<script>
import echarts from 'echarts'
import header from '@/components/demo/monitoring/header/header'
import filter from '@/components/demo/monitoring/filter/filter'
export default {
  components: {
    'v-header': header,
    'v-filter': filter
  },
  data() {
    return {
      legendArr: [],
      color: this.$store.state.color,
      myChart: {},
      name: '实时渠道流量统计'
    }
  },
  mounted() {
    const data = this.genData(50)
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(document.querySelector('.columnChart .main'))
    this.myChart.setOption({
      title: {
        show: false
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        orient: 'vertical',
        x: 'right',
        data: ['微信公众号', '语音平台', '移动APP', '邮件、短信']
      },
      toolbox: {
        show: false
      },
      color: this.color,
      calculable: true,
      series: [
        {
          name: '微信公众号',
          type: 'pie',
          radius: '55%',
          center: ['40%', '50%'],
          data: data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        {
          name: '语音平台',
          type: 'pie',
          radius: '55%',
          center: ['40%', '50%'],
          data: data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        {
          name: '移动APP',
          type: 'pie',
          radius: '55%',
          center: ['40%', '50%'],
          data: data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        {
          name: '邮件、短信',
          type: 'pie',
          radius: '55%',
          center: ['40%', '50%'],
          data: data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
    this.__init()
  },
  methods: {
    genData() {
      return [
        { value: 335, name: '微信公众号' },
        { value: 310, name: '语音平台' },
        { value: 234, name: '移动APP' },
        { value: 135, name: '邮件、短信' }
      ]
    },
    __init() {
      this.legendArr = this.myChart.getOption().series
      this.legendArr.forEach((data) => {
        data.selected = true
      })
      this.$root.charts.push(this.myChart)
      window.addEventListener('resize', function() {
        this.myChart.resize()
      }.bind(this))
    }
  }
}
</script>

