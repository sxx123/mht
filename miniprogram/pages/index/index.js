const app = getApp()
const api=require('../../api/request')
var that
Page({
  data: {
      shopListArr:[],//商品列表
  },
  //跳转详情
  goShopDetail: function(e) {
    let currIndex=e.currentTarget.dataset.index
    console.log(currIndex)
    wx.navigateTo({
      url: '../shopDetail/shopDetail?shopId='+ currIndex
    })
  },
  onShow:function(){
    api.getShopList().then(res=>{
      console.log("商品列表",res)
      that.setData({
        shopListArr:res
      })
    })
  },
  onRead:function(){
     
  },
  onLoad: function () {
    that=this
  },
})
