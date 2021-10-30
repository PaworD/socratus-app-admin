import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '../store'
import { Dashboard } from "@/views/root";
import { CoursesView } from "@/views/courses/";
import { GroupsView, GroupContentView } from "@/views/groups/";
import { StudentsView } from "@/views/students/";

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
      auth: true,
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
  {
    path: '/groups/:id',
    name: 'GroupContentView',
    component: GroupContentView,
    meta: {
      auth: true
    }
  },
  {
    path: '/students',
    name: 'StudentsView',
    component: StudentsView,
    meta: {
      auth: true
    }
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if( !store.state.auth ) {
      try {
        await store.dispatch('init')
        next()
      } catch (e) {
        next('/')
      }
    } else {
      next()
      return
    }
  } else {
    next()
  }
})


export default router
