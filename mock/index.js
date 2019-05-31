import Mock from 'mockjs'
import { param2Obj } from '../src/utils'

import user from './user'
import role from './role'
import article from './article'
import search from './remote-search'
import preCustomer from './demo/customer/preCustomer'
import customer from './demo/customer/customer'//客户
import agent from './demo/customer/agent'//代理人
import demoUser from './demo/system/permission/user'
import template from './demo/messageManagement/template/model'
import orderSettings from './workOrderManagement/orderSettings'
import quality from './demo/qualityAssuranceManagement/quality' // 规则配置
import question from './intelligentQuestions/question' // 智能题库 => 问题管理
import questionnaire from './intelligentQuestions/questionnaire' // 智能题库 => 问卷管理
import qualityAssurance from './demo/quality/qualityAssurance/qualityAssurance' // 质检管理
import queryQualityAssurance from './demo/quality/queryQualityAssurance/queryQualityAssurance' // 质检查询
import voiceToText from './demo/quality/voiceToText/voiceToText' // 语音转文本
import history from './messageManagement/history' // 已发送短信
import personalInsurance from './integratedQuery/personalInsurance' // 个人保单查询
const mocks = [
  ...user,
  ...role,
  ...article,
  ...search,
  ...preCustomer,
  ...customer,
  ...agent,
  ...demoUser,
  ...template,
  ...orderSettings,
  ...quality,
  ...question,
  ...questionnaire,
  ...qualityAssurance,
  ...history,
  ...queryQualityAssurance,
  ...voiceToText,
  ...history,
  ...personalInsurance
]

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
export function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

// for mock server
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`/mock${url}`),
    type: type || 'get',
    response(req, res) {
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    }
  }
}

export default mocks.map(route => {
  return responseFake(route.url, route.type, route.response)
})
