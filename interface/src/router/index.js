import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    children: [{
      path: '/',
      name: 'route',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () {
        return import( /* webpackChunkName: "about" */ '../views/placer.vue')
      }
    },{
      path: '/s1/:IX/:IY/:IZ',
      name: 's1',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () {
        return import( /* webpackChunkName: "about" */ '../views/s1.vue')
      }
    }, {
      path: '/s2/:IX/:IY/:IZ',
      name: 's2',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () {
        return import( /* webpackChunkName: "about" */ '../views/s2.vue')
      }
    }, {
      path: '/s3/:IX/:IY/:IZ',
      name: 's3',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () {
        return import( /* webpackChunkName: "about" */ '../views/s3.vue')
      }
    }, ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router