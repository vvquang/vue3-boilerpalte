import { ROLES } from '@/constants/role'
import { ERoles } from '@/enums/roles'
import storageKeys from '@/enums/storage-keys'
import StorageService from '@/services/local-storage'
import { useUserStore } from '@/stores/user'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

// route free
// please skip: 'login'
const ROUTING_FREE = [
  'error-401',
  'error-403',
  'error-404',
  'error-500',
  'forgot-password',
  'reset-password',
  'updatePassword',
]

export const authGuard = async (
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> => {
  const userStore = useUserStore()
  let role: ERoles | null = userStore?.role

  // get profile
  const authProfile = StorageService.get(storageKeys.authProfile)
  if (!role && authProfile?.accessToken) {
    await userStore.getProfile()
    role = userStore?.role
  }

  // check role
  const isRouteFree =
    (!role && to.name === 'login') ||
    (typeof to.name === 'string' && ROUTING_FREE.indexOf(to.name) != -1)

  if (isRouteFree || (role && to.matched[0]?.name === ROLES[role])) {
    next()
  } else if (!role) {
    next({ name: 'login' })
  } else if (role && typeof to.name === 'string' && ['home', 'login'].includes(to.name)) {
    switch (role) {
      case ERoles.ADMIN:
        next({
          name: 'admin-home',
        })
        break
      case ERoles.USER:
        next({
          name: 'user-home',
        })
        break
      default:
        next({ name: 'error-403' })
        break
    }
  } else if (role && typeof to.name === 'string' && to.name.indexOf('error') !== 0) {
    // permission denied
    next({ name: 'error-403' })
  } else {
    next()
  }
}
