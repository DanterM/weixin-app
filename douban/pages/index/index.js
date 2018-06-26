var API_URL = "http://t.yushu.im/v2/movie/top250";
var API_URL = "http://t.yushu.im/v2/movie/top250?count=250";
var i = 1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"加载中",
    movies:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 10000
    });
    wx.request({
      url: "http://t.yushu.im/v2/movie/top250",
      data:[],
      header:{
        'Content-Type': 'application/json'
      },
      success:function(res){
        wx.hideToast();
        // console.log(res.data);
        var data = res.data;
        that.setData({
          title:"Top250",
          // title:data.title,
          movies:data.subjects
        });
      }
    })
  } ,

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
      i=i+1;
      console.log(i+'--------下拉刷新-------');
      wx.showNavigationBarLoading(); //在标题栏中显示加载
      var that = this;
      wx.request({
        url: "http://t.yushu.im/v2/movie/top250?count=" + 20 * i,
        data: {},
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log("success");
          console.log(res.data);
          var data = res.data;
          that.setData({
            title: "Top250",
            // title:data.title,
            movies: data.subjects
          });
        }
      })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})