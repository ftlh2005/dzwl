const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wait: 'true',
    fail: 'false',
    success: 'false',
    user: {}
  },
  editInfo: function(){
    wx.navigateTo({
      url: '../qualification/qualification?edit=1',
      success: function(res) {}
    })
  },
  backMine: function(){
    wx.switchTab({
      url: '../mine/mine',
    })
  },
  getInfo: function () {
    var that = this
    var token = wx.getStorageSync('token')
    wx.request({
      url: app.globalData.api + 'user/info',
      header: {
        authorization: 'Bearer ' + token
      },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        that.setData({
          user: res.data.data.user
        })
        if (!that.data.user) {
          return false
        }
        if (that.data.user.applys.check == 0) {
          that.setData({
            wait: 'true',
            fail: 'false',
            success: 'false',
          })
        }
        else if (that.data.user.applys.check == 1) {
          that.setData({
            wait: 'false',
            fail: 'false',
            success: 'true',
          })
        }
        else {
          that.setData({
            wait: 'false',
            fail: 'true',
            success: 'false',
          })
        }
        if (res.data.status != 200) {
          wx.showToast({
            title: '网络错误,请稍后查看',
            icon: 'none'
          })
          return false
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getInfo()
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