//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '欢迎使用电子围栏',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function () {
    if (wx.getStorageSync('userInfo')) {
      this.setData({
        userInfo: wx.getStorageSync('userInfo'),
        hasUserInfo: true
      })
      wx.switchTab({
        url: '../index/index',
      })
      
    } 
    if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }
  },
  getUserInfo: function (e) {
    console.log("获取头像 名称",e)
    if (e.detail.errMsg == "getUserInfo:fail auth deny"){
      this.setData({
        userInfo: null,
        hasUserInfo: false
      })
      // wx.clearStorageSync('userInfo')
      // wx.clearStorageSync('user')
    }else{
      app.globalData.userInfo = e.detail.userInfo
      wx.setStorageSync('userInfo', e.detail.userInfo)
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      setTimeout(function(){
        // wx.switchTab({
        //   url: '../index/index',
        // })
        wx.redirectTo({
          url: '../editPhone/editPhone?skip=true',
        })
      },1000)
    }
    
  }
})
