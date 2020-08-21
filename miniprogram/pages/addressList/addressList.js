// miniprogram/pages/addressList/addressList.js
const App = getApp()
const api = require('../../api/request')
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adrList: [],
    currId: '' //当前地址Id
  },
  //选中地址
  addBtn: function (e) {
    let id = e.currentTarget.dataset.id
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面
    prevPage.setData({
      prevId:id
    });
    wx.navigateBack({
      delta: 1
    })
  },
  //编辑地址
  ediuBtn: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../ediuAddress/ediuAddress?currId=' + id,
    })
  },
  //删除地址
  delBtn: function (e) {
    let id = e.currentTarget.dataset.id
    console.log(id)
    let data = id
    api.delAddress(data).then(res => {
      wx.showToast({
        title: '删除成功',
      })
      this.onShow();
    })
  },
  //新建地址
  newBtn: function () {
    wx.navigateTo({
      url: '../address/address',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
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
    api.adrList().then(res => {
      console.log(res)
      wx.setStorage({
        data: res[0]._id,
        key: 'addressId',
        success: (res) => {},
        fail: (res) => {},
        complete: (res) => {},
      })
      that.setData({
        adrList: res
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