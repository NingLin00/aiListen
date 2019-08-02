<template>
  <div class="container">
    <header class="header_wrap">
      <div class='header_main'>
        <h1 class="logo">
          <img src="../../../static/images/logo.png" alt="logo">
        </h1>
        <div class='header_right'>
          <div class="search_btn"></div>
          <div class="head_img" v-if="userInfo.avatarUrl">
            <img :src="userInfo.avatarUrl"/>
          </div>
          <button v-else="userInfo.avatarUrl" class="login" open-type="getUserInfo" @getuserinfo="getUser">登录</button>
        </div>
      </div>
    </header>
    <!--轮播图-->
    <div class="swiper">
      <swiper class="swiperList" indicator-dots indicator-active-color="#c60023" autoplay circular>
        <swiper-item>
          <img src="http://img2.c.yinyuetai.com/others/admin/190628/0/bb3af4bde2a30ca5928543a037d2afd4_0x0.jpg" alt=""/>
        </swiper-item>
        <swiper-item>
          <img src="http://img0.c.yinyuetai.com/others/admin/190627/0/7732e2a3e62fb8875ceec462f8e37ef5_0x0.png" alt=""/>
        </swiper-item>
        <swiper-item>
          <img src="http://img4.c.yinyuetai.com/others/admin/190619/0/254958b0d5ec8730deefd6385823ef32_0x0.jpg" alt=""/>
        </swiper-item>
        <swiper-item>
          <img src="http://img1.c.yinyuetai.com/others/admin/190621/0/7e63648412aaec4c7a67ba9e4812e2c8_0x0.jpg" alt=""/>
        </swiper-item>
      </swiper>
    </div>
    <!--mv区域-->
    <div class='mvBox' v-for="(item,index_) in mv_boxs" :key="index_">
    <div class='titleBox'>
      <h3 class="boxTitle">{{item.type}}</h3>
      <p class="change"><i></i>换一换</p>
    </div>
    <div class='videoWrap'>
      <ul class="videoList" @click="toPlay">
        <li class="videoListItem" v-for="(mv,index) in item.mv_data" :key="index">
          <img :src="mv.mv_img" alt="" :data-id="mv.id"/>
          <a class="videoTitle omit">{{mv.title}}</a>
          <p class="videoName">{{mv.author}}</p>
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>

<script>
  import mv_datas from './data/mv_datas'

  export default {
    data () {
      return {
        mv_boxs: [],
        userInfo: {}// 存储用户信息数据
      }
    },
    mounted () {
      wx.showTabBar({
        animation: true
      })
      //获取用户信息
      wx.getUserInfo({
        success:(res)=>{
          if(res.userInfo){
            this.userInfo = res.userInfo
          }
        }
      })
      // 界面显示完毕后就立刻的把数据存储到mv_boxs中
      this.mv_boxs = mv_datas.mv_datas
    },
    methods: {
      //点击登录
      getUser(res) {
        // console.log(res)
        if(res.mp.detail){
          this.userInfo = res.mp.detail.userInfo
        }
      },
      //跳转到播放页面
      toPlay (event) {
        const { id } = event.target.dataset
        wx.navigateTo({
          url: '/pages/mv-play/main?id='+ id
        })
      }
    },

    created () {
      // let app = getApp()
    }
  }
</script>

<style lang="less" ref="stylesheet/less">
  .container{
    .omit {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .header_wrap {
      width: 100%;
      background-color: #333;
      .header_main {
        width: 100%;
        height: 90rpx;
        margin: 0 auto;
        overflow: hidden;
        .logo {
          float: left;
          width: 140rpx;
          height: 90rpx;
          img {
            width: 135rpx;
            height: 50rpx;
            margin: 20rpx 10rpx;
          }
        }
        .header_right {
          width: 14prx;
          height: 90rpx;
          float: right;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .search_btn {
            width: 40rpx;
            height: 40rpx;
            margin-right: 20rpx;
            background: url("../../../static/images/search.png") no-repeat;
            background-size: cover;
          }
          .head_img{
            width: 60rpx;
            height: 60rpx;
            margin: 0 20rpx;
            img{
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .login {
            width: 80rpx;
            height: 56rpx;
            line-height: 56rpx;
            padding: 0 0;
            background-color: #690;
            color: #ededed;
            font-size: 25rpx;
            text-align: center;
            border-radius: 10rpx;
            margin: 0 20rpx;
          }
        }
      }
    }
    .swiper{
      .swiperList {
        height: 430rpx;
        swiper-item {
          height: 430rpx;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .mvBox {
      width: 100%;
      background-color: #fff;
      margin: 10rpx auto;
      border-bottom: 20rpx solid #f3f5f7;
      overflow: hidden;
      .titleBox {
        height: 90rpx;
        line-height: 90rpx;
        color: #4b4c4d;
        overflow: hidden;
        position: relative;
        .boxTitle {
          margin-left: 15rpx;
          float: left;
          font-size: 34rpx;
          font-weight: bold;
        }
        .change {
          float: right;
          font-size: 24rpx;
          padding: 0 20rpx;
          i {
            background: url('../../../static/images/cbtn.png') no-repeat transparent;
            width: 35rpx;
            height: 35rpx;
            background-size: contain;
            vertical-align: middle;
            display: inline-block;
            margin: 0 6rpx;
          }
        }
      }
      .videoWrap {
        width: 100%;
        .videoList {
          overflow: hidden;
          margin: 0 auto;
          .videoListItem {
            /*overflow: hidden;*/
            width: 45%;
            margin: 0 0 30rpx 25rpx;
            float: left;
            img {
              width: 100%;
              height: 200rpx;
            }
            .videoTitle {
              display: block;
              width: 350rpx;
              color: #000;
              line-height: 40rpx;
              font-size: 30rpx;
              text-indent: 20rpx;
              .omit
            }
            .videoName {
              margin: 6rpx 0;
              line-height: 25rpx;
              text-indent: 20rpx;
              font-size: 25rpx;
              color: #b7b7b7;
            }
          }
        }
      }
    }
  }

</style>
