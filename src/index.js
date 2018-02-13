import VToggle from './v-toggle'

const install = function(Vue, options) {
  Vue.directive('toggle', VToggle)
  Vue.prototype.$$vtoggle = {}
}

VToggle.install = install

if (typeof window !== 'undefined' && window.Vue) {
  window.VToggle = VToggle
  Vue.use(install)
}

export default VToggle
