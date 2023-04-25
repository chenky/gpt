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
                <icon_aichat v-if="index % 2 !== 0"></icon_aichat>
                <div class="chat_text" v-html="chat"></div>
                <van-icon v-if="index % 2 === 0" name="manager" />
            </div>
            <div class="chat_item">
                <icon_aichat></icon_aichat>
                <div class="chat_text" v-html="lastAIchat"></div>
            </div>
        </div>
        <div class="recharge_tip">
            免费额度已经用完，充值可无限畅聊，点击
            <van-button type="primary">查看详情</van-button>
        </div>
        <footer>
            <van-field v-model="text" label="" />
            <van-icon name="guide-o" @click="send" />
        </footer>
    </div>
</template>

<script setup lang="ts">
import {
    ref, reactive
} from 'vue'
import icon_aichat from '@/assets/icon/icon_aichat.vue'

const menu = ref(false)
const text = ref('请输入...')
const chats = reactive(['股市涨跌了吗', '对不起我是ai模型无法预测股市涨跌', '东方财富未来估计是多少呢？不要含糊其辞说套话，给一个具体价格', '抱歉真的无法预测', '预测一下吗'])
const lastAIchat = ref('真的吗')

const showMenu = () => {
    menu.value = true;
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
    position: fixed;
    left: 0;
    right: 0;
    width: 100%;
}

.chat:deep(header) {
    top: 0;
    height: var(--menuHeight);
    border-bottom: var(--borderWidth) solid var(--borderColor);
}

.content {
    padding: 5px;
}

.chat_item {
    display: flex;
    align-items: center;
}

.chat_user_item {
    justify-content: flex-end;
}

.chat_ai_item>.chat_text {
    margin-left: 5px;
}

.chat_user_item>.chat_text {
    margin-right: 5px;
}

.chat:deep(footer) {
    bottom: 0;
    height: var(--chatHeight);
    border-top: var(--borderWidth) solid var(--borderColor);
}
</style>