<template>
  <div class="menuContainer" @click="gotoMenuContent">
    <div class="menuCard" v-for="(menu,index) in menuList" :key="index">
      <h1 class="menuTitle">{{menu.menu_title}}</h1>
      <a>
        <img mode="aspectFill"
             :src="menu.menu_img_url"
             :data-id="menu.menu_id"
             :data-menuinfo="menu.menu_info"
             :data-menuimg="menu.menu_img_url"
        />
      </a>
      <p class="menuDetail">{{menu.menu_detail}}</p>
    </div>
  </div>
</template>

<script>
import menuData from './mock/song-menu'
// 450x226大小图片最佳
export default {
  data () {
    return {
      menuList:[]//初始化数据
    }
  },
  mounted(){
    //挂载完成更新数据
    this.menuList = menuData.menuList;
  },
  methods: {
    gotoMenuContent(event){
      const { id,menuinfo,menuimg } = event.target.dataset
      wx.navigateTo({
        url: '/pages/menu-content/main?id='+id+'&menuinfo='+ menuinfo+'&menuimg='+menuimg
      })
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style lang="less" ref="stylesheet/less">
.menuContainer{
  width: 100%;
  background-color: rgba(173, 173, 173, 0.8);
  overflow: hidden;
  .menuCard{
    margin: 20rpx 20rpx 40rpx 20rpx;
    background-color: rgb(238, 238, 238);
    border-radius: 10rpx;
    .menuTitle{
      padding-top: 10rpx;
      font-size: 30rpx;
      color: rgb(44, 44, 44);
      text-indent: 20rpx;
    }
    a{
      margin: 10rpx 20rpx;
      height: 250rpx;
      img{
        width: 100%;
        height: 100%;
        border-radius: 10rpx;
      }
    }
    .menuDetail{
      padding: 0 10rpx 10rpx 8rpx;
      font-size: 28rpx;
      color: rgba(23, 23, 23, 0.64);
      text-indent: 30rpx;
    }
  }
}
</style>
