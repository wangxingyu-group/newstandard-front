<template>
  <el-row>
    <el-row>
      <el-card class="box-card">
        <el-col :span="18">
          <full-calendar
            ref="calendar"
            :config="config"
            :events="events"
            @event-selected="eventClick"
            @day-click="dayClick"
          />
          <add-schedule v-if="isAdd" :is-add="isAdd" :edit-item="editItem" :delete-event="deleteEvent" @add="addItem" @close="isAdd = false" />
        </el-col>
        <el-col :span="6">
          <el-scrollbar ref="treeScrollbar" wrap-class="scrollbar-wrapper">
            <div align="center" style="height: 50px">
              详细信息
            </div>
            <div v-for="(item,index) in events" :key="index" style="padding: 10px">
              时间: {{ item.start }} - {{ item.end }} <br>
              内容: {{ item.title }} <br>
              类别: {{ item.flag }} <br>
            </div>
          </el-scrollbar>
        </el-col>
      </el-card>
    </el-row>
  </el-row>
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
        height: '600px', // 高度
        loadEventEnd: true,
        eventLimit: true,
        textColor: '#EDEDED',
        fixedWeekCount: false, // 是否固定显示六周
        header: { // 表头信息
          left: ' ',
          center: 'prevYear, prev, title, next, nextYear',
          right: 'today'
        }
      },
      events: [],
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
  /*.fc {
    background: #4AB7BD;
  }*/
  .box-card {
    background: #1F1F1F;
  }
  .box-card {
    color: white;
  }
</style>
