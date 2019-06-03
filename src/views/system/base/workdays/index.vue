<template>
  <div class="hello">
    <el-date-picker v-model="selectDate" size="small" type="month" placeholder="选择月" value-format="yyyy-MM" />
    <el-button size="small" @click="changeDate">确定</el-button>
    <full-calendar
      ref="calendar"
      :config="config"
      :events="events"
      @event-selected="eventClick"
      @day-click="dayClick"
    />
    <add-schedule v-if="isAdd" :is-add="isAdd" :edit-item="editItem" :delete-event="deleteEvent" @add="addItem" @close="isAdd = false" />
  </div>
</template>
<script>
import { FullCalendar } from 'vue-full-calendar'
import 'fullcalendar/dist/fullcalendar.css'
import addSchedule from './add.vue'
import { fetchList } from '@/api/demo/system/base/holiday/holiday'
export default {
  name: 'Holiday',
  components: { FullCalendar, addSchedule },
  data() {
    return {
      isAdd: false,
      selectDate: '', // 日期选择器选中的月份
      config: {
        firstDay: '0', // 以周日为每周的第一天
        weekends: true, // 是否在日历中显示周末
        locale: 'zh-cn', // 语言
        defaultView: 'month', // 默认按月显示
        height: 'auto', // 高度
        fixedWeekCount: true, // 是否固定显示六周
        // weekMode:"liquid",//周数不定，每周的高度可变，整个日历高度不变
        allDaySlot: false,
        // allDay:true,
        header: { // 表头信息
          left: 'prev, next, today',
          center: 'title',
          right: 'hide, custom'
        }
      },
      events: [{
        id: 1,
        title: '出差',
        flag: '节假日',
        start: '2019-06-03',
        end: '2019-06-05'
      }, {
        id: 2,
        title: '春游',
        flag: '节假日',
        start: '2019-06-12'
      }],
      newItem: {},
      editItem: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      fetchList(this.listQuery).then(response => {
        this.events = response.data.items
        // 模拟延迟
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      })
    },
    changeDate() {
      // this.$refs.calendar.fireMethod('gotoDate', this.selectDate)
      this.$refs.calendar.fireMethod('prev')
    },
    eventClick(event) { // events的点击事件
      this.editItem = event
      this.isAdd = true
    },
    dayClick(date, jsEvent, view) { // 日期的点击事件
      this.editItem = {}
      this.isAdd = true
    },
    addItem(detail) {
      this.newItem = JSON.parse(detail)
      if (this.editItem.id) { // 如果是编辑，就删掉该条
        this.events.forEach((el, ind) => {
          if (el.id === this.editItem.id) {
            this.events.splice(ind, 1)
          }
        })
      }
      this.events.push({
        id: this.editItem.id ? this.editItem.id : this.setUuid(),
        title: this.newItem.title,
        start: this.newItem.period[0],
        end: this.newItem.period[1]
      })
    },
    setUuid() {
      var s = []
      var hexDigits = '0123456789abcdef'
      for (var i = 0; i < 36; i++) { s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1) }
      s[14] = '4'
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
      s[8] = s[13] = s[18] = s[23]
      var uuid = s.join('')
      return uuid
    },
    deleteEvent(Array) {
      this.$confirm('确认删除选中的记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.events.forEach((el, ind) => {
          if (el.id === Array) {
            this.events.splice(ind, 1)
          }
        })
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
    }

  }
}
</script>

<style scoped>
</style>
