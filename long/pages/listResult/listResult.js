// pages/listResult/listResult.js
var db = require('../../utils/db.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolName: '',
    subjectType: '',
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      schoolName: options.schoolName,
      subjectType: options.subjectType,
    })
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
    let that = this;
    const reqBody = {
      schoolName: this.data.schoolName,
      subjectType: this.data.subjectType,
    };
    wx.showLoading({
      title: '加载中',
    })
    db.getSchoolDetail(reqBody, function (res) {
      wx.hideLoading();
      if (res.data.length === 0) {
        wx.showToast({
          title: '查询无结果',
          duration: 1500,
        });
        setTimeout(function () {
          wx.navigateBack({
            delta: 1,
          });
        }, 1500);
      }
      that.setData({
        list: res.data
      })
    });
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
    const { schoolName, subjectType } = this.data;
    // this.onShow();
    return {
      title: `山东高考投档大数据-${schoolName}`,
      path: `/pages/listResult/listResult?schoolName=${schoolName}&subjectType=${subjectType}`,
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