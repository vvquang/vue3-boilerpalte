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
      <div
        v-for="(placementItem, index) in [
          'auto',
          'top',
          'topLeft',
          'topRight',
          'bottom',
          'bottomLeft',
          'bottomRight',
        ]"
        :key="index"
      >
        <v-dropdown :text="placementItem" :placement="placementItem">
          <ul>
            <li v-for="(content, contentIdx) in Array(3).fill(undefined)" :key="contentIdx">
              {{ contentIdx }}st menu item menu itemmenu itemmenu itemmenu itemmenu
            </li>
          </ul>
        </v-dropdown>
      </div>
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
