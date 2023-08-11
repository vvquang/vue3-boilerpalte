<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { apiLogin } from '@/services/auth';
import { useUserStore } from '@/stores/user'
import StorageService from '@/services/local-storage'
import storageKeys from '@/enums/storage-keys'


const router = useRouter()
const userStore = useUserStore()
const state = reactive({
  email: '',
  password: '',
  emptyFields: false
})

async function handleLogin() {
  if (state.email === '' || state.password === '') {
    state.emptyFields = true
  } else {
    const loginRes = await apiLogin({ email: state.email, password: state.password })

    const {
        accessToken = '',
        refreshToken = '',
      } = loginRes?.data?.result?.data || {}

    // save profile to local storage
    StorageService.set(storageKeys.authProfile, { accessToken, refreshToken })

    // get profile and redirect to home page
    await userStore.getProfile()
    router.push({ name: 'home' })
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login" v-bind:class="{ error: state.emptyFields }">
      <h1>Sign In</h1>

      <div class="form-group">
        <input
          v-model="state.email"
          type="email"
          class="form-control"
          placeholder="Email"
        />
        <input
          v-model="state.password"
          type="password"
          class="form-control"
          placeholder="Password"

        />
        <input type="submit" class="btn btn-primary" @click="handleLogin" />
        <p>
          <router-link :to="{ name: 'forgot-password' }">Forgot your password?</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .login {
    max-width: 300px;
    width: 100%;
  }

  p {
    line-height: 1rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;

    input {
      margin-bottom: 20px;
      border: 1px solid #cccccc;
      padding: 14px 16px;
      border-radius: 6px;
    }
  }

  .error {
    animation-name: errorShake;
    animation-duration: 0.3s;
  }

  @keyframes errorShake {
    0% {
      transform: translateX(-25px);
    }
    25% {
      transform: translateX(25px);
    }
    50% {
      transform: translateX(-25px);
    }
    75% {
      transform: translateX(25px);
    }
    100% {
      transform: translateX(0);
    }
  }
}
</style>
