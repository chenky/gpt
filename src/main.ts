import { createApp, markRaw } from 'vue'
// import { ConfigProvider } from 'vant';
import { createPinia } from 'pinia'
import clipboardDirective from './directives/clipboard'
import App from './App.vue'
import router from './router'
import 'vant/es/toast/style';
import './baseImport'

const app = createApp(App)

const pinia = createPinia()
pinia.use(({ store }) => {
    store.$router = markRaw(router)
})
// app.use(ConfigProvider)

app.directive('clipboard', clipboardDirective)
app.use(pinia)
app.use(router)

app.mount('#app')
