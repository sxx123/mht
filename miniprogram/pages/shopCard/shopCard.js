const app = getApp()
const api = require('../../api/request')
var that
Page({
  data: {
    meg:'管理',
    msg:'完成',
    showMeg:true,
    showMsg:false,
    checkedAll:false,//全选中泰
    cardList: [],
    totlePrice: '', //总价钱
    currselectId:'',//单选获取商品Id
  },
  //点击管理,完成
  megBtn:function(){
    if(that.data.meg=="管理"){
      that.setData({
        showMeg:false,
        showMsg:true,
      })
    }
  },
  msgBtn:function(){
    if(that.data.msg=="完成"){
      that.setData({
        showMeg:true,
        showMsg:false,
      })
    }
  },
  //点击删除购物车商品
  delBtn:function(){
    let data=that.data.currselectId
    api.delshopCard(data,data).then(res=>{
      wx.showToast({
        title: '删除成功',
      })
      this.onShow()
    })
  },
  //点击单选
  onChange:function(e){
    let cardList=that.data.cardList//获取购物车的列表
    let index = e.currentTarget.dataset.index //获取当前点击的下标索引
    let selected=cardList[index].selected//获取状态
    cardList[index].selected=!selected
    that.setData({
      cardList:cardList,
      currselectId:cardList[index]._id
    })
    that.zPrice()
  },
  //点击全选
  selectAll:function(){
    let checkedAll=that.data.checkedAll
    checkedAll=!checkedAll
    let cardList=that.data.cardList//获取购物车的列表
    for (let i = 0; i < cardList.length; i++) {
      cardList[i].selected=checkedAll // 改变所有商品状态
    }
    that.setData({
      cardList:cardList,
      checkedAll:checkedAll
    })
    this.zPrice()
  },
  //数量加
  jiaBtn: function (e) {
    let cardList=that.data.cardList//获取购物车的列表
    let index = e.currentTarget.dataset.index //获取当前点击的下标索引
    let num =cardList[index].shopNum//获取当前购物车的商品数量
    num++
    cardList[index].shopNum=num
    that.setData({
      cardList:cardList
    })
    this.zPrice()
  },
  //数量减
  jianBtn: function (e) {
    let cardList=that.data.cardList//获取购物车的列表
    let index = e.currentTarget.dataset.index //获取当前点击的下标索引
    let num =cardList[index].shopNum//获取当前购物车的商品数量
    if(num<=0){
      return false
    }else{
      num--
      cardList[index].shopNum=num
      that.setData({
        cardList:cardList
      })
    this.zPrice()
    }
  },
  //计算总价
  zPrice:function(){
    let cardList = this.data.cardList   //获取购物车列表
    let totalPrice=0
    for(let i=0 ;i<cardList.length;i++){
      if(cardList[i].selected){
        totalPrice+=cardList[i].shopNum*cardList[i].shopPriCard
      }
    }
    that.setData({
      totlePrice:totalPrice
    })
  }, 
  //点击提交订单
  onSubmit() {
    wx.navigateTo({
      url: '../orderF/orderF',
    })
  },
  onShow: function () {
    //获取购物车列表
    api.shopCardList().then(res => {
      that.setData({
        cardList: res,
      })
      wx.setStorage({
        data: res.length,
        key: 'cardNum',
      })
    })
  },
  onLoad: function () {
    that = this
  },
})