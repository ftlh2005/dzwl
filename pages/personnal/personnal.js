//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo:{},
    phone: '',
    card: '',
    address: ''
  },
  //事件处理函数
  onLoad: function () {
    // console.log(wx.getStorageSync('userInfo'))
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
  },
  onShow: function () {

  },
  loginOut: function(){
    
  },
  editName: function(){
    wx.navigateTo({
      url: '../editName/editName',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  editPhone: function () {
    wx.navigateTo({
      url: '../editPhone/editPhone?skip=false',
      success: function(res) {console.log('11')},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  clear: function () {

  },
  updata: function () {

  },
})
