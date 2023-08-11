<script setup lang="ts">
import { reactive } from 'vue'
import useToast, { type IToastConfig } from '@/hooks/useToast'

type ButtonType = 'default' | 'primary' | 'danger' | 'warring'

const { showToast } = useToast()
const notiState = reactive<IToastConfig>({ type: 'info', message: '' })

const handleClick = (type: ButtonType) => {
  switch (type) {
    case 'primary':
      notiState.type = 'success'
      notiState.message = 'Success'
      break

    case 'danger':
      notiState.type = 'error'
      notiState.message = 'Error'
      break

    case 'warring':
      notiState.type = 'warring'
      notiState.message = 'Warring'
      break

    default:
      notiState.type = 'info'
      notiState.message = 'Info'
      break
  }

  showToast({ ...notiState, duration: 6000 })
}
</script>

<template>
  <div class="wrapper">
    <h1>Home page</h1>

    <div class="button-wrapper">
      <button class="button" @click="() => handleClick('default')">Notification default</button>
      <button class="button button-primary" @click="() => handleClick('primary')">
        Notification success
      </button>
      <button class="button button-danger" @click="() => handleClick('danger')">
        Notification danger
      </button>
      <button class="button button-warring" @click="() => handleClick('warring')">
        Notification warring
      </button>
    </div>

    <div class="dropdown-wrapper">
      <v-dropdown text="Top" placement="top"><span>Content top.............</span></v-dropdown>
      <v-dropdown text="Top Left" placement="topLeft"><span>Content top left...............</span></v-dropdown>
      <v-dropdown text="Top Right" placement="topRight"><span>Content top right...............</span></v-dropdown>
      <v-dropdown text="Bottom" placement="bottom"><span>Content bottom................</span></v-dropdown>
      <v-dropdown text="Bottom Left" placement="bottomLeft"><span>Content bottom left..................</span></v-dropdown>
      <v-dropdown text="Bottom Right" placement="bottomRight"><span>Content bottom right.............</span></v-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.button-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.dropdown-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  padding: 50px;

  span {
    white-space: nowrap;
  }
}
</style>
