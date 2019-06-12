
const List = [{ id: 1, title: '端午节', flag: '节假日', start: '2019-06-07', end: '2019-06-10', color: 'red' },
  { id: 2, title: '劳动节', flag: '节假日', start: '2019-05-01', end: '2019-05-04', color: 'red' },
  { id: 3, title: '清明节', flag: '节假日', start: '2019-04-05', end: '2019-04-07', color: 'red' },
  { id: 4, title: '国庆节', flag: '节假日', start: '2019-10-01', end: '2019-10-07', color: 'red' },
  { id: 5, title: '中秋节', flag: '节假日', start: '2019-09-13', end: '2019-09-15', color: 'red' },
  { id: 6, title: '元旦', flag: '节假日', start: '2019-01-01', end: '2019-01-03', color: 'red' },
  { id: 7, title: '春节', flag: '节假日', start: '2019-02-04', end: '2019-02-10', color: 'red' },
  { id: 8, title: '事假', flag: '特殊工作日', start: '2019-06-10', end: '2019-06-10', color: 'blue' }]

export default [
  {
    url: '/holiday/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/holiday/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/holiday/list',
    type: 'get',
    response: config => {
      const { page = 1, limit = 10 } = config.query
      const pageList = List.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: List.length,
          items: pageList
        }
      }
    }
  }
]
