const aspp=getApp()

Page({
  data:{

  },
  //列表跳转
  chooseGeren(e){
    let index=e.currentTarget.dataset.index
    console.log(index)
    if(index==1){
      wx.navigateTo({
        url: '../orderList/orderList',
      })
    }else if(index==2){
      wx.navigateTo({
        url: '../address/address',
      })
    } else if(index==3){
       wx.navigateTo({
         url: '../copyright/copyright',
       })
    }
  }
})