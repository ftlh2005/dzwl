const app = getApp()
// import WxValidate from '../../utils/WxValidate.js'
Page({
	data: {
		hasResults: false,
		types: ['垂直','倾斜'],
		wires: ['4','5','6'],
    modalFlag: true,
    modalEmail: ''
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
            title: '网络错误,请稍后使用',
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
  selectType: function(e){
		// console.info(e.detail.value)
    this.setData({
			typeValue: e.detail.value,//相当于下下标  从0开始
			type: Number(e.detail.value) + 1
    })
  },
	selectWire: function(e){
		console.info(e.detail.value,'wireValue')
    this.setData({
			wireValue: e.detail.value,
			wire: Number(e.detail.value) + 4
    })
  },
  sendEmail: function(){
    var that = this
    
    that.setData({
      modalFlag: false,
      modalEmail: that.data.user.email
    })
  },
	bindEmail: function(e){
		this.setData({
			modalEmail: e.detail.value
		})
	},
  modalOk: function(){
		if (!this.data.modalEmail){
			wx.showToast({
				title: '不能为空',
				icon: 'none'
			})
			return false
		}
    wx.showLoading({
      title: '发送中, 请稍等',
    })
    var that = this
		var token = wx.getStorageSync('token')
		wx.request({
			url: app.globalData.api + 'send-mail',
			data: {
				email: that.data.modalEmail
			},
			header: {
				authorization: 'Bearer ' + token
			},
			method: 'POST',
			success: function(res) {
				// console.info("发送邮箱后",res)
        // return false
				if (res.data.status!=200){
					wx.showToast({
						title: '网络错误',
						icon: 'none'
					})
					return false
				}
        wx.hideLoading()
				wx.showToast({
					title: '发送成功',
					icon: 'success',
          duration: 1500,
					success: function (res) {
						that.setData({
							modalFlag: true
						})
            setTimeout(function(){
              wx.switchTab({
                url: '../index/index',
              })
            },1500)
					}
				})
			},
      complete: function(){
        wx.hideLoading()
      }

		})
  },
  modalNo: function(){
    console.log('取消发送')
    this.setData({
      modalFlag: true
    })
  },
  resultPreview: function(){
    let previewUrl = this.data.previewUrl
    wx.navigateTo({
      url: '../search/resultPreview?previewUrl=' + previewUrl,
    })
		
  },
   
	bindlength:function(e){
    var that = this
		this.setData({
			length: e.detail.value
		})
		this.setData({
      num: Math.ceil(that.data.length / that.data.long)
		})

	},
  bindlong:function(e){
    var that = this
		this.setData({
			long: e.detail.value
		})
    this.setData({
      num: Math.ceil(that.data.length / that.data.long)
    })
	},
	bindnum:function(e){
		this.setData({
			num: e.detail.value
		})
	},
	bindnum:function(e){
		this.setData({
			num: e.detail.value
		})
	},
	bindinterval:function(e){
		this.setData({
			interval: e.detail.value
		})
	},
	bindCornerNum:function(e){
		this.setData({
			cornerNum: e.detail.value
		})
	},
	bindCornerNum2:function(e){
		this.setData({
			cornerNum2: e.detail.value
		})
	},
	bindCornerNum3:function(e){
		this.setData({
			cornerNum3: e.detail.value
		})
	},
	bindInletNum:function(e){
		this.setData({
			inletNum: e.detail.value
		})
	},
	submit: function(){
		if (!this.data.length){
			wx.showToast({
				title: '请输入周界长度',
				icon: 'none'
			})
			return false
		}
		if(
			!this.data.num ||
			!this.data.interval ||
			!this.data.cornerNum ||
			!this.data.inletNum ||
			!this.data.type ||
			!this.data.wire
		){
			wx.showToast({
				title: '搜索条件不能为空,请补全搜索条件',
				icon: 'none'
			})
			return false
		}
		var that = this
		var token = wx.getStorageSync('token')
		wx.request({
			url: app.globalData.api + 'choose/result',
			data: {
				engine: wx.getStorageSync('engine'),
				part: wx.getStorageSync('part'),
				platform: wx.getStorageSync('platform'),
				length: that.data.length,
				num: that.data.num,
				interval: that.data.interval,
				corner_num: that.data.cornerNum,
        corner_num2: that.data.cornerNum2,
				corner_num3: that.data.cornerNum3,
				inlet_num: that.data.inletNum,
				type: that.data.type,
				wire: that.data.wire

			},
			header: {
				authorization: 'Bearer '+token
			},
			method: 'POST',
			success: function(res) {
				console.log("提交表格所需数据后 返回结果", res)
				if (res.data.status!=200){
					wx.showToast({
						title: '网络错误',
						icon: 'none'
					})
				}else{
					that.setData({
						hasResults: true,
            previewUrl: res.data.data.url,
            total_price: res.data.data.totalPrice,
            price: (res.data.data.totalPrice / that.data.length).toFixed(2) ,
            filename: that.getCaption(res.data.data.filename)

					})
          wx.setNavigationBarTitle({
            title: '已经为您生成报价',
          })
				}

			}
		})
	},
  
   getCaption: obj => {
    var index = obj.lastIndexOf("\-");
    obj=obj.substring(index + 1, obj.length);
    obj = obj.split('20')
    obj = obj[0] + '2019'
    //  obj = obj.substring(0, 16)
    console.info(obj)
    return obj;
  },

	onLoad: function (options) {
    this.getInfo()
		console.info(wx.getStorageSync('rules'))
		this.setData({
      twoType: wx.getStorageSync('twoType'),
			rules: wx.getStorageSync('rules'),
			type: wx.getStorageSync('rules').default_type,
			wire: wx.getStorageSync('rules').default_wire,
      long: wx.getStorageSync('rules').default_long,
			num: wx.getStorageSync('rules').default_num,
			interval: wx.getStorageSync('rules').default_interval,
			cornerNum: wx.getStorageSync('rules').default_corner_num,
			cornerNum2: wx.getStorageSync('rules').default_corner_num2,
			cornerNum3: wx.getStorageSync('rules').default_corner_num3,
			inletNum: wx.getStorageSync('rules').default_inlet_num
		}) 
	},
  
	back: function (){
		this.setData({
			hasResults: false
		})
    wx.setNavigationBarTitle({
      title: '填写配置',
    })
	},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})