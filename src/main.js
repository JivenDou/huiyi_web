// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import './assets/font/font.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as echarts from 'echarts';
import JsonExcel from 'vue-json-excel'
import axios from 'axios'
import qs from 'qs'

Vue.config.productionTip = false

Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs

Vue.use(ElementUI)
Vue.component('downloadExcel', JsonExcel)


/* eslint-disable no-new */
new Vue({
  el: '#login',
  router,
  template: '<router-view/>',
})
