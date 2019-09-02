<template lang="html">
  <div class="dashboard">
    <div class="flex-container column">
      <div class="item one" style="transform: translate(75.6%,-33.5%) scale(0.33)" @click="clickChart('1')">
        <multipleColumn />
      </div>
      <div class="item two" style="transform: translate(75.6%,0.5%) scale(0.33)" @click="clickChart('2')">
        <v-pie />
      </div>
      <div class="item three" style="transform: translate(75.6%,34.5%) scale(0.33)" @click="clickChart('3')">
        <v-line />
      </div>
      <div class="item four active" style="transform: translate(4.7%, 0) scale(1)" @click="clickChart('4')">
        <point />
      </div>
    </div>
  </div>
</template>

<script>
import column from '@/components/demo/monitoring/column/column'
import line from '@/components/demo/monitoring/line/line'
import pie from '@/components/demo/monitoring/pie/pie'
import multipleColumn from '@/components/demo/monitoring/multipleColumn/multipleColumn'
import point from '@/components/demo/monitoring/point/point'

export default {
  components: {
    column,
    multipleColumn,
    point,
    'v-line': line,
    'v-pie': pie
  },
  data() {
    return {
      items: []
    }
  },
  mounted() {
    this.__init()
  },
  methods: {
    _resize() {
      this.$root.charts.forEach((myChart) => {
        myChart.resize()
      })
    },
    __init() {
      this.items = document.querySelectorAll('.flex-container .item')
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].dataset.order = i + 1
      }
    },
    clickChart(clickIndex) {
      const activeItem = document.querySelector('.flex-container .active')
      const activeIndex = activeItem.dataset.order
      const clickItem = this.items[clickIndex - 1]
      if (activeIndex === clickIndex) {
        return
      }
      activeItem.classList.remove('active')
      clickItem.classList.add('active')
      this._setStyle(clickItem, activeItem)
    },
    _setStyle(el1, el2) {
      const transform1 = el1.style.transform
      const transform2 = el2.style.transform
      el1.style.transform = transform2
      el2.style.transform = transform1
    }
  }
}

</script>

<style lang="stylus" scoped>
  *
    box-sizing: border-box;
  .point,.multipleColumn,.columnChart,.line
    height 100%!important
    width 100%!important
    background none!important
  .item
    padding: 0px;
    margin: 0px;
    width: 68%;
    height: 100%;
    position absolute
    transform scale(0.33)
    text-align: center;
    transition:all 0.8s;
    background rgba(32, 32, 35, 0.5)
  .dashboard
    position relative
    width 100%
    height calc(100vh - 86px)
    margin:0px;
    padding:0px;
    padding-top 5%
    background url('/bg.jpg');
    background-size 100% 100%
  .flex-container.column
    position relative
    height: 90%;
    width: 90%;
    overflow: hidden;
    margin:  0 auto 100px auto;
    box-sizing: content-box;
  .active
    height 100%
    width: 69%;
    margin-left: 10px;
    line-height: 300px;
</style>
