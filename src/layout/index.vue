<template>
  <div :class="classObj" class="app-wrapper">

    <div
      v-show="showDrag"
      v-nsf-drag
      class="nsf-drag"
      style="
      width:300px;
      position: absolute;
    top: 30%;
    left:70%;
    z-index: 10000;"
    >
      <el-card class="nsf-drag__handler">
        <div slot="header" class="clearfix">
          客户概要信息
          <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click="closeDrag"><i class="el-dialog__close el-icon el-icon-close" /></button>
        </div>
        <el-form ref="form" label-width="80px">
          <el-form-item label="姓名:">
            张三
          </el-form-item>
          <el-form-item label="性别:">
            男
          </el-form-item>
          <el-form-item label="来电号码:">
            13810680345
          </el-form-item>
          <el-form-item label="地区:">
            北京
          </el-form-item>
          <el-form-item label="身份证号:">
            152106198903040034
          </el-form-item>
          <el-form-item label="来电时间:">
            2019-05-16 14:05:34
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <right-panel v-if="showSettings">
        <el-card style="height: 100vh;">
          <div slot="header" class="clearfix">
            坐席状态监控
            <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click="closeRightPanel"><i class="el-dialog__close el-icon el-icon-close" /></button>
          </div>
          <el-form>
            <el-form-item label="坐席状态" prop="seatsStatus">
              <el-select v-model="seatsStatus" :popper-append-to-body="false">
                <el-option label="空闲" value="空闲" />
                <el-option label="通话中" value="通话中" />
                <el-option label="间休" value="间休" />
                <el-option label="忙碌" value="忙碌" />
                <el-option label="离线" value="离线" />
              </el-select>
            </el-form-item>
            <el-table :data="seatsList" height="calc(100vh - 270px)" fit stripe highlight-current-row style="width: 100%;" @sort-change="()=>{}" @selection-change="()=>{}">
              <el-table-column label="坐席姓名" prop="phoneNo" align="center" min-width="100">
                <template slot-scope="scope"><span>{{ scope.row.name }}</span></template>
              </el-table-column>
              <el-table-column label="状态" prop="phoneNo" sortable="custom" align="center" min-width="80">
                <template slot-scope="scope"><span>{{ scope.row.status }}</span></template>
              </el-table-column>
            </el-table>
            <pagination layout="prev, pager, next" :total="total" :page.sync="page" :limit.sync="limit" @pagination="[]" />
          </el-form>
        </el-card>
      </right-panel>
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapGetters, mapState } from 'vuex'
import Pagination from '@/components/Pagination'
import nsfDrag from '@/directive/nsf-drag' // base on element-ui
export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    // Settings,
    Sidebar,
    TagsView,
    Pagination
  },
  directives: { nsfDrag },
  mixins: [ResizeMixin],
  data() {
    return {
      showDrag: false,
      total: 500,
      page: 1,
      limit: 20,
      seatsStatus: '空闲',
      seatsList: [
        { name: '张三', status: '空闲' },
        { name: '李四', status: '通话中' },
        { name: '王五', status: '忙碌' },
        { name: '赵六', status: '间休' },
        { name: '李星', status: '离线' },
        { name: '张丽', status: '忙碌' },
        { name: '李德才', status: '间休' },
        { name: '张立东', status: '通话中' },
        { name: '王建新', status: '通话中' },
        { name: '张丽艳', status: '忙碌' },
        { name: '张丽艳', status: '忙碌' },
        { name: '张丽艳', status: '忙碌' },
        { name: '张丽艳', status: '忙碌' },
        { name: '张丽艳', status: '忙碌' },
        { name: '张丽艳', status: '忙碌' },
        { name: '张丽艳', status: '忙碌' },
        { name: '王夏丽', status: '空闲' }

      ]
    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    ...mapGetters([
      'device',
      'callInNo'
    ]),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  created() {
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key.toUpperCase() === 'L' || e.keyCode === 76)) {
        this.showDrag = !this.showDrag
      }
    })
  },
  mounted() {
    this.callNotification(this.device, this.callInNo, null, false, 'keep', this.$store, this.$notify)
    this.$store.commit('commonData/SET_CLIENT_WIDTH', `${document.documentElement.clientWidth}`)
    window.onresize = () => {
      this.$store.commit('commonData/SET_CLIENT_WIDTH', `${document.documentElement.clientWidth}`)
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    closeRightPanel() {
      this.$store.commit('commonData/SET_RIGHT_PANEL_SHOW', false)
    },
    closeDrag() {
      this.showDrag = false
    }
  }
}
</script>
<style>
  .touchCustomer{
    width: 500px;
    height:500px;
    background-color: red;
    position: absolute;
    top: 200px;
    left:100px;
    z-index: 10000;
  }
</style>
<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";
  @import "~@/styles/common.css";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
