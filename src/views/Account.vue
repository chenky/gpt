<template>
    <div class="account">
        <header>
            <van-image round src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
            <!-- <div class="info"> -->
            <template v-if="userInfo.isVip">
                <template v-if="userInfo.isOutOfDate">
                    <div class="info_item">
                        您的套餐已过期
                    </div>
                    <div class="info_item">
                        <label>最近订阅套餐到期时间：</label><span>{{ userInfo.formatEndTime }}</span>
                    </div>
                    <div class="info_item">
                        请尽快<van-button type="primary" @click="upgradeVip">开通套餐</van-button>享无限畅聊
                    </div>
                </template>
                <template v-else>
                    <div class="info_item">
                        <label>订阅套餐：</label><span>{{ userInfo.memberTypeName }}</span>
                    </div>
                    <div class="info_item">
                        <label>订阅时间：</label><span>{{ userInfo.formatStartTime }}</span>
                    </div>
                    <div class="info_item">
                        <label>到期日：</label><span>{{ userInfo.formatEndTime }}</span>
                    </div>
                    <div v-if="userInfo.isAbout2Expire" class="info_item">
                        套餐即将到期请尽快<van-button type="primary" @click="upgradeVip">续费</van-button>
                    </div>
                </template>
            </template>
            <template v-else>
                <div class="info_item">
                    <label>剩余次数：</label><span>{{ userInfo.balance }}次</span>
                </div>
                <div class="info_item">
                    <van-button type="primary" @click="upgradeVip">开通套餐</van-button>无限畅聊
                </div>
            </template>

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
import { useUserInfo } from '@/stores/userInfo'

const userInfo = useUserInfo()

const showRecharge = ref(false)
const upgradeVip = () => {
    showRecharge.value = true
}


</script>

<style scoped>
.account {
    height: 100%;
    background-color: var(--bodyBg);
}

.account header {
    background-color: var(--aiChatBg);
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
    display: flex;
    align-items: center;
    justify-content: center;
}

.info_item:deep(.van-button) {
    margin: 0 5px;
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
