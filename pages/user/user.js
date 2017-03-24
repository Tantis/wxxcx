var base64 = require("../images/base64");
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    array: ['美国', '中国', '巴西', '日本'],
    objectArray: [
      {
        id: 0,
        name: '美国'
      },
      {
        id: 1,
        name: '中国'
      },
      {
        id: 2,
        name: '巴西'
      },
      {
        id: 3,
        name: '日本'
      }
    ]
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  onLoad: function () {

    this.setData({
      icon20: base64.icon20,
      icon60: base64.icon60,

    });
    wx.setNavigationBarTitle({
      title: '编辑个人信息'
    })
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      console.log(userInfo)
      that.setData({
        userInfo: userInfo
      })
    })

    that.setData({
      UserList: []
    })

  }
});

