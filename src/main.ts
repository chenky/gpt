import { createApp, markRaw } from 'vue'
// import { ConfigProvider } from 'vant';
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './baseImport'

const app = createApp(App)

const pinia = createPinia()
pinia.use(({ store }) => {
    store.$router = markRaw(router)
})
// app.use(ConfigProvider)
app.use(pinia)
app.use(router)

app.mount('#app')