//index.js
//获取应用实例
var app = getApp()
Page({
  data:{
    dragD:{
      x:0,
      y:0
    },
    dragM:{
      x:0,
      y:0
    },
   
    slideFlag:false,
    screenWidth:app.screenWidth,
    screenHeight:app.screenHeight,
    slideT:0,
     bannerData:[],
     list:[],
     indicatorDots:true,
     autoplay:true,
     interval:3000,
     duration:400,
     themeData:0
  },
  changeFlag:function(){
    this.setData({
      slideFlag:false
    })
  },
  dragstart:function(event){
    console.log(event)
    this.setData({
      dragD:{
        x:event.touches[0].clientX - event.target.offsetLeft,
        y:event.touches[0].clientY - event.target.offsetTop
      }
    })
    var that=this;
    this.data.slideT = setTimeout(function(){
      var f = !that.data.slideFlag;
      that.setData({
        slideFlag:f
      })
    },200)
    return false;
  },
  dragmove:function(event){
    clearTimeout(this.data.slideT);
    var mx=event.touches[0].clientX;
    var my=event.touches[0].clientY;
    var ox = this.data.dragD.x;
    var oy = this.data.dragD.y;
    this.setData({
      dragM:{
        x:mx-ox,
        y:my-oy
      }
    })
  },
 

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (option) {
    wx.showToast({  
      // 正在加载中
      title: '正在加载中',
      icon: 'loading',
      duration: 1000
    })
 
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })

    // 轮播
    var url="http://news-at.zhihu.com/api/4/news/latest";
     wx.request({
      url: url,
      header: {
           'Content-Type': 'application/json'
        }, // 设置请求的 header
      success: function(res){
        console.log(res.data) 
        console.log(res.data.stories)
          that.setData({
            bannerData:res.data.top_stories,
            list:res.data.stories
          })
      }
    })
  }
})


 