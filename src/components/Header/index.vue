<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import { ERoles } from '@/enums/roles'
import useToast from '@/hooks/useToast'
import { useUserStore } from '@/stores'

const APP_NAME = import.meta.env.VITE_APP_NAME || 'Vue Boilerplate'

const userStore = useUserStore()
const router = useRouter()
const { showToast } = useToast()

const isLogged = computed(() => !!userStore.role)
const isAdminSite = computed(() => userStore.role === ERoles.ADMIN)
const titleHeader = computed(() => {
  const role = userStore.role
  const roleText = role === ERoles.ADMIN ? 'Admin' : 'User'
  return `Role：${roleText}`
})

const handleLogout = () => {
  userStore.logout()
  showToast({
    type: 'success',
    message: 'Logout success !!!'
  })
  router.push({ name: 'login' })
}
</script>

<template>
  <header class="header">
    <div class="header__left">
      <router-link :to="{ name: 'home' }" class="logo-wrapper">
        <img alt="Vue logo" class="logo" src="@/assets/images/logo.svg" width="24" height="24" />
      </router-link>
      <span class="app-name">{{ APP_NAME }}</span>

    </div>

    <div v-if="isLogged" class="header__right">
      <nav class="nav-list">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink v-if="!isAdminSite" to="/about">About</RouterLink>
      </nav>

      <div class="user-wrapper">
        <v-dropdown text="Dropdown" overlayClassName="dropdown-custom" placement="bottomRight">
          <template #toggler>
            <div class="avatar">
              <img alt="user" src="@/assets/images/icon_user.svg" width="20" height="20" />
            </div>
          </template>
          <div class="dropdown-custom__list">
            <p v-if="isLogged" class="title">{{ titleHeader }}</p>
            <p class="logout" @click="handleLogout()">
              <img alt="logout" src="@/assets/images/icon_logout.svg" width="20" height="20" />
              Logout
            </p>
          </div>
        </v-dropdown>
      </div>
    </div>
  </header>
</template>

<style scoped>
@import './Header.scss';
</style>
