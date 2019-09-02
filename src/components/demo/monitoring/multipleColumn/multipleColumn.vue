<!-- 折线图 -->
<style lang="stylus" scoped>
.multipleColumn
  height 1000px
  background url('/bg.jpg') no-repeat
  background-size 100% 100%
  .main
    width 100%
    height calc(100% - 100px)
    margin-top -15px
</style>

<template>
  <div class="multipleColumn">
    <v-header :name="name" :legend-arr="legendArr" :my-chart="myChart"/>
    <v-filter v-if="myChart._dom" :my-chart="myChart" :title="'产品'" />
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
      styleArr: [],
      myChart: {},
      name: '实时工单趋势分析'
    }
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(document.querySelector('.multipleColumn .main'))
    this.myChart.setOption({
      title: {
        show: false
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        show: false
      },
      toolbox: {
        show: false
      },
      color: this.color,
      calculable: true,
      xAxis: [{
        name: '产品',
        type: 'category',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.69)'
        },
        axisLabel: {
          textStyle: {
            color: 'white'
          }
        },
        data: ['济南分公司', '成都分公司', '上海分公司', '北京分公司', '广州分公司']
      }],
      yAxis: [{
        axisLine: {
          show: false
        },
        nameLocation: 'end',
        nameGap: 20,
        nameRotate: 0,
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: ['rgba(230, 230, 230, 0.2)']
          }
        },
        axisLabel: {
          textStyle: {
            color: 'white',
            fontSize: 14
          }
        },
        name: '数量',
        type: 'value',
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.69)'
        }
      }],
      series: [{
        name: '投诉',
        stack: 'stack1',
        type: 'bar',
        data: [2.0, 4.9, 5.9, 3, 6],
        barWidth: 16,
        barGap: 0
      }, {
        name: '咨询',
        stack: 'stack2',
        type: 'bar',
        data: [2.6, 5.9, 3.6, 6, 8],
        barWidth: 16,
        barGap: 0
      }, {
        name: '续保',
        stack: 'stack3',
        type: 'bar',
        data: [2.0, 6.4, 6.0, 4, 5],
        barWidth: 16,
        barGap: 0
      }, {
        name: '退保',
        stack: 'stack1',
        type: 'bar',
        data: [4.0, 5.9, 3, 3, 6],
        barWidth: 16,
        barGap: 0
      }]
    })
    this.__init()
  },
  methods: {
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
