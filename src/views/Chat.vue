<template>
    <div class="chat">
        <header>
            <van-icon name="wap-nav" @click="showMenu" />
            <van-popup v-model:show="menu" position="left" :style="{ width: '80%', height: '100%' }">
                <van-cell-group>
                    <van-cell title="咨询客服" icon="chat-o" is-link to="account" />
                    <van-cell title="我的主页" icon="user-circle-o" is-link to="account" />
                </van-cell-group>
            </van-popup>
        </header>
        <div class="free_tip">有10次免费提问</div>
        <div class="content">
            <div :class="{ chat_item: true, chat_ai_item: index % 2 !== 0, chat_user_item: index % 2 === 0 }"
                v-for="(chat, index) in chats">
                <icon_aichat class="icon_avatar" v-if="index % 2 !== 0"></icon_aichat>
                <div class="chat_text" v-html="chat"></div>
                <van-icon class="icon_avatar" v-if="index % 2 === 0" name="manager" />
            </div>
            <div class="chat_item chat_ai_item">
                <icon_aichat class="icon_avatar"></icon_aichat>
                <div class="chat_text" v-html="lastAIchat"></div>
            </div>
        </div>
        <div class="recharge_tip">
            免费额度已经用完，充值可无限畅聊，点击
            <van-button type="primary" @click="upgradeVip">升级VIP</van-button>
        </div>
        <footer>
            <van-field v-model="text" placeholder="请输入..." label="" />
            <van-icon name="guide-o" @click="send" />
        </footer>
        <van-popup v-model:show="showRecharge" round position="bottom" :style="{ height: '80%' }">
            <Recharge></Recharge>
        </van-popup>
    </div>
</template>

<script setup lang="ts">
import {
    ref, reactive
} from 'vue'
import icon_aichat from '@/assets/icon/icon_aichat.vue'
import Recharge from '@/components/Recharge.vue'

const menu = ref(false)
const text = ref('')
const chats = reactive(['股市涨跌了吗', '对不起我是ai模型无法预测股市涨跌,对不起我是ai模型无法预测股市涨跌,对不起我是ai模型无法预测股市涨跌,对不起我是ai模型无法预测股市涨跌,对不起我是ai模型无法预测股市涨跌,对不起我是ai模型无法预测股市涨跌', '东方财富未来估计是多少呢？不要含糊其辞说套话，给一个具体价格,糊其辞说套话，给一个具体价格,糊其辞说套话，给一个具体价格', '抱歉真的无法预测', '预测一下吗'])
const lastAIchat = ref('真的吗')
const showRecharge = ref(false)

const showMenu = () => {
    menu.value = true;
}

const upgradeVip = () => {
    showRecharge.value = true
}

const send = () => {

}

</script>

<style scoped>
.chat {
    width: 100%;
    min-height: 100%;
    padding: var(--menuHeight) 0 var(--chatHeight) 0;
}

.chat:deep(header),
.chat:deep(footer) {
    background-color: var(--emphasizeFrontColor);
    position: fixed;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    align-items: center;
}

.chat:deep(header) {
    top: 0;
    height: var(--menuHeight);
    padding: 0 15px;
    z-index: 30;
    border-bottom: var(--borderWidth) solid var(--borderColor);
}

.chat:deep(header .van-popup) {
    display: flex;
    align-items: flex-end;
}

.chat:deep(header .van-cell-group) {
    width: 100%;
}

.free_tip {
    width: 100%;
    padding: 20px 0;
    text-align: center;
}

.content {
    /* padding: 15px 0; */
}

.chat_item {
    display: flex;
    align-items: flex-start;
    padding: 20px 15px;
}

.chat_item:not(:first-child) {
    /* border-top: var(--border-Color) solid var(--borderWidth); */
}

.chat_item:nth-of-type(even) {
    background-color: var(--emphasizeFrontColor);
}

.chat_user_item {
    justify-content: flex-end;
}

.icon_avatar {
    flex: 20px 0 0;
    width: 20px;
    height: 20px;
    font-size: 20px;
}

.chat_ai_item {
    color: var(--lightFontColor);
    border: var(--borderWidth) solid var(--borderColor);
    border-left: none;
    border-right: none;
}

.chat_ai_item>.chat_text {
    margin-left: 10px;
}

.chat_user_item>.chat_text {
    margin-right: 10px;
}

.recharge_tip {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
    width: 100%;
}

.chat:deep(footer) {
    bottom: 0;
    height: var(--chatHeight);
    border-top: var(--borderWidth) solid var(--borderColor);
}

.chat:deep(footer .van-icon-guide-o) {
    font-size: 28px;
    margin-right: 15px;
    transform: rotate(45deg);
}
</style>