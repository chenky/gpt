import { defineStore } from 'pinia'
import { getUserInfo } from '@/service/index'

export const useUserInfo = defineStore('userInfo', {
    state: () => ({
        uid: '', // 微信id
        vipPack: 1, // 1: 180天， 2: 30天， 3: 30优惠会员
        isVip: 0, // 0: 不是vip， 1： 是会员
        expirate: 0, // 0: 过期， 1： 没有过期
        balance: 9, // -1: 无限畅聊，其他次数就是具体次数 
        startTime: '2023.3.1', // 套餐开始时间
        endTime: '2023.4.1'  // 套餐到期时间
    }),

    actions: {
        /**
         * get payment info
         * 获取支付信息
         * @param uid
         */
        userInfo (uid) {
            return getUserInfo(postData)
                // .then(data => {
                //     console.log('submitCreditcardPay data: ', data)
                // })

                .catch((errData) => {
                    // const router = useRouter()
                    let errMsg = ''
                    const { errors, transferErrorMsg } = errData
                    // http status not 200 then error is errors
                    // else error is transferErrorMsg
                    if (errors && Array.isArray(errors)) {
                        errMsg = JSON.parse(errors[0]?.errorMessage || "{}")?.transferErrorMsg
                    } else {
                        errMsg = transferErrorMsg
                    }
                    // this.reason = errMsg
                    this.$router.push({ name: 'payfail', query: { reason: errMsg } })
                    return Promise.reject(errMsg)
                })
        }
    }
})