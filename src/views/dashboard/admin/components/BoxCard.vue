<template>
  <el-card class="box-card-component" style="margin-left:8px;">
    <div slot="header" class="box-card-header">
      <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png">
    </div>
    <div style="position:relative;">
      <mallki class-name="mallki-text" text="坐席排行榜" />
      <div class="progress-item" style="padding-top:35px;">
        <span>张三</span>
        <div class="el-progress el-progress--line">
          <div class="el-progress-bar">
            <div class="el-progress-bar__outer" :style="{height: '6px'}">
              <div class="el-progress-bar__inner" :style="'width:78%'" />
            </div>
          </div>
          <div class="el-progress__text">78</div>
        </div>
      </div>
      <div class="progress-item">
        <span>李四</span>
        <div class="el-progress el-progress--line">
          <div class="el-progress-bar">
            <div class="el-progress-bar__outer" :style="{height: '6px'}">
              <div class="el-progress-bar__inner" :style="'width:56%'" />
            </div>
          </div>
          <div class="el-progress__text">56</div>
        </div>
      </div>
      <div class="progress-item">
        <span>王五</span>
        <div class="el-progress el-progress--line">
          <div class="el-progress-bar">
            <div class="el-progress-bar__outer" :style="{height: '6px'}">
              <div class="el-progress-bar__inner" :style="'width:54%'" />
            </div>
          </div>
          <div class="el-progress__text">54</div>
        </div>
      </div>
      <div class="progress-item">
        <span>赵六</span>
        <div class="el-progress el-progress--line">
          <div class="el-progress-bar">
            <div class="el-progress-bar__outer" :style="{height: '6px'}">
              <div class="el-progress-bar__inner" :style="'width:32%'" />
            </div>
          </div>
          <div class="el-progress__text">32</div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
import Mallki from '@/components/TextHoverEffect/Mallki'

export default {
  components: { PanThumb, Mallki },

  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      statisticsData: {
        article_count: 1024,
        pageviews_count: 1024
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  }
}
</script>

<style lang="scss" >
.box-card-component{
  .el-card__header {
    padding: 0px!important;
  }
}
</style>
<style lang="scss" scoped>
.box-card-component {
  .box-card-header {
    position: relative;
    height: 220px;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }
  .mallki-text {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 20px;
    font-weight: bold;
  }
  .panThumb {
    z-index: 100;
    height: 70px!important;
    width: 70px!important;
    position: absolute!important;
    top: -45px;
    left: 0px;
    border: 5px solid #ffffff;
    background-color: #fff;
    margin: auto;
    box-shadow: none!important;
    /deep/ .pan-info {
      box-shadow: none!important;
    }
  }
  .progress-item {
    margin-bottom: 10px;
    font-size: 14px;
  }
  @media only screen and (max-width: 1510px){
    .mallki-text{
      display: none;
    }
  }
}
</style>
