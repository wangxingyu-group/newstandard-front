<!-- 散点图 -->
<template lang="html">
  <div class="heat">
    <v-header :name="name" :legend-arr="legendArr" :my-chart="myChart" />
    <div class="main" />
  </div>
</template>

<script>
import axios from 'axios'
import echarts from 'echarts'
import china from 'echarts/map/js/china'
import header from 'components/header/header'

export default {
  components: {
    'v-header': header
  },
  data() {
    return {
      legendArr: [],
      color: this.$store.state.color,
      myChart: {},
      geoCoordMap: {},
      name: '热力图'
    }
  },
  created() {
    this._getCityData()
  },
  mounted() {
    axios.get('static/data/heat/testData.json').then((res) => {
      const options = {
        title: {
          text: '全国主要城市空气质量',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        backgroundColor: '#404a59',
        visualMap: {
          min: 0,
          max: 500,
          splitNumber: 5,
          inRange: {
            color: ['#d94e5d', '#eac736', '#50a3ba'].reverse()
          },
          textStyle: {
            color: '#fff'
          }
        },
        geo: {
          map: 'china',
          label: {
            emphasis: {
              show: false
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#323c48',
              borderColor: '#111'
            },
            emphasis: {
              areaColor: '#2a333d'
            }
          }
        },
        series: [{
          name: 'AQI',
          type: 'heatmap',
          coordinateSystem: 'geo',
          data: this.convertData(res.data)
        }]
      }
      window.onresize = this.myChart.resize
      this._init(options)
    })
  },
  methods: {
    _init(options) {
      this.myChart = echarts.init(document.querySelector('.heat .main'))
      this.myChart.setOption(options)
      this.legendArr = options.series
      this.legendArr.forEach((data) => {
        data.selected = true
      })
    },
    _getCityData() {
      axios.get('/data/cityData.json').then((res) => {
        this.geoCoordMap = res.data
      })
    },
    convertData(data) {
      const res = []
      for (let i = 0; i < data.length; i++) {
        const geoCoord = this.geoCoordMap[data[i].name]
        if (geoCoord) {
          res.push(geoCoord.concat(data[i].value))
        }
      }
      return res
    }
  }
}

</script>

<style lang="stylus" scoped>
.heat
  height 800px
  .main
    height 400px
</style>
