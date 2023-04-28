import { defineStore } from 'pinia'
import { getUserInfo, recharge } from '@/service/index'
import { about2Expire, outOfDate, dateFormatter } from '@/utils/date'
import { VIP_PACK_MAP } from '@/utils/const'
import { setStateProp } from '@/utils/common'
import type { memberTypeKeys } from '@/types/common'

interface IUserInfo {
    uid: string,
    memberType: memberTypeKeys,
    balance: number,
    startTime: number,
    endTime: number
}

export const useUserInfo = defineStore('userInfo', {
    state: () => ({
        uid: '', // 微信id
        // vipPack: 1, // 1: 180天， 2: 30天， 3: 30优惠会员
        // isVip: 0, // 0: 不是vip， 1： 是会员
        memberType: "0", // 0: 非会员， 1: 套餐一180天会员， 2: 30天会员  3: 30优惠会员
        balance: 9, // -1: 无限畅聊，其他次数就是具体次数 
        startTime: 1682667170087, // 套餐开始时间 后台返回原始时间，前端格式化
        endTime: 1682667170087 // 套餐到期时间
    }),

    getters: {
        memberTypeName: (state) => {
            return VIP_PACK_MAP[state.memberType in VIP_PACK_MAP]
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
                    setStateProp(this.$state, data)
                })
        },
        recharge (memberType: string) {
            return recharge(this.uid, memberType).then(data => {
                setStateProp(this.$state, data)
            })
        }
    }
})