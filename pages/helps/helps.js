//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  //事件处理函数
  onLoad: function () {

  },
  onShow: function () {

  },
  callPhone: function(){
    wx.makePhoneCall({
      phoneNumber: '4006-857-847' // 仅为示例，并非真实的电话号码
    })
  }

})
