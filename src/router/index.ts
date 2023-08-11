import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout/index.vue'
import MainLayout from '@/layouts/MainLayout/index.vue'
import { authGuard } from './auth.guard'
import { ROLES } from '@/constants/role'
import { ERoles } from '@/enums/roles'

const APP_NAME = import.meta.env.VITE_APP_NAME || 'Vue Boilerplate'

const routesDefault: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/core/Base/index.vue')
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('../views/core/Auth/Login/index.vue')
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () => import('../views/core/Auth/ForgotPassword/index.vue')
      },
    ]
  },
  {
    path: '/403',
    name: 'error-403',
    component: () => import('../views/core/System/Forbidden/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'error-404',
    component: () => import('../views/core/System/NotFound/index.vue')
  }
]

const routesAdmin: RouteRecordRaw[] = [
  {
    path: '/admin',
    name: ROLES[ERoles.ADMIN],
    component: MainLayout,
    children: [
      {
        path: '/',
        name: 'admin-home',
        component: () => import('../views/Admin/Home/index.vue')
      },
    ]
  },
]

const routesUser: RouteRecordRaw[] = [
  {
    path: '/user',
    name: ROLES[ERoles.USER],
    component: MainLayout,
    children: [
      {
        path: '/',
        name: 'user-home',
        component: () => import('../views/User/Home/index.vue')
      },
      {
        path: '/about',
        name: 'user-about',
        component: () => import('../views/User/About/index.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: routesDefault.concat(routesAdmin).concat(routesUser)
})

router.beforeEach((to, from, next) => {
  // title
  document.title = (to?.meta?.title || APP_NAME) as string

  // check auth
  authGuard(to, from, next)
})

export default router
