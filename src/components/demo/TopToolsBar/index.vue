<template>
  <div class="wapper">
    <el-input v-model="timeStr" readonly>
      <template slot="prepend">
        <el-select v-model="value" @change="$Timer.start()">
          <el-option
            v-for="item in allStatus"
            :key="item.status"
            :label="item.label"
            :value="item.status"
          />
        </el-select>
      </template>
    </el-input>
    <el-button v-show="showHangUp" class="phone-button mr-10" @click="hangUp()"><img src="./img/satisfaction.png">满意度</el-button>
    <el-input placeholder="电话号码" />
    <el-button class="phone-button"><img src="./img/call-out.png">外呼</el-button>
    <el-button v-if="clientWidth>=minClientWidth" class="phone-button"><img src="./img/consultation.png">咨询</el-button>
    <el-button v-if="clientWidth>=minClientWidth" class="phone-button"><img src="./img/third-party.png">三方</el-button>
    <el-button v-if="clientWidth>=minClientWidth" class="phone-button"><img src="./img/transfer.png">转移</el-button>
    <el-button v-if="clientWidth>=minClientWidth" class="phone-button"><img src="./img/hold-on.png">音乐</el-button>
    <el-button v-if="clientWidth>=minClientWidth" class="phone-button"><img src="./img/mute.png">静音</el-button>

    <el-dropdown v-if="clientWidth<minClientWidth" style="margin-left: 10px;">
      <el-button>功能<i class="el-icon-arrow-down el-icon--right" /></el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item class="phone-button"><img src="./img/call-out.png">咨询</el-dropdown-item>
        <el-dropdown-item class="phone-button"><img src="./img/third-party.png">三方</el-dropdown-item>
        <el-dropdown-item class="phone-button"><img src="./img/transfer.png">转移</el-dropdown-item>
        <el-dropdown-item class="phone-button"><img src="./img/hold-on.png">音乐</el-dropdown-item>
        <el-dropdown-item class="phone-button"><img src="./img/mute.png">静音</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <call-summary :visible="callSummaryVisible" @setCallSummaryVisible="setCallSummaryVisible" />
  </div>
</template>

<script>
import CallSummary from './callSummary'
import { mapGetters } from 'vuex'

export default {
  name: 'TopToolsBar',
  components: { CallSummary },
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
      callSummaryVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'device',
      'clientWidth',
      'minClientWidth',
      'timeStr',
      'showHangUp'
    ])
  },
  methods: {
    hangUp() {
      this.$Timer.stop()
      this.$store.commit('app/SET_SHOW_HANG_UP', false)
      this.setCallSummaryVisible(true)
    },
    setCallSummaryVisible(value) {
      this.callSummaryVisible = value
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
