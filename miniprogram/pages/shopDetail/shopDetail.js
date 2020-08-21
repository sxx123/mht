//index.js
//获取应用实例
const app = getApp()
const api = require('../../api/request')
import Toast from '../../dist/toast/toast';
var that
Page({
  data: {
    currShopID: '',
    bannerList: [], //轮播图
    cardImg: '', //封面图
    send: '', //包邮
    shopTit: '', //标题
    shopPri: '', //价格
    shopSpecs: '', //规格
    shopBox: '', //包装
    shopNumPerson: '', //人数
    currId:'',
    cardNum: 0,
  },
  // 加入购物车
  joinBtn: function () {
    console.log(that.data.cardImg)
    const data = {
      cardImg: that.data.cardImg,
      sendCard: that.data.send,
      shopTitCard: that.data.shopTit, //标题
      shopPriCard: that.data.shopPri, //价格
      shopSpecsCard: that.data.shopSpecs, //规格
      shopBoxCard: that.data.shopBox, //包装
      shopNumPersonCard: that.data.shopNumPerson, //人数
      shopNum:1,//默认数量
      selected:false,//默认未选中
    }
    api.joinCard(data).then(res => {
      wx.showToast({
        title: '加入购物车成功', // 标题
        icon: 'success', // 图标类型，默认success
        duration: 1500, // 提示窗停留时间，默认1500ms
      })
    })
  },
  //分享好友
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '小兴home的水果店，快快选购哦',
      path: '/pages/shopDetail/shopDetail'
    }
  },
  //分享到朋友圈
  onShareTimeline() {
    Toast('请点击右上角三个点进行转发操作');
    return {
      title: "分享朋友圈",
      query: {},
      imageUrl: "http://qcd.52msr.cn/image/4a798bd76ddad0634fc30f870347285.jpg",
    }
  },
  //立即购买
  buyBtn:function(){
      wx.navigateTo({
           url: '../order/order?currId='+that.data.currId
        // url: '../order/order?cardImg='+that.data.cardImg + '&send='+that.data.send+'&shopTit='+that.data.shopTit+'&shopPri='+that.data.shopPri+'&shopSpecs='+that.data.shopSpecs+'&shopBox='+that.data.shopBox +'&shopNumPerson='+that.data.shopNumPerson,
      })
  },
  onShow: function () {
    const params = that.data.currShopID
    api.getShopDetail(params).then(res => {
        console.log(res)
        that.setData({
          bannerList: res.bannerImg,
          cardImg: res.bannerImg[0].imgList,
          send: res.shopSend,
          shopTit: res.shopTit,
          shopPri: res.shopPri,
          shopSpecs: res.shopSpecs,
          shopBox: res.shopBox,
          shopNumPerson: res.shopNumPerson,
          currId:res._id
        })
      }),
      //获取加入购物车数量
      wx.getStorage({
        key: 'cardNum',
        success: (res) => {
          that.setData({
            cardNum: res.data
          })
        },
      })
  },
  onLoad: function (options) {
    that = this
    //获取传过来的商品ID
    that.setData({
      currShopID: options.shopId
    })
  }
})