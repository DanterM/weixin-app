//index.js


Page({
  data: {
    activeIndex: 0, // 0 院校; 1 分数段; 2 排名,
    sliderOffset: 0,
    sliderLeft: 0,
    subjectType: 'arts', // 0 文科; 1 理科,
    yearArray: [
      "选择时间",
      "2017",
      "2016",
      "2015"
    ],
    yearIndex: 0,
    schoolName: '',
    lowScore: '',
    highScore: '',
    lowLevel: '',
    highLevel: ''
  },
  onLoad: function () {
    let that = this;
    let sliderWidth = 96;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: ((res.windowWidth - 100) / 3 - sliderWidth) / 2,
          sliderOffset: (res.windowWidth - 100) / 3 * that.data.activeIndex
        });
      }
    });
  },
  bindTabClick: function (e) {
    console.log(e)
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  bindRadioChange: function (e) {
    this.setData({
      subjectType: e.detail.value
    });
  },
  bindPickerChange: function(e) {
    this.setData({
      yearIndex: e.detail.value
    });
  },
  bindSubmit: function(e) {
    let queryType = parseInt(this.data.activeIndex);
    const year = this.data.yearArray[this.data.yearIndex];
    const subjectType = this.data.subjectType;
    
    switch (queryType) {
      case 0:
        const schoolName = this.data.schoolName.trim();
        if ( schoolName === '') {
          wx.showToast({
            title: '学校名称不能为空',
            icon: 'none',
            duration: 2000
          })
          return;
        }     
        wx.navigateTo({
          url: `../schoolList/schoolList?schoolName=${schoolName}&subjectType=${this.data.subjectType}`,
        });
        break;
      case 1:
        const lowScore = Number(this.data.lowScore);
        const highScore = Number(this.data.highScore);
        if (Number(this.data.yearIndex) === 0) {
          wx.showToast({
            title: '请选择时间',
            icon: 'none',
            duration: 2000
          })
          return;
        }
        if (isNaN(lowScore) || isNaN(highScore)) {
          wx.showToast({
            title: '分数不能为空',
            icon: 'none',
            duration: 2000
          })
          return;
        }
        if(lowScore < 0 || highScore > 750) {
          wx.showToast({
            title: '分数范围为 0-750 分',
            icon: 'none',
            duration: 2000
          })
          return;
        }
        if (lowScore > highScore) {
          wx.showToast({
            title: '低分不能大于高分',
            icon: 'none',
            duration: 2000
          })
          return;
        }
        if (highScore - lowScore > 50) {
          wx.showToast({
            title: '分差不能超过50分',
            icon: 'none',
            duration: 2000
          })
          return;
        }
        wx.navigateTo({
          url: `../section/section?activeIndex=${this.data.activeIndex}&year=${year}&lowScore=${lowScore}&highScore=${highScore}&subjectType=${subjectType}`,
        })
        break;
      case 2:
        const lowLevel = Number(this.data.lowLevel);
        const highLevel = Number(this.data.highLevel);
        if (Number(this.data.yearIndex) === 0) {
          wx.showToast({
            title: '请选择时间',
            icon: 'none',
            duration: 2000
          })
          return;
        }
        if (isNaN(lowLevel) || isNaN(highLevel)) {
          wx.showToast({
            title: '位次不能为空',
            icon: 'none',
            duration: 2000
          })
          return;
        }
        if (highLevel > lowLevel) {
          wx.showToast({
            title: '高位不能大于低位',
            icon: 'none',
            duration: 2000
          })
          return;
        }
        if (lowLevel - highLevel > 10000) {
          wx.showToast({
            title: '位次差不能超过10000',
            icon: 'none',
            duration: 2000
          })
          return;
        }
        wx.navigateTo({
          url: `../section/section?activeIndex=${this.data.activeIndex}&year=${year}&lowLevel=${lowLevel}&highLevel=${highLevel}&subjectType=${subjectType}`,
        })
        break;
    }
  },
  bindSchoolNameInput: function(e) {
    this.setData({
      schoolName: e.detail.value
    })
  },
  bindLowScoreInput: function (e) {
    this.setData({
      lowScore: e.detail.value
    })
  },
  bindHighScoreInput: function (e) {
    this.setData({
      highScore: e.detail.value
    })
  },
  bindLowLevelInput: function (e) {
    this.setData({
      lowLevel: e.detail.value
    })
  },
  bindHighLevelInput: function (e) {
    this.setData({
      highLevel: e.detail.value
    })
  },
  onShareAppMessage: function (options) {
    // this.onShow();
    return {
      title: `山东高考投档大数据`,
      path: `/pages/index/index`,
      imageUrl: '/static/app.jpg',
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
