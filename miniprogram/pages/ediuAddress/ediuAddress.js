// miniprogram/pages/ediuAddress/ediuAddress.js
const App=getApp()
const api = require('../../api/request')
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressId:'',//传过来的Id
    userName:'',
    phone:'',
    address:''
  },
   //获取用户名
   valBtnUser: function (e) {
    var val = e.detail
    that.setData({
      userName:val
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
  //点击保存编辑
  addressBtn:function(){
    let data=that.data.addressId
    let parmas={
      userName:that.data.userName,
      phone:that.data.phone,
      address:that.data.address
    }
    api.ediuAddress(data,parmas).then(res=>{
      wx.showToast({
        title: '修改成功',
      })
      let mytime=setInterval(function(){
        wx.navigateBack({
          delta: 1,
        })
        clearInterval(mytime)
      },1000)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this
    that.setData({
      addressId:options.currId
    })
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
    let data=that.data.addressId
    api.adrListId(data).then(res=>{
      console.log("查询成功",res)
      that.setData({
        userName:res.userName,
        phone:res.phone,
        address:res.address
      })
    })
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