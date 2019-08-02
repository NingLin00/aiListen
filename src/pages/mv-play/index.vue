<template>
 <div>
   <video src="#"></video>
   <h1 class="video_title">十年之约，薛之谦信守诺言为她弹唱《安和桥》</h1>
   <p class="detail">
     <a class="time">发布: <span>2019-07-25</span></a>
     <a>播放: <span>568万</span></a>
   </p>
   <ul class="operate_list">
     <li class="operate_item" @click="handleOperate('dianzan')">
       <a class="icon">
         <i class="iconfont .icon-dianzan1"></i>
         <span class="icon_text">7790</span>
       </a>
     </li>
     <li class="operate_item" @click="handleOperate('download')">
       <a class="icon">
         <i class="iconfont .icon-xiazai"></i>
         <span class="icon_text">5260</span>
       </a>
     </li>
     <li class="operate_item" @click="handleOperate('comment')">
       <a class="icon">
         <i class="iconfont .icon-pinglun"></i>
         <span class="icon_text">2041</span>
       </a>
     </li>
     <li class="operate_item" @click="handleOperate('share')">
       <a class="icon">
         <i class="iconfont .icon-fenxiang"></i>
         <span class="icon_text">1828</span>
       </a>
     </li>
   </ul>
   <p class="comment">精彩评论</p>
   <div class="comment_detail">
     <div class="comment_info" style="display: none">
       <div class="info_head"></div>
       <div class="info_name">
         <p>路人甲</p>
         <p class="info_time">2019-07-25</p>
       </div>
     </div>
     <div class="comment_content" style="display: none">
       <span>这是我评论的内容这是评论的内容这是我评论的内容</span>
     </div>
   </div>
   <div class="none_comment">
     <p>暂时没有评论~</p>
   </div>
   <div class="comment_input" v-show="showCommentInput">
     <div class="display">
       <input type="text" placeholder="写下你的神评~" placeholder-class="placeholder"/>
       <span class="iconfont .icon-svg35"></span>
     </div>
   </div>
 </div>
</template>

<script>

export default {
  data () {
    return {
      showCommentInput : false
    }
  },
  mounted () {

  },
  methods: {
    handleOperate(operateType){
      // console.log(operateType)
      switch (operateType) {
        case 'dianzan':
          console.log('已点赞')
          break
        case 'download':
          console.log('准备下载')
          break
        case 'comment':
          this.showCommentInput = true
          break
        case 'share':
          console.log('哈哈')
          break
      }
    }
  },

  created () {

  }
}
</script>

<style lang="less" ref="stylesheet/less">
  @import "../../../static/css/iconfont.css";
 video{
   width: 100%;
   margin-bottom: 20rpx;
 }
 .video_title{
   font-size: 35rpx;
   color: #3F3D3E;
   height: 40rpx;
   line-height: 40rpx;
   text-indent: 20rpx;
 }
 .detail{
   font-size: 25rpx;
   color: #aaa;
   padding-left:20rpx ;
   margin: 15rpx 0;
   a{
     display: inline-block;
     margin-left: 15rpx;
     &.time{
       padding-right: 15rpx;
       border-right: 2rpx solid #aaa;
     }
   }
 }

 .operate_list{
   display: flex;
   justify-content: space-around;
   list-style: none;
   padding: 20rpx ;
   border-bottom: 1rpx solid #f5f5f5;
   .operate_item{
     .icon{
       display: flex;
       flex-direction: column;
       align-items: center;
       i{
         font-size: 50rpx;
         }
       .icon_text{
         padding-top: 5px;
         font-size: 12px;
         color: #3D4444;
       }
     }
     &:nth-child(1){
       .icon {
         .icon_img{
           background-position: -3rpx -3rpx;
           /*active -32px -0px*/
         }
       }
     }
     &:nth-child(2){
       .icon {
         .icon_img{
           background-position: -2rpx -156rpx;
         }
       }
     }
     &:nth-child(3){
       .icon {
         .icon_img{
           background-position: -78rpx -78rpx;
         }
       }
     }
     &:nth-child(4){
       .icon {
         .icon_img{
           background-position: -4rpx -78rpx;
         }
       }
     }
   }
 }
 .comment{
   font-size: 30rpx;
   font-weight: bold;
   padding: 15px 0 10px 15px;

 }
 .comment_detail{
   .comment_info{
     margin: 0 0 10rpx 20rpx;
     display: flex;
     align-items: center;
     .info_head{
       width: 70rpx;
       height: 70rpx;
       display: inline-block;
       border-radius: 50%;
       background: red;
     }
     .info_name{
       height: 70rpx;
       display: inline-block;
       margin-left: 10rpx;
       p{
         font-size: 25rpx;
         margin-top: 5rpx;
       }
       .info_time{
         margin-top: 5rpx;
         font-size: 18rpx;
         color: #9a9a9a;
       }
     }
   }
   .comment_content{
     margin-left: 85rpx;
     padding: 0 20rpx 10rpx 0;
     border-bottom: 1rpx solid #f5f5f5;
     span{
       font-size: 30rpx;
     }
   }
 }
 .none_comment{
   margin-top: 35rpx;
    text-align: center;
    font-size: 30rpx;
    color: #c7c7c7;
  }
 .comment_input{
   position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   height: 80rpx;
   background-color: #e9e9e9;
   .display{
     display: flex;
     input{
       display: inline-block;
       width: 80%;
       font-size: 30rpx;
       margin: 25rpx 5rpx 5rpx 20rpx;
       padding: 0 20rpx;
       outline: none;
       border-bottom: 2rpx solid #c4c4c4;
       .placeholder{
         text-align: center;
         color: #c7c7c7;
       }
     }
     span{
       line-height: 80rpx;
       font-size: 60rpx;
       color: #a8a8a8;
     }
   }
 }
</style>
