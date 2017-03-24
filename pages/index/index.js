var base64 = require("../images/base64");
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '模特列表'
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
    wx.request({
      url: 'http://localhost:84/api/models/',
      data: {},
      method: 'GET',
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          that.setData({
            UserList: res.data.data
          });
        }

      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  information: function (event) {
    
    wx.navigateTo({
    url: '../user/user',
    complete:function(res){
        console.log(res)
    }
  })
  }
});

