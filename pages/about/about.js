//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    images: [
      {
        name: 'banner0',
        path: '/static/img/banner0.png'
      }
    ]
  },
  //事件处理函数
  onLoad: function () {
    this.setData({
      outUrl: wx.getStorageSync('outUrl')
    })
  },
  onShow: function () {

  }
})
