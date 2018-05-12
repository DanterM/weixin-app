const baseURL = 'https://sdgaokao.applinzi.com/api/';
const version = 'v1';
const url = baseURL+version;

module.exports = {
  schoolListUrl: url +'/school/getList',
  detailUrl: url +'/school/get',
  scoreUrl: url +'/score/getList',
  rankUrl: url +'/rank/getList',
};