//app.js
import { Token } from 'utils/token-model.js';
var scence = 0;
App({
  onLaunch: function () {
    // console.log(wx.getStorageSync('userInfo'))
    var that = this
    if (!wx.getStorageSync('userInfo')) {
      wx.redirectTo({
        url: 'pages/login/login',
      })
    } else {
      var token = new Token();
      token.verify();
    }
  },
	
  onShow: function () {
    
  },
  onHide: function () {
    this.globalData.scence = 1
    wx.setStorageSync('scence', this.globalData.scence)
  },

  globalData: {
    account: '',
    stroge: 0,
    openid: 0,
    userInfo: null,
    times: null,
    api: 'https://dzwl.dahua-soft.com/api/', //需同步更改config.js
    token: '',
    status: '0'
  }
})