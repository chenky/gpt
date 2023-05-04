import { defineStore } from 'pinia'
import { getUserInfo, recharge, wxAuth } from '@/service/index'
import { about2Expire, outOfDate, dateFormatter } from '@/utils/date'
import { VIP_PACK_MAP } from '@/utils/const'
import { setStateByStateKey, setStateByDataKey } from '@/utils/common'
import type { memberTypeKeys, Obj } from '@/types/common'

interface IUserInfo {
    uid: string,
    nickname: string,
    headimgurl: string,
    recharged: number,
    memberType: memberTypeKeys,
    balance: number,
    startTime: number,
    endTime: number
}

export const useUserInfo = defineStore('userInfo', {
    state: (): IUserInfo => ({
        uid: '', // 微信id
        nickname: '',
        headimgurl: '',
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
        wxAuth (code = '') {
            return wxAuth(code).then(res => {
                const { openid, nickname, headimgurl } = res.data
                this.setState({ openid, nickname, headimgurl })
            })
        },
        /**
         * get payment info
         * 获取支付信息
         * @param uid
         */
        userInfo (uid: string) {
            return getUserInfo(uid)
                .then(res => {
                    setStateByStateKey(this.$state, res.data)
                })
        },
        recharge (memberType: memberTypeKeys) {
            return recharge(this.uid, memberType).then(res => {
                setStateByStateKey(this.$state, res.data)
                return res
            })
        },
        setState (data: Obj) {
            setStateByDataKey(this.$state, data);
        }
    }
})