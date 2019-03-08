//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
		url: ''
  }, 
  //事件处理函数
  onLoad: function (e) {
    console.log(222222, wx.getStorageSync('previewHTMLUrl'))
    // return false
    var _this = this
    if (wx.getStorageSync('previewHTMLUrl')){
      _this.setData({
        url: wx.getStorageSync('previewHTMLUrl')
      })
      wx.clearStorageSync('previewHTMLUrl')
    }else{
      var url = ''
      if (e.type == "banner") {
        url = `${e.url}?type=banners&id=${e.id}`
      } else if (e.type == "product") {
        url = `${e.url}?type=products&id=${e.id}`
      } else {
        url = e.url
      }
      _this.setData({
        url: url
      })
    }
    
  },
  onShow: function () {

  },
	

})
