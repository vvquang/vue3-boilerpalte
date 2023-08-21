<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps<{
  text: string
  overlayClassName?: string
  placement?: 'auto' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'top' | 'topLeft' | 'topRight'
  disabled?: boolean
}>()

const isOpen = ref<boolean>(false)
const dropdownRef = ref<HTMLDivElement | null>(null)
const dropdownListRef = ref<HTMLDivElement | null>(null)

const handleToggle = () => {
  isOpen.value = !isOpen.value
}

const handleClickOutside = (e: MouseEvent) => {
  if (!dropdownRef.value?.contains(e.target as Node)) {
    isOpen.value = false
  }
}

const setWidthDropdownList = () => {
  const rect = dropdownRef.value?.getBoundingClientRect()
  const {
    right: togglerRight = 0,
    left: togglerLeft = 0,
  } = rect || {}
  let listMaxWidth = window.innerWidth

  switch (props.placement) {
    case 'topLeft':
    case 'bottomLeft':
      listMaxWidth -= togglerLeft
      break

    case 'topRight':
    case 'bottomRight':
      listMaxWidth = togglerRight
      break

    default:
      break
  }

  listMaxWidth -= 20
  dropdownRef.value?.style.setProperty('--max-width', `${listMaxWidth}px`)
}

watch(dropdownListRef, (newEl) => {
  const rect = dropdownRef.value?.getBoundingClientRect()
  const {
    top: togglerTop = 0,
    right: togglerRight = 0,
    left: togglerLeft = 0,
    height: togglerHeight = 0,
    width: togglerWidth = 0
  } = rect || {}

  const offsetWidth = newEl?.offsetWidth || 0
  const offsetHeight = newEl?.offsetHeight || 0

  let listLeft = 0
  let listTop = 0

  // left
  if (offsetWidth < window.innerWidth) {
    listLeft = -(offsetWidth / 2) + togglerWidth / 2

    if (Math.abs(listLeft) > togglerLeft) {
      listLeft = -togglerLeft + 10
    } else if (Math.abs(listLeft) > window.innerWidth - togglerRight) {
      listLeft = listLeft - (Math.abs(listLeft) - (window.innerWidth - togglerRight)) - 20
    }
  } else {
    listLeft = -togglerLeft
  }

  // top
  if (
    togglerTop + togglerHeight + offsetHeight <= window.innerHeight ||
    offsetHeight > togglerTop
  ) {
    listTop = togglerHeight + 2
  } else {
    listTop = -offsetHeight - 2
  }

  dropdownRef.value?.style.setProperty('--list-left', `${listLeft}px`)
  dropdownRef.value?.style.setProperty('--list-top', `${listTop}px`)
})

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
  setWidthDropdownList()

  // set var height
  const togglerHeight = dropdownRef.value?.offsetHeight
  dropdownRef.value?.style.setProperty('--toggle-height', `${togglerHeight}px`)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})
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

    <div ref="dropdownListRef" :class="['dropdown-list', placement]" v-if="isOpen">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@import './Dropdown.scss';
</style>
