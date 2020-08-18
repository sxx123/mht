//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  // 加入购物车
  joinBtn:function(){
    wx.showToast({
      title: '加入购物车成功',  // 标题
      icon: 'success',   // 图标类型，默认success
      duration: 1500   // 提示窗停留时间，默认1500ms
  })
  }
})
