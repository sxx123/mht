const app=getApp()
Page({
  data:{
    checked: true,
  },
  //点击复选框
  onChange(event) {
    this.setData({
      checked: event.detail,
    });
  },
  //点击提交订单
  onSubmit(){
    wx.navigateTo({
      url: '../order/order',
    })
  }
})