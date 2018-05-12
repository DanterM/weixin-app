// pages/section/section.js
var db = require('../../utils/db.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lowScore: '',
    highScore: '',
    lowLevel: '',
    highLevel: '',
    activeIndex: 1,
    subjectType: '',
    year: '',
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    switch (Number(options.activeIndex)) {
      case 1:
        this.setData({
          lowScore: options.lowScore,
          highScore: options.highScore,
          activeIndex: Number(options.activeIndex),
          subjectType: options.subjectType,
          year: options.year
        })
        break;
      case 2:
        this.setData({
          lowLevel: options.lowLevel,
          highLevel: options.highLevel,
          activeIndex: Number(options.activeIndex),
          subjectType: options.subjectType,
          year: options.year
        })
        break;
    }
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
    const {
      lowScore,
      highScore,
      lowLevel,
      highLevel,
      activeIndex,
      subjectType,
      year,
    } = this.data;
    let that = this;
    let reqBody = {};
    wx.showLoading({
      title: '加载中',
    })
    switch(activeIndex) {
      case 1:
        reqBody = {
          lowScore,
          highScore,
          subjectType,
          year,
        };
        db.getScoreList(reqBody, function (res) {
          wx.hideLoading();
          if (res.data.length === 0) {
            wx.showToast({
              title: '查询无结果',
              duration: 2000,
            });
            setTimeout(function () {
              wx.navigateBack({
                delta: 1,
              });
            }, 1500);
          }
          that.setData({
            list: res.data
          });
        });
        break;
      case 2:
        reqBody = {
          lowLevel,
          highLevel,
          subjectType,
          year,
        };
        db.getRankList(reqBody, function (res) {
          wx.hideLoading();
          if (res.data.length === 0) {
            wx.showToast({
              title: '查询无结果',
              duration: 2000,
            });
            setTimeout(function () {
              wx.navigateBack({
                delta: 1,
              });
            }, 1500);
          }
          that.setData({
            list: res.data
          });
        });
        break;
    }
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
  onShareAppMessage: function (options) {
    const { 
      lowScore,
      highScore,
      lowLevel,
      highLevel,
      activeIndex,
      subjectType,
      year,
    } = this.data;

    let path = '';

    if (avtiveIndex === 1) {
      path = `/pages/section/section?activeIndex=${activeIndex}&year=${year}&lowScore=${lowScore}&highScore=${highScore}&subjectType=${subjectType}`;
    } else {
      path = `/pages/section/section?activeIndex=${activeIndex}&year=${year}&lowLevel=${lowLevel}&highLevel=${highLevel}&subjectType=${subjectType}`;
    }
    // this.onShow();
    return {
      title: `山东高考投档大数据`,
      path,
      success: function (res) {
        wx.showToast({
          title: '转发成功',
          icon: 'success',
          duration: 2000,
        });
      },
      fail: function (res) {
        wx.showToast({
          title: '用户取消转发',
          icon: 'success',
          duration: 2000,
        });
      }
    }
  }
})