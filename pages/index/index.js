//index.js
//获取应用实例
import {
    Token
} from '../../utils/token-model.js';
const app = getApp()

Page({
    data: {
        banners: [],
        hotProducts: [],
        newProducts: [],
        types: [{name:'脉冲'},{name:'张力'}]
    },
    //事件处理函数
  onLoad: function () {
    var that = this
    // console.log(wx.getStorageSync('userInfo'))
    if (!wx.getStorageSync('userInfo')) {
      
      wx.redirectTo({
        url: '../login/login',
      })
    }else{
      if (!wx.getStorageSync('token') || !wx.getStorageSync('refresh_token')) {
        var token = new Token();
        token.verify();
      }else{
        that.getInfo()
        that.getHome()
      }
      
    }

    },
    onShow: function() {

    },
    getInfo: function () {
      var that = this
      var token = wx.getStorageSync('token')
      wx.request({
        url: app.globalData.api + 'user/info',
        data: '',
        header: {
          authorization: 'Bearer ' + token
        },
        method: 'GET',
        dataType: 'json',
        success: function (res) {
          console.log("加载用户信息", res)
          if (res.data.status != 200) {
            return false
          }
          that.setData({
            user: res.data.data.user
          })
          // 隐藏导航栏加载框
          wx.hideNavigationBarLoading();
          // 停止下拉动作
          wx.stopPullDownRefresh();
        }
      })
    },
    getHome: function() {
        if (wx.getStorageSync('token')) {
            var that = this
            var token = wx.getStorageSync('token')
            wx.request({
                url: app.globalData.api + 'home',
                header: {
                    authorization: 'Bearer ' + token
                },
                method: 'GET',
                success: function(res) {
                    console.log("获取首页数据", res)
                    if (res.data.status != 200) {
                        wx.showToast({
                            title: '网络延迟,请稍后或尝试下拉刷新',
                            icon: 'none'
                        })
                        setTimeout(function(){
                          that.getHome()
                        },1000)
                        return false
                    }
                    that.setData({
                        banners: res.data.data.banners,
                        hotProducts: res.data.data.hotProducts,
                        newProducts: res.data.data.newProducts,
                        types: res.data.data.types,
                        outUrl: res.data.data.outUrl
                    })
                  wx.setStorageSync('outUrl', res.data.data.outUrl)

                }
            })
        }
    },
    maichong: function() {
        wx.navigateTo({
            url: '../menuList/menuList?id=0',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    },
    zhangli: function() {
        wx.navigateTo({
            url: '../menuList/menuList?id=1',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    },
    openBannerURL: function (e) {
      wx.navigateTo({
        url: `../webview/webview?url=${this.data.outUrl}&id=${e.currentTarget.dataset.id}&type=banner`,
      })
    },
    openProductURL: function (e) {
      wx.navigateTo({
        url: `../webview/webview?url=${this.data.outUrl}&id=${e.currentTarget.dataset.id}&type=product`,
      })
    },
    onPullDownRefresh: function() {
        this.getHome()
      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();
    }
})