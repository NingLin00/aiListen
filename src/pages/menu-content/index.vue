<template>
  <div class="listContainer">
    <div class="header">
      <img :src="headerImg" />
      <p class="listInfo">{{listinfo}}</p>
    </div>
    <div class="main">
      <div class="playAll" @click="playAll">
        <img src="../../../static/images/play_all.png"/>
        <a>播放全部<span>(共 {{listDatas.length}} 首)</span></a>
      </div>
      <ul class="list" @click="togglePlay">
        <SongListComponent :listDatas="listDatas"/>
      </ul>
    </div>
  </div>
</template>

<script>
  import songList from './mock/song-list'
  export default {
    onUnload(){
      console.log('离开')
      wx.stopBackgroundAudio()
      // this.BackgroundAudioManager.stop()
    },
    mounted(){
      //传过来的id
      // console.log(this.$mp.query.id)
      // this.BackgroundAudioManager = wx.getBackgroundAudioManager()
    const { list_data } = songList
      this.listDatas = list_data
      this.listinfo = this.$mp.query.menuinfo
      this.headerImg = this.$mp.query.menuimg
    },
    data(){
      return {
        BackgroundAudioManager: null,
        headerImg:"",
        listinfo:"暂无简介",
        listDatas: [],//歌曲列表
        isplay:false, //播放状态
        current: null
      }
    },
    methods: {
      //后台播放音乐
      backgroundPlayMusic(boolean,selected){
        if (boolean) {
          //后台播放音乐
          wx.playBackgroundAudio({
            dataUrl: this.listDatas[selected].song_url,
            title: this.listDatas[selected].song_name,
            coverImgUrl: ''
          })
          this.listDatas[selected].ispause = false
        }else {
          // 暂停
          wx.pauseBackgroundAudio()
          this.listDatas[selected].ispause = true
        }
      },
      //切换播放
      togglePlay(event){
        //切换播放状态
        this.isplay = !this.isplay
        //获取选中曲目的下标
        const { selected } = event.target.dataset
        //第一次点击this.current == null
        //点击同一个this.current == selected
        if (this.current == null || this.current == selected) {
          //选中的item
          this.listDatas[selected].isplay = this.isplay
          // 缓存
          this.current = selected
          this.backgroundPlayMusic(this.isplay,selected)
        }else {
          //点击不同的item
          //选中的item
          this.listDatas[selected].isplay = true
          // 前一个item的播放状态
          this.listDatas[this.current].isplay = false
          // 前一个item的播放暂停状态
          this.listDatas[this.current].ispause = false
          this.current = selected
          this.backgroundPlayMusic(true,selected)
        }
      },
      //播放全部
      playAll(){
        getApp().globalData.playListArr = this.listDatas;
        wx.switchTab({
          url: "/pages/music-play/main" //注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面
        });
      }
    }
  }
</script>

<style lang="less" ref="stylesheet/less">
  /*垂直水平居中*/
.center{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
}
.active{
  opacity: 0.9;
  background: #e2e2e2;
}
.listContainer{
  width: 100%;
  height: 100%;
  .header{
    background: linear-gradient(45deg, rgba(230, 100, 101, 0.74), rgba(145, 152, 229, 0.89));
    margin-bottom: -15rpx;
    img{
      width: 100%;
      height: 380rpx;
    }
    .listInfo{
      font-size: 28rpx;
      text-indent: 20rpx;
      padding: 0 20rpx 30rpx;
      color: rgba(242, 242, 242, 0.8);
    }
  }
  .main{
    border-radius: 20rpx;
    .playAll{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 30rpx;
      border-bottom: 1rpx solid #dedede;
      border-radius: 20rpx 20rpx 0 0;
      background-color: #fff;
      img{
        width: 50rpx;
        height: 50rpx;
        vertical-align: middle;
      }
      a{
        padding-left: 20rpx;
        font-size: 30rpx;
        span{
          font-size: 28rpx;
          color: rgba(88,88,88,0.8);
        }
      }
    }
    .list{
      .listItem{
        position: relative;
        width: 100%;
        height: 90rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        transition: .3s;
        .playStatus{
          width: 80rpx;
          height: 80rpx;
          line-height: 80rpx;
          position: relative;
          margin: 0 15rpx;
          text-align: center;
          span{
            display: block;
            font-size: 30rpx;
            color: #adadad;
          }
          img{
            width: 45rpx;
            height: 45rpx;
            .center

          }
        }
        .songInfo{
          display: flex;
          flex: 2;
          justify-content: space-between;
          border-bottom: 1rpx solid #dedede;
          .songInfoDetail{
            .songName{
              padding-top: 10rpx;
              font-size: 28rpx;
            }
            .author{
              padding: 8rpx 0 8rpx 0;
              font-size: 22rpx;
              color: #adadad;
            }
          }
          .pause{
            height: 90rpx;
            line-height: 90rpx;
            box-sizing: border-box;
            text-align: right;
            span{
              padding-right: 20rpx;
              font-size: 22rpx;
              color: #c63f44;
            }
          }
        }
        .model{
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 90rpx;
        }
      }
    }
  }
}
</style>
