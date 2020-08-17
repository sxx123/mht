//logs.js
Page({
  data: {
    imgHeight:0,
    countDownNum: 3,
    timer: '', //定时器
  },
  //定时器
  countDown: function () {
    let that = this;
    let countDownNum = 3; //获取倒计时初始值 
    that.setData({
      countDownNum: countDownNum
    })
    that.setData({
      timer: setInterval(function () {
        countDownNum--;
        that.setData({
          countDownNum: countDownNum
        })
        if (countDownNum == 0) {
          clearInterval(that.data.timer);
          //关闭定时器之后，可作其他处理     
          wx.switchTab({
            url: '../index/index',
          })
        }
      }, 1000)

    })
  },
  onReady:function(){
    this.countDown()
    var that=this
    wx.getSystemInfo({
      success (res) {
        that.setData({  
          imgHeight: res.windowHeight,  
      }); 
      }
    })
  },
  onShow:function(){
  }, 
  onLoad: function () {
   
  }
})
