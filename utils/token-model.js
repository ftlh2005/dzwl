import { Config } from 'config.js';

class Token {
  constructor() {
    // console.log("打印地址",this)
    this.verifyUrl = Config.restUrl + 'token/refresh';
    this.tokenUrl = Config.restUrl + 'login';
  }

  verify() {
		var that = this
    var token = wx.getStorageSync('token');
		var time = wx.getStorageSync('expires_in');
    // console.log(token)
    if (!token) {
      this.getTokenFromServer(token);
    } else {
			that._verifyFromServer(token);
			setInterval(function(){
				that._verifyFromServer(token);
			},time*1000)
      
    }
  }

  // 携带令牌去服务器校验令牌
  _verifyFromServer(token) {
    // console.log('刷新token')
    var that = this;
    var refresh_token = wx.getStorageSync("refresh_token")
    wx.request({
      url: that.verifyUrl,
      method: 'POST',
      data: {
        refresh_token: refresh_token
      },
      success: function (res) {
        console.log("刷新token ",res)
				wx.setStorageSync('token', res.data.data.token);
				wx.setStorageSync('refresh_token', res.data.data.refresh_token);
				wx.setStorageSync('expires_in', res.data.data.expires_in);
      }
    })
  }


  // 从服务器获取token
  getTokenFromServer(callback) {
    var that = this;
    wx.login({
      success: function (res) {
        let code = res.code
        wx.getUserInfo({
          lang: "zh_CN",
          success: res => {
            let userInfo = res.userInfo
            wx.request({
              url: that.tokenUrl,
              method: 'POST',
              data: {
                code: code,
                nick_name: userInfo.nickName,
                avatar: userInfo.avatarUrl
              },
              success: function (res) {
                console.log('获取token',res)
                if(res.data.status==200){
                  wx.setStorageSync('token', res.data.token);
                  wx.setStorageSync('user', res.data.user);
                  wx.setStorageSync('refresh_token', res.data.refresh_token);
                  wx.setStorageSync('expires_in', res.data.expires_in);
                }
                
              }
            })
          }
        })

      }
    })
  }


}

export { Token };
