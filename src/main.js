// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import ElementUI from 'element-ui'
import store from './store'
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';

Vue.config.productionTip = false
// Vue.use(ElementUI)
/* eslint-disable no-new */

Vue.prototype.$dialog = {
  confirm: Confirm,
  alert: Alert,
  toast: Toast,
  notify: Notify,
  loading: Loading,
};

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
