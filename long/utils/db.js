var { schoolListUrl, detailUrl, scoreUrl, rankUrl } = require('./database.config.js');

const getSchoolList = (reqBody, callback) => {
  wx.request({
    url: schoolListUrl,
    data: reqBody,
    method: "POST",
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      callback(res);
    },
    fail: function(err) {

    }
  })
}

const getSchoolDetail = (reqBody, callback) => {
  wx.request({
    url: detailUrl,
    data: reqBody,
    method: "POST",
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      callback(res);
    },
    fail: function (err) {

    }
  })
}

const getScoreList = (reqBody, callback) => {
  wx.request({
    url: scoreUrl,
    data: reqBody,
    method: "POST",
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      callback(res);
    },
    fail: function (err) {

    }
  })
}

const getRankList = (reqBody, callback) => {
  wx.request({
    url: rankUrl,
    data: reqBody,
    method: "POST",
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      callback(res);
    },
    fail: function (err) {

    }
  })
}

module.exports = {
  getSchoolList: getSchoolList,
  getSchoolDetail: getSchoolDetail,
  getScoreList: getScoreList,
  getRankList: getRankList,
}