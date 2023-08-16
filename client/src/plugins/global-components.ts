import type { App } from 'vue'
import Dropdown from '@/components/Dropdown/index.vue'


const registerGlobalComponents = (app: App<Element>): void => {
  app
    .component('VDropdown', Dropdown)
}

export default registerGlobalComponents
