//index.js
//获取应用实例
import { Token } from '../../utils/token-model.js';

const app = getApp()
const reg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;

Page({
  data: {
		user: wx.getStorageSync('user'),
    userInfo: wx.getStorageSync('userInfo')
  },
  //事件处理函数
  onLoad: function () { 
    // console.log(wx.getStorageSync('user'))
    var that = this
    that.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
    that.getInfo()

  },
  onShow: function () {
    var that = this
    that.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
    that.getInfo()
  },
  getInfo: function(){
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
      success: function(res) {
        console.log("加载用户信息",res)
        if(res.data.status!=200){
          wx.showToast({
            title: '网络错误,请尝试下拉刷新或者稍后使用',
            icon:'none'
          })
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
  personnalInfo: function(){
    if (reg.test(this.data.user.mobile) == false){
      wx.navigateTo({
        url: '../editPhone/editPhone?skip=true' //true为填写手机号,false为修改手机号
      })
    }else{
      wx.navigateTo({
        url: '../editPhone/editPhone?skip=false'//true为填写手机号,false为修改手机号
      })
    }
    
  },
  qualification: function(){
    
    if (reg.test(this.data.user.mobile) == false) {
      wx.navigateTo({
        url: '../editPhone/editPhone?skip=true' //true为填写手机号,false为修改手机号
      })
    }
    if (!this.data.user.applys) {
      wx.navigateTo({
        url: '../qualification/qualification' //true为填写手机号,false为修改手机号
      })
    }else{
      wx.navigateTo({
        url: '../qualificationResult/qualificationResult'
      })
    }
    
  },
  myClerk: function(){
    wx.navigateTo({
      url: '../myClerk/myClerk?skip=false'
    })
  },
  aboutUs: function () {
    wx.navigateTo({
      url: '../about/aboutUs',
      success: function(res) {}
    })
  },
  feedback: function () {
    wx.navigateTo({
      url: '../feedback/feedback',
      success: function (res) { }
    })
  },
  helps: function () {
    wx.navigateTo({
      url: '../helps/helps',
      success: function (res) { }
    })
  },
  onPullDownRefresh: function(){
    this.getInfo()
  }
})
