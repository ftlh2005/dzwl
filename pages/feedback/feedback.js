//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
		feedbackText: '',
		feedbackContact: ''
  },
  //事件处理函数
  onLoad: function () {

  },
  onShow: function () {

  },
	bindInput1: function(e){
		this.setData({
			feedbackText: e.detail.value
		})
	},
	bindInput2: function(e){
		this.setData({
			feedbackContact: e.detail.value
		})
	},
  submit: function(){
		var that = this
		var token = wx.getStorageSync('token')
    wx.request({
      url: app.globalData.api +'user/feedback',
			data: {
				content: that.data.feedbackText,
				contact: that.data.feedbackContact
			},
			header: {
				authorization: 'Bearer '+ token
			},
			dataType: 'json',
      method:'POST',
			success: function(res) {
				console.log("反馈成功",res)
        wx.showToast({
          title: '反馈成功'
        })
        setTimeout(function(){
          wx.switchTab({
            url: '../mine/mine',
          })
        },2000)
       
			}
		})
  }

})
