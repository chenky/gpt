<template>
    <div>
        <header>
            <h5>会员套餐</h5>
        </header>
        <van-radio-group v-model="checked">
  <van-cell-group inset>
    <van-cell title="180天(¥99)" clickable @click="checked = cVIP_PACK[1]">
      <template #right-icon>
        <van-radio :name="cVIP_PACK[1]" />
      </template>
    </van-cell>
    <van-cell title="90天(¥19.9)" clickable @click="checked = cVIP_PACK[2]">
      <template #right-icon>
        <van-radio :name="cVIP_PACK[2]" />
      </template>
    </van-cell>
    <van-cell title="30天(¥9.9)" clickable @click="checked = cVIP_PACK[3]">
      <template #right-icon>
        <van-radio :name="cVIP_PACK[3]" />
      </template>
    </van-cell>
  </van-cell-group>
</van-radio-group>
<van-button type="primary">立即支付</van-button>
<footer>
    <h5>充值说明</h5>
    <p>1. 充值说明充值说明充值说明充值说明充值说明充值说明充值说明</p>
    <p>2. 充值说明充值说明充值说明充值说明充值说明充值说明充值说明</p>
    <p>3. 充值说明充值说明充值说明充值说明充值说明充值说明充值说明</p>
    <p>4. 充值说明充值说明充值说明充值说明充值说明充值说明充值说明</p>
</footer>
    </div>
</template>

<script setup lang="ts">
import {
    ref, reactive
} from 'vue'
import { VIP_PACK } from "@/utils/const"

const cVIP_PACK = VIP_PACK
const checked = ref(VIP_PACK[1])

</script>

<style scoped></style>