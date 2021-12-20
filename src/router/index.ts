import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import store from '../store'

import { ApplicantsView } from '@/views/applicants'
import { CoursesView } from "@/views/courses";
import { Dashboard } from "@/views/root";
import { GroupContentView, GroupsView } from "@/views/groups";
import { StudentsView } from "@/views/students";
import { TeachersView } from '@/views/teachers'
import ApplicantContentView from '@/views/applicants/ApplicantContentView.vue'
import { addons } from '@/router/addon'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/applicants',
    name: 'ApplicantsView',
    component: ApplicantsView
  },
  {
    path: '/applicants/:id',
    name: 'ApplicantContentView',
    component: ApplicantContentView
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
  {
    path: '/teachers',
    name: 'TeachersView',
    component: TeachersView,
    meta: {
      auth: true
    }
  },
  {
    ...addons
  }
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
