<template>
    <van-popup :show="visible" @update:show="updateVisible" round position="bottom" :style="{ height: '80%' }">
        <div class="recharge_dialog">
            <h5>会员套餐</h5>
            <van-radio-group v-model="checked">
                <van-cell-group inset>
                    <van-cell clickable @click="handleCheck(cVIP_PACK[1])">
                        <template #title>
                            <span class="duration">180天</span>
                            <span class="price">(¥99)</span>
                        </template>
                        <template #right-icon>
                            <van-radio :name="cVIP_PACK[1]" />
                        </template>
                    </van-cell>
                    <van-cell clickable @click="handleCheck(cVIP_PACK[2])">
                        <template #title>
                            <span class="duration">30天</span>
                            <span class="price">(¥19.9)</span>
                        </template>
                        <template #right-icon>
                            <van-radio :name="cVIP_PACK[2]" />
                        </template>
                    </van-cell>
                    <van-cell clickable @click="handleCheck(cVIP_PACK[3])">
                        <template #title>
                            <span class="duration">30天</span>
                            <span class="price">(¥9.9)</span>
                            <van-tag type="danger">首次特惠</van-tag>
                        </template>
                        <template #right-icon>
                            <van-radio :disabled="!!userInfo.recharged" :name="cVIP_PACK[3]" />
                        </template>
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
            <van-button :loading="loading" type="primary" @click="pay">立即支付</van-button>
            <div class="footer">
                <h5>充值说明</h5>
                <p>1. 充值说明充值说明充值说明充值说明充值说明充值说明充值说明</p>
                <p>2. 充值说明充值说明充值说明充值说明充值说明充值说明充值说明</p>
                <p>3. 充值说明充值说明充值说明充值说明充值说明充值说明充值说明</p>
                <p>4. 充值说明充值说明充值说明充值说明充值说明充值说明充值说明</p>
            </div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import {
    ref, reactive
} from 'vue'
import { VIP_PACK } from "@/utils/const"
import type { memberTypeKeys } from '@/types/common';
import { showToast } from 'vant';
import { useUserInfo } from '@/stores/userInfo'

defineProps(['visible'])
const emit = defineEmits(['update:visible'])

const userInfo = useUserInfo()
const cVIP_PACK = VIP_PACK
const checked = ref(VIP_PACK[1])
const loading = ref(false)

const updateVisible = (value: boolean) => {
    // console.log('aaaaa', value)
    emit('update:visible', value)
}

const handleCheck = (checkedValue: string) => {
    // 充值过的用户不能享受首次充值优惠
    if (checkedValue === VIP_PACK[3] && userInfo.recharged) return
    checked.value = checkedValue
}

const pay = () => {
    // test code
    // emit('update:visible', false)
    // loading.value = true

    // console.log(checked.value, 'aaaddf')

    if (loading.value) return true;
    loading.value = true
    userInfo.recharge(checked.value as memberTypeKeys)
        .then((data) => {
            showToast({ message: '支付成功', duration: 500 });
            emit('update:visible', false)
        })
        .catch((err) => {
            showToast({ message: '支付出错了，请重新支付！', duration: 500 });
        }).finally(() => {
            loading.value = false
        })
}


</script>

<style scoped>
.recharge_dialog {
    padding: 20px 20px 0;
    display: flex;
    flex-direction: column;
}

.recharge_dialog h5 {
    font-size: var(--titleFontsize);
    margin: 10px 0 20px;
}

.recharge_dialog:deep(.van-radio-group) {
    background-color: var(--aiChatBg);
    border-radius: 6px;
}

.recharge_dialog:deep(.van-cell-group) {
    margin: 0;
    background-color: transparent;
}

.recharge_dialog:deep(.van-cell) {
    background-color: transparent;
}

.recharge_dialog .price {
    margin: 0 10px;
    color: var(--lightFontColor);
}

.recharge_dialog:deep(.van-cell:after) {
    border-bottom-color: var(--borderColor);
}

.recharge_dialog:deep(.van-button) {
    margin: 30px 0 20px;
}

.recharge_dialog .footer p {
    font-size: var(--tinyFontsize);
    color: var(--lightFontColor);
}
</style>