<template>
  <div class="wapper">
    <el-input v-model="timeStr" readonly>
      <template slot="prepend">
        <el-select v-model="value" @change="start">
          <el-option
            v-for="item in allStatus"
            :key="item.status"
            :label="item.label"
            :value="item.status"
          />
        </el-select>
      </template>
    </el-input>
    <el-input placeholder="电话号码" />
    <el-button class="phone-button"><img src="./img/call-out.png">外呼</el-button>
    <el-button v-if="clientWidth>=minClientWidth" class="phone-button"><img src="./img/consultation.png">咨询</el-button>
    <el-button v-if="clientWidth>=minClientWidth" class="phone-button"><img src="./img/third-party.png">三方</el-button>
    <el-button v-if="clientWidth>=minClientWidth" class="phone-button"><img src="./img/transfer.png">转移</el-button>
    <el-button v-if="clientWidth>=minClientWidth" class="phone-button"><img src="./img/hold-on.png">音乐</el-button>
    <el-button v-if="clientWidth>=minClientWidth" class="phone-button"><img src="./img/mute.png">静音</el-button>
    <el-button v-if="clientWidth>=minClientWidth" class="phone-button"><img src="./img/satisfaction.png">满意度</el-button>
    <svg-icon icon-class="peoples" class-name="card-panel-icon" />
    <el-dropdown v-if="clientWidth<minClientWidth" style="margin-left: 10px;">
      <el-button>功能<i class="el-icon-arrow-down el-icon--right" /></el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item class="phone-button"><img src="./img/call-out.png">咨询</el-dropdown-item>
        <el-dropdown-item class="phone-button"><img src="./img/third-party.png">三方</el-dropdown-item>
        <el-dropdown-item class="phone-button"><img src="./img/transfer.png">转移</el-dropdown-item>
        <el-dropdown-item class="phone-button"><img src="./img/hold-on.png">音乐</el-dropdown-item>
        <el-dropdown-item class="phone-button"><img src="./img/mute.png">静音</el-dropdown-item>
        <el-dropdown-item class="phone-button"><img src="./img/satisfaction.png">满意度</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      allStatus: [{
        status: '1',
        label: '就绪'
      }, {
        status: '2',
        label: '忙碌'
      }, {
        status: '3',
        label: '间休'
      }],
      value: '2',
      timeStr: '',
      h: 0,
      m: 0,
      s: 0,
      ms: 0,
      timeMark: 0,
      timer: null
    }
  },
  computed: {
    ...mapGetters([
      'device',
      'clientWidth',
      'minClientWidth'
    ])
  },
  mounted() {
    this.start()
  },
  methods: {
    forward() {
      if (new Date().getTime() - this.timeMark > 50) {
        this.ms = this.ms + (new Date().getTime() - this.timeMark)
      } else {
        this.ms = this.ms + 50
      }
      if (this.ms >= 1000) {
        this.ms = 0
        this.s = this.s + 1
      }
      if (this.s >= 60) {
        this.s = 0
        this.m = this.m + 1
      }
      if (this.m >= 60) {
        this.m = 0
        this.h = this.h + 1
      }
      this.timeStr = this.toDub(this.h) + ':' + this.toDub(this.m) + ':' + this.toDub(this.s) + ''/* +this.toDubms(this.ms)+"毫秒"*/
      this.timeMark = new Date().getTime()
    },

    reset() {
      clearInterval(this.timer)
      this.h = 0
      this.m = 0
      this.ms = 0
      this.s = 0
      this.timeStr = '00:00:00'
    },

    start() {
      if (!this.timer) {
        this.timeMark = new Date().getTime()
        this.timer = setInterval(this.forward, 50)
      }
    },

    stop() {
      clearInterval(this.timer)
    },

    toDub(n) {
      if (n < 10) {
        return '0' + n
      } else {
        return '' + n
      }
    },

    toDubms(n) {
      if (n < 10) {
        return '00' + n
      } else {
        return '0' + n
      }
    }
  }
}
</script>

<style scoped>
  .wapper {
    width: calc(100% - 8rem);
    height: 100%;
    margin-left: 3rem;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-select {
    width: 6rem;
    min-width: 6rem;
  }

  .el-input {
    width: 12rem;
    min-width: 12rem;
    margin-right: 10px;
  }

  .phone-button {
    padding: 5px 10px;
  }

  .phone-button img {
    vertical-align: middle;
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 4px;
  }
</style>
