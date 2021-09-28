import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '../store'
import { Dashboard } from "@/views/root";
import { CoursesView } from "@/views/courses/";
import { GroupsView } from "@/views/groups/";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/courses',
    name: 'CoursesView',
    component: CoursesView,
    meta: {
      auth: true
    }
  },
  {
    path: '/groups',
    name: 'GroupsView',
    component: GroupsView,
    meta: {
      auth: true
    }
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta?.auth) {
    if( store.state.auth ) {
      next()
    }
    else {
      next('/')
    }
  } else {
    next()
  }
})


export default router
