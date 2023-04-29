import { createRouter, createWebHistory } from 'vue-router'
import Chat from "../views/Chat.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'chat',
            component: Chat
        },
        {
            path: '/account',
            name: 'account',
            component: () => import('../views/Account.vue')
        },
        {
            path: '/callback',
            name: 'callback',
            component: () => import('../views/Callback.vue')
        }
    ]
})

export default router
