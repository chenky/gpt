import { defineStore } from 'pinia'
import { postMsg } from '@/service/index'
import { about2Expire, outOfDate, dateFormatter } from '@/utils/date'
import { setStateByStateKey, setStateByDataKey } from '@/utils/common'


export const useChat = defineStore('chat', {
    state: () => ({
        uid: '', // 微信id
        recharged: 1, // 0：没有充值过，首次充值，1: 充值过了
        memberType: "0", // 0: 非会员， 1: 套餐一180天会员， 2: 30天会员  3: 30优惠会员
        balance: 9, // -1: 无限畅聊，其他次数就是具体次数 
        startTime: 1682667170087, // 套餐开始时间 后台返回原始时间，前端格式化
        endTime: 1682667170087 // 套餐到期时间
    }),

    getters: {
        memberTypeName: (state) => {
            return VIP_PACK_MAP[state.memberType]
        },
        isVip: (state) => {
            return state.memberType !== "0"
        },
        isAbout2Expire: (state) => {
            return about2Expire(state.endTime)
        },
        isOutOfDate: (state) => {
            return outOfDate(state.endTime)
        },
        formatStartTime: (state) => {
            return dateFormatter(state.startTime)
        },
        formatEndTime: (state) => {
            return dateFormatter(state.endTime)
        }
    },

    actions: {
        /**
         * get payment info
         * 获取支付信息
         * @param uid
         */
        userInfo (uid: string) {
            return getUserInfo(uid)
                .then(data => {
                    setStateByStateKey(this.$state, data)
                })
        },
        recharge (memberType: memberTypeKeys) {
            return recharge(this.uid, memberType).then(data => {
                setStateByStateKey(this.$state, data)
                return data
            })
        },
        updateProps (data: Obj) {
            setStateByDataKey(this.$state, data);
        }
    }
})