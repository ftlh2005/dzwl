//index.js
//获取应用实例
const app = getApp()

Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
  * 组件的属性列表
  */
  properties: {
    // 这里定义了containert属性，属性值可以在组件使用时指定
    menuText: {
      type: Array,
      value: [],
      observer: res => {
        console.log('组件菜单传值成功')
      }
    }
  },
  /**
  * 组件的初始数据
  */
  data: {
    catalogSelect: 0,//判断是否选中
  },
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { },
  moved: function () { },
  detached: function () { },

  /**
  * 组件的方法列表
  */
  methods: {
    selectItem(data) {
      var that = this;
      that.setData({//把选中值放入判断值
        catalogSelect: data.currentTarget.dataset.select
      })
      this.triggerEvent('getId', { id: data.currentTarget.dataset.select });
    }

  }

})