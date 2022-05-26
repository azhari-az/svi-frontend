import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Post from '../components/forms/PostForm.vue' 
import AllPost from '../views/AllPost/AllPost.vue'
import Preview from '../views/Preview/Preview.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    //component: Home
    component: AllPost
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/edit/:id',
    name: 'New',
    component: Post,
    props: true 
  },
  {
    path: '/new',
    name: 'New',
    component: Post,
  },
  {
    path: '/preview',
    name: 'Preview',
    component: Preview,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
