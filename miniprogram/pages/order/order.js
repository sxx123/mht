const app = getApp()
const api = require('../../api/request')
var that
Page({
  data: {
    order_currId:'',//商品Id
    detailList:[],
    // order_cardImg: '', //封面图
    // order_send: '', //包邮
    // order_shopTit: '', //标题
    // order_shopPri: '', //价格
    // order_shopSpecs: '', //规格
    // order_shopBox: '', //包装
    // order_shopNumPerson: '', //人数
    // shopNum: 1, //数量
    // totlePrice: '', //总价钱
    prevId: '', //上一页带回来的参数
    userName: '',
    phone: '',
    address: '',
  },
  //数量加
  addBtn: function () {
    let addNum = that.data.shopNum
    let totlePrice = addNum * that.data.order_shopPri
    that.setData({
      totlePrice: totlePrice
    })
  },
  //数量减
  jianBtn: function () {
    let jian = that.data.shopNum
    let totlePrice = jian * that.data.order_shopPri
    that.setData({
      totlePrice: totlePrice
    })
  },
  //获取商品数量
  onChange(e) {
    that.setData({
      shopNum: e.detail
    })
  },
  //跳转地址
  addressBtn: function () {
    wx.navigateTo({
      url: '../addressList/addressList',
    })
  },
  //查询商品详情
  searchShopDetail:function(){
    let data=that.data.order_currId
    console.log(data)
    api.getShopDetail(data).then(res=>{
      console.log(res)
      that.setData({
        detailList:res
      })
    })
  },
  onLoad: function (options) {
    that = this
    that.setData({
      order_currId:options.currId
      // order_cardImg: options.cardImg, //封面图
      // order_send: options.send, //包邮
      // order_shopTit: options.shopTit, //标题
      // order_shopPri: options.shopPri, //价格
      // order_shopSpecs: options.shopSpecs, //规格
      // order_shopBox: options.shopBox, //包装
      // order_shopNumPerson: options.shopNumPerson, //人数
    })
  },
  onShow: function () {
    that.searchShopDetail()

    let totlePrice = that.data.shopNum * that.data.order_shopPri
    that.setData({
      totlePrice: totlePrice
    })
     //根据ID获取地址
     let data = that.data.prevId
     api.adrListId(data).then(res => {
       console.log(res)
       that.setData({
         userName: res.userName,
         phone: res.phone,
         address: res.address,
       })
     })
  },
  onReady:function(){
    //默认从本地取地址
    var prevId = that.data.prevId
    wx.getStorage({
      key: 'addressId',
      success: (res) => {
        that.setData({
          prevId: res.data
        })
        api.adrListId(that.data.prevId).then(res => {
          console.log(res)
          that.setData({
            userName: res.userName,
            phone: res.phone,
            address: res.address,
          })
        })
      },
    })
  },
})