import { createApp, markRaw } from 'vue'
// import { ConfigProvider } from 'vant';
import { createPinia } from 'pinia'
import clipboardDirective from './directives/clipboard'
import queryString from 'query-string';
import App from './App.vue'
import router from './router'
import 'vant/es/toast/style';
import './baseImport'
// import { APPID } from "./utils/const"

const callbackUrl = encodeURIComponent(import.meta.env.VITE_WX_CALLBACK_URL)
const APPID = import.meta.env.VITE_APPID
// console.log('current url', location.href)
// alert(location.href)
const qs = queryString.parse(location.search)
// alert(localStorage.getItem('wxInfo'))
if (!qs.code && !qs.state && !localStorage.getItem('wxInfo')) {
    // 微信授权
    const wxAuthUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${callbackUrl}&response_type=code&scope=snsapi_userinfo&state=authed#wechat_redirect`
    // console.log(callbackUrl, wxAuthUrl, 'aaaaaa')
    location.href = wxAuthUrl
}

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
