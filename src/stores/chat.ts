import { defineStore } from 'pinia'
import { createChat, postChatQuestion } from '@/service/index'
import { formatDateTime } from '@/utils/const'
import { dateFormatter } from '@/utils/date'
import { setStateByStateKey, setStateByDataKey } from '@/utils/common'
// import type { CreateSessionReq } from '@/types/common'
import { useUserInfo } from './userInfo'
// const userInfo = useUserInfo()


export const useChat = defineStore('chat', {
    state: () => ({
        id: '', 
        chatConvId: '', // 聊天id
        // model: 'gpt-3.5-turbo',
        createTime: 1682667170087,
        updateTime: 1682667170087
    }),

    getters: {
        userInfo: () => {
            return useUserInfo()
        },
        formatUpdateTime: (state) => {
            return dateFormatter(state.updateTime, formatDateTime)
        }
    },

    actions: {
        createChat({model='gpt-3.5-turbo'}){
            return createChat({ model, userId: this.userInfo.uid, userName: this.userInfo.nickname })
            .then(res=>{
                setStateByStateKey(this.$state, res.data)
            })
        },
        postChatQuestion({model='gpt-3.5-turbo', question=''}){
            return postChatQuestion({chatConvId: this.chatConvId, model, userId: this.userInfo.uid, question})
        }
        // createSse () {
        //     return createSse({ chatConvId: this.chatConvId, userId: userInfo.uid })
        //         .then(res => {
        //             // console.log(data)
        //             setStateByStateKey(this.$state, res.data)
        //         })
        // }
    }
})