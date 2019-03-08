//index.js
//获取应用实例
const app = getApp()
var code = require('../../utils/get-code.js')
const reg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
import {
  Token
} from '../../utils/token-model.js';

Page({
  data: {
    mobile: '',
    code: '',
		newMobile:'',
		newCode: '',
    skip: 'true',
    isShow: false,         //默认按钮1显示，按钮2不显示
    sec: "60",　　　　　　　　//设定倒计时的秒数
		hasClerk: wx.getStorageSync('user').salesman_name,
    skipShow: true
	},

  bindMInput(e) {
    this.setData({
      mobile: e.detail.value,
      newMobile: e.detail.value
    })
  },
  bindCInput(e) {
    this.setData({
      code: e.detail.value,
      newCode: e.detail.value
    })
  },

  onLoad: function (e) {  
    console.log(e)
    if (e.skip == 'false') {
      wx.setNavigationBarTitle({
        title: "修改手机号"
      })
    }
    this.setData({ 
      skip: e.skip,
			user: wx.getStorageSync('user')
    })
    if(!wx.getStorageSync('token')){
      var token = new Token();
      token.verify();
    }
    if (reg.test(wx.getStorageSync('user').salesman_mobile)==true){
      this.setData({
        skipShow: false
      })
    }
  },
  
  onShow: function () {
    // wx.showLoading({
    //   title: '请稍后',
    //   mask: true,
    //   success: function(res) {}
    // })
    setTimeout(function () {
      // wx.hideLoading()
      if(wx.getStorageSync('user').mobile){  
        wx.switchTab({
          url: '../index/index',
        })
      }
    },2000)
  },
  getCodeNew: function () {
    console.log("修改手机号 请求验证码")
    var _this = this
    var token = wx.getStorageSync('token')
		if (!_this.data.newMobile){
			wx.showToast({
				title: '手机号码不能为空',
				icon: 'none'
			})
			return false
		}
    var time = _this.data.sec　　//获取最初的秒数
    code.getCode(_this, time);　　//调用倒计时函数

    wx.request({
      url: app.globalData.api +'captchas/get-captcha',
      data: {
				mobile: _this.data.newMobile
      },
      header: {
        authorization: 'Bearer ' + token
      },
      method: 'POST',
      success: function(res){
        console.log(res)
      }
    })
  },
  getCode: function () {
    console.log("添加手机号 请求验证码")
    var _this = this
    var token = wx.getStorageSync('token')
		if (!_this.data.mobile) {
			wx.showToast({
				title: '手机号码不能为空',
				icon: 'none'
			})
			return false
		}
    var time = _this.data.sec　　//获取最初的秒数
    code.getCode(_this, time);　　//调用倒计时函数

    wx.request({
      url: app.globalData.api +'captchas/get-captcha',
      data: {
        mobile: _this.data.mobile
      },
      header: {
        authorization: 'Bearer ' + token
      },
      method: 'POST',
      success: function(res){
        console.log(res)
      }
    })
  }, 
  skip: function(){
    wx.navigateTo({
			url: '../myClerk/myClerk?skip=true',
			success: function (res) { console.log("myClerk") },
			fail: function (res) { },
			complete: function (res) { },
    })
  },

	submitNew: function(){
    console.info("提交修改的手机号码")
    var that = this
    if (that.data.newMobile && that.data.newCode) {
			let token = wx.getStorageSync('token')

			wx.request({
				url: app.globalData.api + 'user/update',
				data: {
          mobile: that.data.newMobile,
          code: that.data.newCode
				},
        method: 'POST',
				header: {
					authorization: 'Bearer ' + token
				},
				success: function (res) {
					if (res.data.status != '200'){
					  wx.showToast({
					    title: res.data.msg,
					    icon: 'none'
					  })
					  return false
					}
					console.log(res)
          wx.showToast({
            title: '修改成功',
            duration: 1500
          })
          setTimeout(function(){
            wx.switchTab({
              url: '../index/index',
            })
          },1500)
				}

			})
		} else {
			wx.showToast({
				title: '手机号或验证码不得为空',
				icon: 'none'
			})
		}
	},
  submit: function () {
    console.log('提交 注册的手机号')
    var that = this
    var token = wx.getStorageSync('token')
    if (that.data.mobile && that.data.code){
      let token = wx.getStorageSync('token')

      wx.request({
        url: app.globalData.api + 'user/update',
        header: {
          authorization: 'Bearer ' + token
        },
        data: {
          mobile: that.data.mobile,
          code: that.data.code
				},
        method: 'POST',
        success: function (res) {

          if (res.data.status != '200'){
            wx.showToast({
              title: '网络错误',
              icon: 'none'
            })
            return false
          }
          console.log("点击注册手机号",res)
          wx.navigateTo({
            url: '../myClerk/myClerk?skip=true',
          })
        }

      })
    }else{
      wx.showToast({
        title: '手机号或验证码不得为空',
        icon: 'none'
      })
    }
    
  },
  
})
