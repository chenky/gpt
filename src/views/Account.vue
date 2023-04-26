<template>
    <div class="account">
        <header>
            <van-image round src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
            <!-- <div class="info"> -->
            <template v-if="true">
                <div class="info_item">
                    <label>订阅套餐：</label><span>30天首次体验</span>
                </div>
                <div class="info_item">
                    <label>订阅时间：</label><span>2023.3.1</span>
                </div>
                <div class="info_item">
                    <label>到期日：</label><span>2023.4.1</span>
                </div>
            </template>
            <!-- <div class="info_item">
                <label>剩余次数：</label><span>30次</span>
            </div> -->
            <!-- </div> -->

        </header>
        <van-cell-group>
            <van-cell title="订阅升级VIP" is-link @click="upgradeVip" />
            <van-cell title="退出登录" is-link />
        </van-cell-group>
        <footer>
            <div>联系客服</div>
            <van-image width="100" height="100" src="https://upload.jianshu.io/images/js-qrc.png" />
        </footer>
        <van-popup v-model:show="showRecharge" round position="bottom" :style="{ height: '80%' }">
            <Recharge></Recharge>
        </van-popup>
    </div>
</template>

<script setup lang="ts">
import {
    ref
} from 'vue'
import Recharge from '@/components/Recharge.vue'

const showRecharge = ref(false)
const upgradeVip = () => {
    showRecharge.value = true
}


</script>

<style scoped>
.account {
    height: 100%;
    background-color: var(--emphasizeFrontColor);
}

.account header {
    background-color: var(--bodyBg);
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 50px 0 30px;
}

.account header .van-image {
    width: 80px;
    height: 80px;
}

/* .info {} */

.info_item {
    margin-top: 10px;
}

.account footer {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 30px;
}

.account footer>div {
    margin-bottom: 10px;
}
</style>
