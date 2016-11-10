//app.js
App({
  screenWidth:0,
  screenHeight:0,
   themeData:[],
  onLaunch: function () {
    var that=this;
    wx.getSystemInfo({
      success: function(res) {
        that.screenWidth=res.windowWidth;
        that.screenHeight=res.windowHeight;
      }
    })
    // 获取内容
     var url = "http://news-at.zhihu.com/api/4/themes";
        wx.request({
        url:url, //仅为示例，并非真实的接口地址
        header: {
            'Content-Type': 'application/json'
        },
        success: function(res) {
          console.log(res.data.others)
           that.themeData=res.data.others;
         }
        })


    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})