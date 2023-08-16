import '@/styles/index.scss'
import 'toastify-js/src/toastify.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import registerGlobalComponents from '@/plugins/global-components'
// import { mockApi } from '@/__mocks__'

const pinia = createPinia()

const app = createApp(App)

// register ant design components
registerGlobalComponents(app)

app.use(pinia)
app.use(router)
app.mount('#app')

// mock api
// mockApi();
