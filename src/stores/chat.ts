import { defineStore } from 'pinia'
import { createSession } from '@/service/index'
import { formatDateTime } from '@/utils/const'
import { dateFormatter } from '@/utils/date'
import { setStateByStateKey, setStateByDataKey } from '@/utils/common'
import type { CreateSessionReq } from '@/types/common'


export const useChat = defineStore('chat', {
    state: () => ({
        id: '', // 聊天id
        session_id: '',
        create_time: 1682667170087,
        update_time: 1682667170087
    }),

    getters: {
        formatUpdateTime: (state) => {
            return dateFormatter(state.update_time, formatDateTime)
        }
    },

    actions: {
        createSession ({ model, user_name, user_id, chat_name }: CreateSessionReq) {
            return createSession({ model, user_name, user_id, chat_name })
                .then(res => {
                    // console.log(data)
                    setStateByStateKey(this.$state, res.data)
                })
        }
    }
})