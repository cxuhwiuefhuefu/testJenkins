import Vue from 'vue'
import Router from 'vue-router'


// 登录页面
import login from '@/page/login'
// 引入管理页面
import manage from '@/page/manage'

// 引入代表履职新闻列表页面
import dblzNewList from '@/page/dblzNewList'
// 引入代表履职新闻列表页面
import rddtNewList from '@/page/rddtNewList'

// 引入新闻列表操作页面
import newListSet from '@/page/newListSet'


// 引入新闻冻结页面
import freezeNews from '@/page/freezeNews'
// 引入管理人员页面
import adminList from '@/page/adminList'
// 引入管理人员操作页面
import adminSet from '@/page/adminSet'
// 引入坪山用户人员页面
import psUserList from '@/page/psUserList'
// 引入坑梓用户人员页面
import kzUserList from '@/page/kzUserList'
// 引入龙田用户人员页面
import ltUserList from '@/page/ltUserList'
// 引入石井用户人员页面
import sjUserList from '@/page/sjUserList'
// 引入马峦用户人员页面
import mlUserList from '@/page/mlUserList'
// 引入碧岭用户人员页面
import blUserList from '@/page/blUserList'
// 引入用户人员操作页面
import userListSet from '@/page/userListSet'

// 引入测试页面
import test from '@/page/test'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/manage',
      name: 'manage',
      component: manage,
      children: [{
          path: '/newList/dblz',
          name: 'dblzNewList',
          component: dblzNewList
        },
        {
          path: '/newList/rddt',
          name: 'rddtNewList',
          component: rddtNewList
        },
        {
          path: '/newListSet',
          name: 'newListSet',
          component: newListSet
        }, {
          path: '/freezeNews',
          name: 'freezeNews',
          component: freezeNews
        }, {
          path: '/adminList',
          name: 'adminList',
          component: adminList
        }, {
          path: '/adminSet',
          name: 'adminSet',
          component: adminSet
        }, {
          path: '/userList/ps',
          name: 'psUserList',
          component: psUserList
        }, {
          path: '/userList/kz',
          name: 'kzUserList',
          component: kzUserList
        }, {
          path: '/userList/lt',
          name: 'ltUserList',
          component: ltUserList
        }, {
          path: '/userList/sj',
          name: 'sjUserList',
          component: sjUserList
        }, {
          path: '/userList/ml',
          name: 'mlUserList',
          component: mlUserList
        }, {
          path: '/userList/bl',
          name: 'blUserList',
          component: blUserList
        }, {
          path: '/userListSet',
          name: 'userListSet',
          component: userListSet
        }, {
          path: '/test',
          name: 'test',
          component: test
        }
      ]
    }
  ]
})
