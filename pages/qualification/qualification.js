//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    name: '',
		mobile: '',
		identity_number: '',
		company_address: '',
		business_licence: ''
  },
  //事件处理函数
  onLoad: function (option) {
    if(option.edit==1){
      wx.setNavigationBarTitle({
        title: '修改信息',
      })
    }
  },
  onShow: function () {

  },
  uploadImg: function(){
		var that = this
    var token = wx.getStorageSync('token')
		wx.chooseImage({
			success(res) {
        console.log("选择照片成功",res)
        // return false
				const tempFilePaths = res.tempFilePaths
				wx.uploadFile({
          url: app.globalData.api + 'upload', 
					filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            file: encodeURI(res.tempFiles[0].path),
            type: encodeURI('image'),
            folder: encodeURI('apply-image')
          },
          header: {
            authorization : 'Bearer '+token
          },
					success(res) {
            console.log(JSON.parse(res.data))
            if (JSON.parse(res.data).status!=200){
              wx.showToast({
                title: '上传失败',
                icon: 'none'
              })
              return false
            }
            wx.showToast({
              title: '上传成功'
            })
            that.setData({
              business_licence: JSON.parse(res.data).data.url
            })
					}
				})
			}
		})
  },
  previewImage: function(){
    var that = this
    wx.previewImage({
      current: that.data.business_licence, // 当前显示图片的http链接
      urls: [that.data.business_licence] // 需要预览的图片http链接列表
    })
  },
	bindInput1:function(e){
		this.setData({
			name: e.detail.value
		})
	},
	bindInput2:function(e){
		this.setData({
			mobile: e.detail.value
		})
	},
	bindInput3:function(e){
		this.setData({
			identity_number: e.detail.value
		})
	},
	bindInput4:function(e){
		this.setData({
			company_address: e.detail.value
		})
	},
	// bindInput5:function(e){
	// 	this.setData({
	// 		business_licence: e.detail.value
	// 	})
	// },

  submit: function(){
		var token = wx.getStorageSync('token')
		var that = this
    console.log("提交资质内容:", that.data.name, that.data.mobile, that.data.identity_number, that.data.company_address, that.data.business_licence)
    // return false
    if (!that.data.business_licence){
      wx.showToast({
        title: '请上传营业执照',
        icon: 'none'
      })
      return false
    }
    if (!that.data.name || !that.data.identity_number || !that.data.company_address){
      wx.showToast({
        title: '姓名,项目信息,公司名称均不能为空,请检查后填写',
        icon: 'none'
      })
      return false
    }
    wx.request({
      url: app.globalData.api +'user/apply',
			data: {
				name: that.data.name,
				identity_number: that.data.identity_number,
				company_address: that.data.company_address,
				business_licence: that.data.business_licence
			},
      method: 'POST',
			header: {
				authorization: 'Bearer '+token
			},
			success: function(res) {
				console.log("资质申请成功",res)
        if(res.data.status!=200){
          wx.showToast({
            title: '网络错误,稍后请重新提交',
            icon: 'none'
          })
          return false
        }
        wx.redirectTo({
          url: '../qualificationResult/qualificationResult',
        })
			}
		})
  },
})
