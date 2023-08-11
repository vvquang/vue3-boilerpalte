<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, computed } from 'vue'

defineProps<{
  text: string
  overlayClassName?: string
  placement?: 'auto' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'top' | 'topLeft' | 'topRight'
  disabled?: boolean
}>()

const isOpen = ref<boolean>(false)
const dropdownRef = ref(null)

const handleToggle = () => {
  isOpen.value = !isOpen.value
}

const handleClickOutside = (e) => {
  if (!dropdownRef.value?.contains(e.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)

  // set var height
  const togglerHeight = dropdownRef.value?.offsetHeight
  dropdownRef.value?.style.setProperty('--toggle-height', `${togglerHeight}px`)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})

// TODO: placement auto
</script>

<template>
  <div ref="dropdownRef" @click="handleToggle" class="dropdown">
    <slot name="toggler">
      <button :class="['button dropdown-toggle', { 'is-active': isOpen }, overlayClassName]">
        <span>
          {{ text }}
        </span>
        <img
          alt="angle down"
          class="angle-down"
          src="@/assets/images/icon_angle-down.svg"
          width="16"
          height="16"
        />
      </button>
    </slot>

    <div :class="['dropdown-list', placement]" v-if="isOpen">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.dropdown {
  position: relative;

  &-toggle {
    display: flex;
    gap: 5px;
    white-space: nowrap;

    &.is-active {
      background: #ebebeb;
      color: rgb(0, 0, 0);
    }
  }

  &-list {
    position: absolute;
    z-index: 1;
    background: white;
    border: 1px solid rgb(225, 225, 225);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  .bottom {
    top: calc(var(--toggle-height) + 4px);
    left: 50%;
    right: auto;
    transform: translateX(-50%);
  }
  .bottomLeft {
    top: calc(var(--toggle-height) + 4px);
    left: 0;
  }
  .bottomRight {
    top: calc(var(--toggle-height) + 4px);
    right: 0;
  }
  .top {
    bottom: calc(var(--toggle-height) + 4px);
    left: 50%;
    transform: translateX(-50%);
  }
  .topLeft {
    bottom: calc(var(--toggle-height) + 4px);
    left: 0;
  }
  .topRight {
    bottom: calc(var(--toggle-height) + 4px);
    right: 0;
  }
}
</style>
