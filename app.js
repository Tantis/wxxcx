App({
    onLaunch: function () {
        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
    },
    getUserInfo: function (cb) {
        var that = this;
        var url = "http://127.0.0.1:84/"
        this.globalData.userInfo = null;
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            var value = wx.getStorageSync('token');
            if (!value) {
                this.onLogin(that, cb)
            }
            var user_id = wx.getStorageSync('user_id');
            wx.checkSession({
                success: function () {
                    //session 未过期，并且在本生命周期一直有效
                    wx.request({

                        url: url + 'api/info/',
                        data: { "token": value },
                        method: 'GET',
                        success: function (res) {
                            console.log(res);
                            if (!res.data.data) {
                                wx.getUserInfo({


                                    success: function (res) {
                                        that.globalData.userInfo = res.userInfo;
                                        typeof cb == "function" && cb(that.globalData.userInfo);

                                        if (!user_id) {
                                            wx.request({
                                                url: url + 'api/login/',
                                                data: { "token": value },
                                                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                                                // header: {}, // 设置请求的 header
                                                success: function (res_user) {
                                                    res.userInfo.user_id = res_user.data.data;
                                                    console.log(res.userInfo);
                                                    wx.request({
                                                        url: url + 'api/login/',
                                                        data: res.userInfo,
                                                        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                                                        success: function (res) {
                                                            console.log(res);
                                                        },
                                                        fail: function () {
                                                            // fail
                                                        },
                                                        complete: function () {
                                                            // complete
                                                        }
                                                    })
                                                },
                                                fail: function () {
                                                    // fail
                                                },
                                                complete: function () {
                                                    // complete
                                                }
                                            })
                                        }
                                        else {
                                            res.userInfo.user_id = user_id;
                                            console.log(res.userInfo);
                                            wx.request({
                                                url: url + 'api/login/',
                                                data: res.userInfo,
                                                method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                                                success: function (res) {
                                                    console.log(res);
                                                },
                                                fail: function () {
                                                    // fail
                                                },
                                                complete: function () {
                                                    // complete
                                                }
                                            })
                                        }



                                    }

                                });
                            } else {
                                that.globalData.userInfo = res.data.data;
                                typeof cb == "function" && cb(that.globalData.userInfo);
                            }

                        },
                        fail: function () {
                            // fail
                        },
                        complete: function () {
                            // complete
                        }
                    })
                    console.log(value);
                },
                fail: function () {
                    //登录态过期
                    that.onLogin(that, cb)
                }
            });

        }
    },
    globalData: {
        userInfo: null
    },
    onLogin: function (that, cb) {
        var url = "http://127.0.0.1:84/"
        wx.login({
            success: function (res) {
                // 存储SESSION返回TOKEN
                wx.request({
                    url: url + 'api/login/',
                    data: { "code": res.code },
                    method: 'PUT', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                    // header: {}, // 设置请求的 header
                    success: function (res) {

                        if (res.data.status == 200) {
                            var token = res.data.token;
                            wx.setStorage({
                                key: "token",
                                data: token
                            })

                            var user_id = res.data.user_id;
                            wx.setStorage({
                                key: "user_id",
                                data: user_id
                            })
                            wx.getUserInfo({
                                success: function (res) {
                                    that.globalData.userInfo = res.userInfo;
                                    typeof cb == "function" && cb(that.globalData.userInfo)

                                    console.log(res)
                                    res.userInfo.user_id = user_id;
                                    console.log(res.userInfo);
                                    wx.request({
                                        url: url + 'api/login/',
                                        data: res.userInfo,
                                        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                                        success: function (res) {
                                            return;
                                        },
                                        fail: function () {
                                            // fail
                                        },
                                        complete: function () {
                                            // complete
                                        }
                                    })



                                }
                            });
                        }

                    },
                    fail: function (err) {
                        console.log(err)
                    },
                    complete: function () {
                        // complete
                    }
                })
                //console.log(res);

            }
        });
    },
    onShow: function () {
        console.log('App Show')
    },
    onHide: function () {
        console.log('App Hide')
    },
    globalData: {
        hasLogin: false
    }
});