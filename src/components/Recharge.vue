<template>
    <div class="recharge">
        <h5>会员套餐</h5>
        <van-radio-group v-model="checked">
            <van-cell-group inset>
                <van-cell clickable @click="checked = cVIP_PACK[1]">
                    <template #title>
                        <span class="duration">180天</span>
                        <span class="price">(¥99)</span>
                    </template>
                    <template #right-icon>
                        <van-radio :name="cVIP_PACK[1]" />
                    </template>
                </van-cell>
                <van-cell clickable @click="checked = cVIP_PACK[2]">
                    <template #title>
                        <span class="duration">30天</span>
                        <span class="price">(¥19.9)</span>
                    </template>
                    <template #right-icon>
                        <van-radio :name="cVIP_PACK[2]" />
                    </template>
                </van-cell>
                <van-cell clickable @click="checked = cVIP_PACK[3]">
                    <template #title>
                        <span class="duration">30天</span>
                        <span class="price">(¥9.9)</span>
                        <van-tag type="danger">首次特惠</van-tag>
                    </template>
                    <template #right-icon>
                        <van-radio :name="cVIP_PACK[3]" />
                    </template>
                </van-cell>
            </van-cell-group>
        </van-radio-group>
        <van-button type="primary" @click="pay">立即支付</van-button>
        <div class="footer">
            <h5>充值说明</h5>
            <p>1. 充值说明充值说明充值说明充值说明充值说明充值说明充值说明</p>
            <p>2. 充值说明充值说明充值说明充值说明充值说明充值说明充值说明</p>
            <p>3. 充值说明充值说明充值说明充值说明充值说明充值说明充值说明</p>
            <p>4. 充值说明充值说明充值说明充值说明充值说明充值说明充值说明</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    ref, reactive
} from 'vue'
import { VIP_PACK } from "@/utils/const"
import type { memberTypeKeys } from '@/types/common';
import { useUserInfo } from '@/stores/userInfo'

const userInfo = useUserInfo()

const cVIP_PACK = VIP_PACK
const checked = ref(VIP_PACK[1])

const pay = () => {
    userInfo.recharge()
}


</script>

<style scoped>
.recharge {
    padding: 20px 20px 0;
    display: flex;
    flex-direction: column;
}

.recharge h5 {
    font-size: var(--titleFontsize);
    margin: 10px 0 20px;
}

.recharge:deep(.van-radio-group) {
    background-color: var(--aiChatBg);
    border-radius: 6px;
}

.recharge:deep(.van-cell-group) {
    margin: 0;
    background-color: transparent;
}

.recharge:deep(.van-cell) {
    background-color: transparent;
}

.recharge .price {
    margin: 0 10px;
    color: var(--lightFontColor);
}

.recharge:deep(.van-cell:after) {
    border-bottom-color: var(--borderColor);
}

.recharge:deep(.van-button) {
    margin: 30px 0 20px;
}

.recharge .footer p {
    font-size: var(--tinyFontsize);
    color: var(--lightFontColor);
}
</style>