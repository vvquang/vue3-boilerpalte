import axios from 'axios'
import humps from 'humps'
import { cloneDeep, get } from 'lodash'

import ERROR_MESSAGES from '@/constants/errors'
import storageKeys from '@/enums/storage-keys'
import useToast from '@/hooks/useToast'
import router from '@/router'
import { refreshToken } from '@/services/auth'
import { useUserStore } from '@/stores/user'
import StorageService from './local-storage'

const { showToast } = useToast()
const isDevelopment = import.meta.env.MODE === 'development'
const baseURL = import.meta.env.VITE_APP_API_ENDPOINT_URL || ''

// helper function
function clearAllGlobalData() {
  const userStore = useUserStore()

  userStore.$reset()
  StorageService.remove(storageKeys.authProfile)
  // add more action to clear ...

  showToast({
    type: 'error',
    message: 'このリクエストを認証されていません',
  })
  router.push({ name: 'login' })
}


const handleRefreshToken = async (error: any) => {
  const originalRequest = error.config
  originalRequest._retry = true
  const refreshTokenCurrent = StorageService.get(storageKeys.authProfile)?.refreshToken || ''

  try {
    const refreshRes = await refreshToken({ refresh_token: refreshTokenCurrent })

    // save new token
    const { accessToken: accessTokenNew, refreshToken: refreshTokenNew } = refreshRes?.data?.result?.data || {}

    StorageService.set(storageKeys.authProfile, {
      accessToken: accessTokenNew,
      refreshToken: refreshTokenNew,
    })

    axios.defaults.headers.common.Authorization = 'Bearer ' + accessTokenNew
    return axios(originalRequest)

    // eslint-disable-next-line @typescript-eslint/no-shadow
  } catch (error) {
    clearAllGlobalData()
  }
}

const handleNotification = (error: any) => {
  const status = error.response.status

  // clear all auth profile & global state when logout
  if (status === 401) clearAllGlobalData()

  // show toast and redirect
  let errorMessage: string = ''
  let navigateTo = ''
  switch (status) {
    case 400:
      errorMessage = 'Bad Request'
      break
    case 401:
      errorMessage = 'Authentication'
      navigateTo = 'login'
      break
    case 403:
      navigateTo = 'error-403'
      break
    case 404:
      navigateTo = 'error-404'
      break
    case 500:
      errorMessage = 'error-500'
      break
    default:
      errorMessage = ''
      navigateTo = ''
  }

  if (!window.navigator.onLine) {
    errorMessage = 'Network error'
  }

  const errors = error?.response?.data?.error?.errors || []
  if (errors.length > 0) {
    const errorCode: string = errors[0]?.code || ''
    const messageVal = get(ERROR_MESSAGES, errorCode) || 'Something went wrong'

    showToast({
      type: 'error',
      message: messageVal,
      duration: 5,
    })
  } else if (errorMessage) {
    showToast({
      type: 'error',
      message: errorMessage,
    })
  }

  if (navigateTo && !isDevelopment) router.push({ name: navigateTo })
}

axios.defaults.headers.common.Accept = 'application/json'

axios.interceptors.request.use(
  function (config) {
    // set baseURL
    config.baseURL = baseURL

    // set accessToken
    const authProfile = StorageService.get(storageKeys.authProfile)
    const accessToken = authProfile?.accessToken
    if (accessToken && config.headers) config.headers.Authorization = `Bearer ${accessToken}`

    if (config.data && !(config.data instanceof FormData)) {
      config.data = cloneDeep(humps.decamelizeKeys(config.data))
    }

    if (config.params) {
      config.params = cloneDeep(humps.decamelizeKeys(config.params))
    }

    return {
      ...config,
    }
  },

  function (error) {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function (response) {
    if (response.data) {
      response.data = cloneDeep(humps.camelizeKeys(response.data))
    }

    return response
  },

  function (error) {
    if (!error.response) return Promise.reject(error)

    const config = error.config
    if (error.response.status === 401 && !config._retry) {
      return handleRefreshToken(error)
    }

    handleNotification(error)

    return Promise.reject(error)
  }
)

export default axios
