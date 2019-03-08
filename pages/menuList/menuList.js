//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js')

Page({
  data: {
    id: 0, //菜单切换
    _selectedItem: [],//已选项目的id
    selectedItem: [], //以选择的项目
    param0:[],
    param1:[],
    param2:[],
    _param0:[],
    _param1:[],
    _param2:[],
    engine:'',
    part:'',
    plantform:'',
    arr: [],
    arr1: []
  },
  //事件处理函数
  onLoad: function (res) {
    var that = this 
		var token = wx.getStorageSync('token')
    if(res.id == 0){
      wx.setNavigationBarTitle({
        title: '脉冲式'
      })
      wx.request({
        url: app.globalData.api + 'choose',
        data: {
          type: '1'
        },
        header: {
          authorization: 'Bearer '+token
        },
        method: 'GET',
        success: function (res) { 
          console.log('脉冲',res)
          wx.setStorageSync('twoType', 1)
          that.setData({
            menuText: [
              "脉冲主机",
              "脉冲配件",
              "报警平台",
            ],
            engines: res.data.data.engines,
            parts: res.data.data.parts,
            plantforms: res.data.data.plantforms
          })
        }
      })
     
    }
    if (res.id == 1) {
      wx.setNavigationBarTitle({
        title: '张力式'
      })
      wx.request({
        url: app.globalData.api + 'choose',
        data: {
          type: '2'
        },
        header: {
          authorization: 'Bearer ' + token
        },
        method: 'GET',
        success: function (res) {
          console.log('张力', res)
          wx.setStorageSync('twoType', 2)
          that.setData({
            menuText: [
              "张力主机",
              "张力配件",
              "报警平台",
            ],
            engines: res.data.data.engines,
            parts: res.data.data.parts,
            plantforms: res.data.data.plantforms
          })
        }
      })

    }
  },
  onShow: function () {
    
  },
  getId: function(e){
    // console.log(e)
    this.setData({
      id: e.detail.id
    })
  },
  selected: function(res){
    var that =this
    var token = wx.getStorageSync('token')
    that.setData({
      selected: res.currentTarget.dataset.selected,//children's id
      selected1: res.currentTarget.dataset.selected1,//children's name
    })
    if (that.data.id==0){
      var engine = res.currentTarget.dataset.selected
      wx.request({
        url: app.globalData.api +'choose/select',
        data: {
          engine: engine
        },
        header: {
          authorization: 'Bearer '+ token
        },
        method: 'POST',
        success: function(res) {
          that.setData({
            engine: engine,
            arr: res.data.data.canSelect.map(Number)
          })
        }
      })
      that.setData({
        param0: [res.currentTarget.dataset.selected1],
				_param0: [res.currentTarget.dataset.selected],
        param1: [],
        _param1: [],
        param2: [],
        _param2: []
      })
    }
    if (that.data.id == 1) {
      var part = res.currentTarget.dataset.selected
      wx.request({
        url: app.globalData.api + 'choose/select',
        data: {
          engine: that.data.engine,
          part: part
        },
        header: {
          authorization: 'Bearer ' + token
        },
        method: 'POST',
        success: function (res) {
          that.setData({
            part: part,
            arr1: res.data.data.canSelect.map(Number)
          })
        }
      })
      that.setData({
        param1: [res.currentTarget.dataset.selected1],
				_param1: [res.currentTarget.dataset.selected],
        param2: [],
        _param2: []
      })
    }
    if (that.data.id == 2) {
      var plantform = res.currentTarget.dataset.selected
      wx.request({
        url: app.globalData.api + 'choose/select',
        data: {
          engine: that.data.engine,
          part: that.data.part,
          plantform: plantform
        },
        header: {
          authorization: 'Bearer ' + token
        },
        method: 'POST',
        success: function (res) {
          that.setData({
            plantform: plantform
          })
					wx.setStorageSync('rules', res.data.data.rule)
        }
      })
      that.setData({
				param2: [res.currentTarget.dataset.selected1],
				_param2: [res.currentTarget.dataset.selected]
      })
    }
    let a = that.data.param0.concat(that.data.param1)
    let b = a.concat(that.data.param2)
    let _a = that.data._param0.concat(that.data._param1)
    let _b = _a.concat(that.data._param2)
    that.setData({
      selectedItem: b,
      _selectedItem: _b
    })
		// console.log("打印已选项", this.data._selectedItem)
  },
  next: function(){
    // console.log(this.data.selectedItem.length)
    var that = this
    if (this.data.selectedItem.length<3){
      wx.showModal({
        title: '请完善信息',
        content: '必须选择主机、配件、平台三个查询条件,缺一不可',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
			wx.setStorageSync('engine', this.data.engine)
			wx.setStorageSync('part', this.data.part)
			wx.setStorageSync('platform', this.data.plantform)
			if (wx.getStorageSync('engine') && wx.getStorageSync('part') && wx.getStorageSync('platform')){
        wx.navigateTo({
          url: `../search/search`,
          success: function (res) {
            console.info("我真不想跳转")
          }
        })
      }else{
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      }
      
    }
    
  },

})
