//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
		salesman_name: '',
		salesman_mobile: '',
    skip: 'true'
  },
  //事件处理函数
  onLoad: function (e) {
    // console.info(e)
    if(e.skip == 'true'){
      wx.setNavigationBarTitle({
        title: '提交信息',
      })
    }else{
      wx.setNavigationBarTitle({
        title: '我的业务员',
      })
    }
    this.setData({
      skip: e.skip
    })
    if(!wx.getStorageSync('token')){
      return false
    }else{
      this.getInfo()
    }
    
    if (this.data.user){
      if (this.data.user.salesman_mobile != '') {
        wx.switchTab({
          url: '../index/index',
        })
      }
    }
    
  },
  onShow: function () {

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
          wx.showToast({
            title: '网络错误,请尝试下拉刷新或者稍后使用',
            icon: 'none'
          })
          return false
        }
        that.setData({
          user: res.data.data.user
        })
      }
    })
  },
	bindSInput: function(e){
		this.setData({
			salesman_mobile: e.detail.value
		})
	},
	bindNInput: function(e){
		this.setData({
			salesman_name: e.detail.value
		})
	},
  submit: function(){
    let that = this
		if (this.data.salesman_name && this.data.salesman_mobile) {
			let token = wx.getStorageSync('token')

			wx.request({
				url: app.globalData.api + 'user/salesperson',
				method: 'POST',
				data: {
					salesman_mobile: this.data.salesman_mobile,
					salesman_name: this.data.salesman_name
				},
				header: {
					'authorization': 'Bearer '+token
				},
				success: function (res) {
          if(res.data.status!=200){
            wx.showToast({
              title: '网络错误',
            })
            return false
          }
					console.log("提交业务员后",res)
          if(that.data.skip=='false'){
            wx.showToast({
              title: '添加成功',
            })
            setTimeout(function(){
              wx.switchTab({
                url: '../mine/mine',
              })
            },2000)
          }else{
            wx.switchTab({
              url: '../index/index',
            })
          }
				}

			})
		} else {
			wx.showToast({
				title: '手机号或姓名不得为空',
				icon: 'none'
			})
		}
  },
  skip: function(){
    wx.switchTab({
      url: '../index/index',
    })
  }
  

})
