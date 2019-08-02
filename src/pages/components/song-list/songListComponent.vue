<template>
  <ul class="list">
    <li class="listItem" v-for="(item, index) in listDatas" :key="index" hover-class="active">
      <div class="playStatus">
        <img src="../../../../static/images/song-menu-play.png" v-if="item.isplay"/>
        <span v-else>{{index + 1}}</span>
      </div>
      <div class="songInfo">
        <div class="songInfoDetail">
          <p class="songName">{{item.song_name}}</p>
          <p class="author">{{item.song_author}} - {{item.song_album}}</p>
        </div>
        <div class="pause" >
          <span v-if="item.ispause">已暂停播放...</span>
        </div>
      </div>
      <div class="model" :data-selected="index"></div>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'songListComponent',
    props:{
      listDatas: Array
    },
    // data(){
    //   return{
    //     listDatas:[]
    //   }
    // },
    mounted(){
      // console.log('---------',this.listDatas)
    }
  }
</script>

<style lang="less" ref="stylesheet/less">
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
  .list{
    .listItem{
      position: relative;
      width: 100%;
      height: 90rpx;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      transition: .2s;
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
            padding: 8rpx 0 2rpx 0;
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
</style>
