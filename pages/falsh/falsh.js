var app=getApp();
Page({
  data: {
    imgData:{
        text:'@知乎',
         img:""
    },
    sm:0
  },
  onLoad: function(options) {
    getFlash.call(this) //指针转换
  },
  onReady: function() {
   this.data.sm=setTimeout(function(){
     wx.redirectTo({
        url: '../index/index'
      })
   },2000)
  },
  onShow: function() {
    // Do something when page show.
  },
  onHide: function() {
    // Do something when page hide.
  },
  onUnload: function() {
    // Do something when page close.
  },
  onPullDownRefresh: function() {
    // Do something when pull down.
  },
  onReachBottom: function() {
    // Do something when page reach bottom.
  }

})

function getFlash(){
  var that=this;
  var w=app.screenWidth;
  var size="1080*1776";
  console.log(w);
  if(w>=720&&w<=1080){
    size="720*1184"
  }else if(w>=480&&w<=720){
    size="480*728"
  }else if(w>=320&&w<=480){
    size="320*432"
  }
   wx.request({
      url: 'http://news-at.zhihu.com/api/4/start-image/'+size,
      header: {
           'Content-Type': 'application/json'
        }, // 设置请求的 header
      success: function(res){
        console.log(res)
          that.setData({
            imgData:res.data
          })
      }
    })
}