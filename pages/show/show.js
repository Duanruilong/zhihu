Page({
    data:{
        id:0,
        body:null
    },
  
    onLoad: function (option) {
    wx.showToast({  
      // 正在加载中
      title: '正在加载中',
      icon: 'loading',
      duration: 1000
    })
    this.setData({
        id:option.id
    })
    },
   
    onReady:function(){
         var that=this;
        var url = "http://news-at.zhihu.com/api/4/news/"+this.data.id;
        wx.request({
        url:url, //仅为示例，并非真实的接口地址
        header: {
            'Content-Type': 'application/json'
        },
        success: function(res) {
            console.log(res.data)
            that.setData({
              body:res.data.body
             })
         }
        })
    },
})