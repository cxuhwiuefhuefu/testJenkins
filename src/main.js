// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// 引入路由
import router from './router'


// 引入状态管理器
import store from './store/index.js'

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

// 引入百度编辑器
import '../static/ueditor/ueditor.config'
import '../static/ueditor/ueditor.all'

//此部分引入的是我们所编写的mockjs文档
import './mock'

// 引入axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)


Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
