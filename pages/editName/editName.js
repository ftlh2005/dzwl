//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {}
  },
  //事件处理函数
  onLoad: function () {
    console.log(wx.getStorageSync('userInfo'))
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
  },
  onShow: function () {

  },
  submit: function () {
    
  },

})
