// miniprogram/pages/address/address.js
const App = getApp()
const api = require('../../api/request')
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    phone: '',
    address: '',
  },
  //获取用户名
  valBtnUser: function (e) {
    var val = e.detail
    that.setData({
      username:val
    })
  },
  //获取手机号
  valBtnPhone: function (e) {
    var val = e.detail
    that.setData({
      phone:val
    })
  },
  //获取地址
  valBtnAdr:function (e) {
    var val = e.detail
    that.setData({
      address:val
    })
  },
  // 新建地址
  addressBtn() {
    const data = {
      userName:that.data.username,
      phone:that.data.phone,
      address:that.data.address
    }
    api.newAddress(data).then(res => {
      wx.showToast({
        title: '新建成功',
      })
      let mytime=setInterval(function(){ 
        wx.navigateBack({
          delta:1
        })
        clearInterval(mytime)
       }, 1000);
    })
  },
  //保存编辑地址

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})