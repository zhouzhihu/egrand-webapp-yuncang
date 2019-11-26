import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import login from '../views/login.vue'
import homePage from '../views/homePage.vue'
import person from '../views/person.vue'
import personFile from '../views/person/person-file.vue'
import personMessage from '../views/person/message.vue'
import organize from '../views/organize.vue'
import cloud from '../views/cloud.vue'
import cloudOrg from '../views/cloud/cloud-org.vue'
import cloudSearch from '../views/cloud/cloud-search.vue'
import mobanPage1 from '../views/moban/mobanPage1.vue'
import userCustomGroupPage from '../views/moban/userCustomGroupPage.vue'
import mobanPage0 from '../views/moban/mobanPage0.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/homePage',
      name: 'homePage',
      component: homePage
    },
    {
      path: '/person',
      component: person,
      children: [
        {
          path: '/',
          component: personFile
        },
        {
          path: '/file/:id',
          component: personFile
        },
        {
          path: '/message',
          component: personMessage
        }
      ]
    },
    {
      path: '/organize',
      name: '组织',
      component: organize
    },
    {
      path: '/cloud',
      name: '云仓',
      component: cloud,
      children: [
        {
          path: '/',
          component: cloudOrg
        },
        {
          path: '/org/:id',
          component: cloudOrg
        },
        {
          path: '/advSearch',
          component: cloudSearch
        }
      ]
    },
    {
      component: login,
      path:"/login",
      name: '"预览',
    },
    {
      component: mobanPage1,
      path:"/mobanPage1",
      name: '"模板1',
    },
    {
      component: userCustomGroupPage,
      path:"/userCustomGroupPage",
      name: '"模板2',
    },
    {
      component: mobanPage0,
      path:"/mobanPage0",
      name: '"模板0',
    },
  ]
})
