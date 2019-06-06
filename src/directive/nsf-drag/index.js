import drag from './dragback'

const install = function(Vue) {
  Vue.directive('nsf-drag', drag)
}

if (window.Vue) {
  window['nsf-drag'] = drag
  Vue.use(install); // eslint-disable-line
}

drag.install = install
export default drag
