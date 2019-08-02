<template>
  <div class="playContainer">
    <div class="top">
      <div class="return" @click="gotomv">
        <img src="../../../static/images/return.png"/>
      </div>
      <div class="share">
        <img src="../../../static/images/share.png"/>
      </div>
    </div>
    <swiper vertical circular @change="switchMusic">
      <swiper-item>
        <img src="./play_img/img_01.jpeg" alt=""/>
      </swiper-item>
      <swiper-item>
        <img src="./play_img/img_02.jpeg" alt=""/>
      </swiper-item>
      <swiper-item>
        <img src="./play_img/img_03.jpg" alt=""/>
      </swiper-item>
    </swiper>
    <div class="playingWrap">
      <div class="musicInfo">
        <h3 class="musicName">{{musicName}}</h3>
        <p class="singerName">{{singerName}}</p>
      </div>
      <div class="playingStatus">
        <a class="time startTime">{{nowTime==0?"00:00":nowTime}}</a>
        <div class="playState">
          <slider block-size="12" block-color="#d33a31" backgroundColor="#d8d8d8" activeColor="#ffad36" @change="sliderChange" step="1" :value="sliderProgress"></slider>
        </div>
        <a class="time endTime">{{totalTime==0?"00:00":totalTime}}</a>
      </div>
      <div class="playingAction">
        <!--单曲循环或顺序播放-->
        <div class="playType" @click="changeType">
          <img :src="playType"/>
        </div>
        <!--上一曲-->
        <div class="prev" @click="changePlay(false)">
          <img src="../../../static/images/playing_prev.png"/>
        </div>
        <!--播放-->
        <div class="playingToggle" @click="hanlerPaly">
          <img :src="playImg"/>
        </div>
        <!--下一曲-->
        <div class="next" @click="changePlay(true)">
          <img src="../../../static/images/playing_next.png"/>
        </div>
        <!--歌单-->
        <div class="meun" @click="toggleShow(true)">
          <img src="../../../static/images/playing_menu.png"/>
        </div>
      </div>
      <div class="menuContainer" v-show="isShowMenu">
        <scroll-view scroll-y class="menuWrap">
          <SongListComponent :listDatas="listDatas"/>
        </scroll-view>
        <div class="closeMenu" @click="toggleShow(false)">
          <img src="../../../static/images/close_menu.png"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import list_datas from './mock/song-list'
  import { secToTime } from '../../utils/index'
export default {
  //onShow和onLoad的区别
  // onLoad页面加载 只执行一次
  //onShow: 页面显示 每次打开页面都会调用一次
  onShow(){
    //隐藏tabbar
    wx.hideTabBar({
      animation: true
    })
    //从全局获取歌单列表 也因为switchtab不能传数据
    // this.listDatas = getApp().globalData.playListArr
  },
  created () {
    //请求音乐数据
    this.requestData()
    // 创建音频播放对象
    this.innerAudioContext = wx.createInnerAudioContext()
  },
  mounted(){
    this.listDatas = list_datas.list_data
    this.play(this.playingIndex)
  },
  data () {
    return {
      listDatas:[], // 歌曲数据
      musicName: '歌名',
      singerName: '歌手',
      playingIndex: 0, //当前正在播放的歌曲的id
      isShowMenu: false, //显示隐藏菜单
      innerAudioContext: null, // 音频对象
      isPaly: false, // 是否播放
      isloop: false, // 是否循环,
      prevValue: 0,
      sliderProgress: 0, // 滑动控制条进度
      totalTime: 0, // 音频总时长
      nowTime: 0, // 音频当前播放时长
      timerid:null,
      playImg: '../../static/images/playing.png', // 播放或者暂停图片
      playType:'../../static/images/playing_normal.png'
    }
  },
  methods: {
    //切换播放类型
    changeType(){

      this.isloop = !this.isloop
      this.isloop ? this.playType = '../../static/images/playing_normal.png': this.playType = '../../static/images/playing_loop.png'
    },
    //切换播放
    changePlay(type){
      this.innerAudioContext.stop()
      this.isPaly = true
      if (type) {
        // 下一首
        console.log('点击下一首playingIndex',this.playingIndex+1)
        this.play(this.playingIndex + 1)
      }else {
        //上一首
        console.log('点击上一首playingIndex',this.playingIndex-1)
        this.play(this.playingIndex - 1)
      }
    },

    switchMusic(event){
      let swiperCurrent = event.mp.detail.current
      if (swiperCurrent > this.prevValue) {
        this.changePlay(true)//下一首
      }else if (swiperCurrent < this.prevValue) {
        this.changePlay(false)//上一首
      }
       this.prevValue= swiperCurrent
    },
    //跳转到mv页面
    gotomv(){
      wx.switchTab({
        url: "/pages/mv/main"
      })
      //隐藏tabbar
      wx.showTabBar({
        animation: true
      })
      this.innerAudioContext.stop()
      this.innerAudioContext.destroy()
      this.nowTime = 0
      this.isPaly = false
    },
    //打开歌单// 关闭歌单
    toggleShow(boolen){
      this.isShowMenu = boolen
    },
    //请求数据
    requestData(){
      // 发送请求获取数据

    },
    //播放
    play(index){
      clearInterval(this.timerid)
      // 设置音频播放来源
      if (index > this.listDatas.length) {
        wx.showToast({
          title: '已经是最后一首,跳转到第一首'
        })
        index = 0
      }
      if (index < 0) {
        wx.showToast({
          title: '已经是第一首,为你跳转到最后一首'
        })
        index = this.listDatas.length
      }
      console.log("play方法内当前正在播放的",index)
      this.playingIndex = index
      this.innerAudioContext.src = this.listDatas[index].song_url
      this.innerAudioContext.loop = this.isloop
      this.musicName = this.listDatas[index].song_name
      this.singerName = this.listDatas[index].song_author
      this.innerAudioContext.play()
      this.isPaly = true
      // // 音频进入可以播放状态
      // this.innerAudioContext.onCanplay((res) => {
      //   this.isPaly = true
      // })


      let duration = this.innerAudioContext.duration
      // 获取音频播放时长，单位s，保留小数点后六位，转为分钟
      this.totalTime = secToTime(duration)
      this.timerid = setInterval(() => {
        let currentTime = this.innerAudioContext.currentTime
        // 设置当前音频播放位置
        this.nowTime = secToTime(currentTime)
      },1000)

      // 音频播放中
      this.innerAudioContext.onTimeUpdate((res) => {
        let currentTime = this.innerAudioContext.currentTime
        // 设置当前音频播放位置
        this.nowTime = secToTime(currentTime)
        // 设置滑动条位置，小数计算不精确，转为整数计算
        this.sliderProgress = (currentTime * 1000000) / (duration * 1000000) * 100
        if (duration == currentTime) {
          this.changePlay(true)//下一首
        }
      })
      // 音频自然播放结束事件
      this.innerAudioContext.onEnded((res) => {
        // 当音频播放结束后，将滑动条滑到末尾
        this.sliderProgress = 100
        this.isPaly = false
      })
    },
    // 播放暂停切换
    hanlerPaly () {
      console.log('暂停时当前播放的id',this.playingIndex)
      this.isPaly = !this.isPaly
    },
    // 滑动条拖动
    sliderChange (e) {
      let duration = this.innerAudioContext.duration
      let currentTime = duration * e.target.value / 100
      // 音频快进
      this.innerAudioContext.seek(currentTime)
      // 设置当前音频播放位置
      this.nowTime = secToTime(currentTime)
      // 设置滑动条位置
      this.sliderProgress = (currentTime * 1000000) / (duration * 1000000) * 100
      this.isPaly = true
    }
  },
  watch:{
    isPaly (val, oldVal) {
      this.innerAudioContext.offCanplay()
      if (val) {
        this.playImg = '../../static/images/playing_pause.png'
        this.innerAudioContext.play()
      } else {
        this.playImg = '../../static/images/playing.png'
        this.innerAudioContext.pause()
      }
    }
  },
  destroyed () {
    this.innerAudioContext.destroy()
  }
}
</script>

<style lang="less" ref="stylesheet/less">
.common {
  margin: 25rpx;
  img{
    width: 60rpx;
    height: 60rpx;
    vertical-align: middle;
  }
}
.playContainer{
  width: 100%;
  height: 100%;
  position: relative;
  .top{
    position: absolute;
    left: 0;
    top: 10%;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    z-index: 5;
    .return{
      .common
    }
    .share{
      .common
    }
  }
  swiper{
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,0);
    swiper-item{
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .playingWrap{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    background: linear-gradient(360deg, rgba(23, 23, 23, 0.4), rgba(247, 247, 247, 0));
    /*overflow: hidden;*/
    .musicInfo{
      margin: 0 80rpx;
      .musicName{
        font-size: 40rpx;
        color: #e9e9e9;
      }
      .singerName{
        margin-top: 10rpx;
        font-size: 25rpx;
        color: #d4d4d4;
      }
    }
    .playingStatus{
      display: flex;
      color: #fff;
      margin: 30rpx 20rpx;
      align-items: stretch;
      .time{
        width: 80rpx;
        line-height: 45rpx;
        text-align: center;
        display: block;
        font-size: 24rpx;
      }
      .playState{
        width: 520rpx;
        height: 45rpx;
        margin: 0 auto;
        position: relative;
        border-radius: 4rpx;
        slider{
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          margin: 0;
        }
      }
    }
    .playingAction{
      margin: 10rpx 10rpx 20rpx;
      display: flex;
      .playType{
        flex: 1;
        text-align: center;
        width: 100%;
        img{
          width: 120rpx;
          height: 120rpx;
          vertical-align: middle;
        }
      }
      .prev{
        flex: 1;
        text-align: center;
        width: 100%;
        img{
          width: 80rpx;
          height: 80rpx;
          vertical-align: middle;
          margin-top: 15rpx;
        }
      }
      .playingToggle{
        flex: 1;
        text-align: center;
        width: 100%;
        img{
          width: 110rpx;
          height: 110rpx;
          vertical-align: middle;
        }
      }
      .next{
        flex: 1;
        text-align: center;
        width: 100%;
        img{
          width: 80rpx;
          height: 80rpx;
          vertical-align: middle;
          margin-top: 15rpx;
        }
      }
      .meun{
        flex: 1;
        text-align: center;
        width: 100%;
        img{
          width: 120rpx;
          height: 120rpx;
          vertical-align: middle;
        }
      }
    }
    .menuContainer{
      position: absolute;
      right: 0;
      bottom: 0;
      width: 90%;
      height: 450rpx;
      .menuWrap{
        position: absolute;
        right: 0;
        bottom: 0;
        width: 90%;
        height: 450rpx;
        background-color: rgb(247, 247, 247);
        border-radius: 15rpx 15rpx 0 0;
      }
      .closeMenu{
        position: absolute;
        right: 0;
        top: 0;
        width: 80rpx;
        height: 450rpx;
        background-color: darkgray;
        img{
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          margin: auto;
          width: 80rpx;
          height: 80rpx;
        }
      }
    }

  }
}
</style>
