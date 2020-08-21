var db = wx.cloud.database().collection('shop')
var card = wx.cloud.database().collection('shopCard')
var address = wx.cloud.database().collection('address')

module.exports={
  //获取商品列表
  getShopList:function(params){
    return new Promise((resolve,rejects)=>{
      db.get().then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
   //获取商品详情
   getShopDetail:function(params){
    return new Promise((resolve,rejects)=>{
      db.doc(params).get().then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
  //点击加入购物车
  joinCard:function(data){
    console.log(data)
    return new Promise((resolve,rejects)=>{
      card.add({data:data}).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
  //获取加入购物车商品
  shopCardList:function(params){
    return new Promise((resolve,rejects)=>{
      card.get().then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
  //新建地址
  newAddress:function(data){
    console.log(data)
    return new Promise((resolve,rejects)=>{
      address.add({data:data}).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
  //获取全部地址列表
  adrList:function(params){
    return new Promise((resolve,rejects)=>{
      address.get().then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
  //根据Id获取地址
  adrListId:function(params){
    return new Promise((resolve,rejects)=>{
      address.doc(params).get().then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
  //编辑地址
  ediuAddress:function(data,parmas){
    return new Promise((resolve,rejects)=>{
      address.doc(data).update({data:parmas}).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
  //删除地址
  delAddress:function(params){
    return new Promise((resolve,rejects)=>{
      address.doc(params).remove().then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
   //删除购物车
   delshopCard:function(params){
    return new Promise((resolve,rejects)=>{
      card.doc(params).remove().then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
}