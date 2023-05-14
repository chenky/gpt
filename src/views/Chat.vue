<template>
    <div class="chat">
        <van-loading v-if="!chatCreating" type="spinner" />
        <template v-else>
            <header>
                <van-icon name="wap-nav" @click="showMenu" />
                <van-popup v-model:show="menu" position="left" :style="{ width: '80%', height: '100%' }">
                    <van-cell-group>
                        <van-cell title="咨询客服" icon="chat-o" is-link to="account" />
                        <van-cell title="我的主页" icon="user-circle-o" is-link to="account" />
                    </van-cell-group>
                </van-popup>
            </header>
            <!-- <div class="free_tip">有10次免费提问</div> -->
            <div v-if="enableChat" class="content">
                <div :class="{ chat_item: true, chat_ai_item: index % 2 !== 0, chat_user_item: index % 2 === 0 }"
                    v-for="(chat, index) in chats">
                    <icon_aichat class="icon_avatar icon_ai_avatar" v-if="index % 2 !== 0"></icon_aichat>
                    <van-image class="icon_avatar icon_user_avatar" v-if="index % 2 === 0"
                        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
                    <div class="chat_text" v-html="chat"></div>
                    <icon_copy class="copy" :msg="chat" v-if="index % 2 !== 0"></icon_copy>
                </div>
                <div v-show="lastAIchat" class="chat_item chat_ai_item">
                    <icon_aichat class="icon_avatar icon_ai_avatar"></icon_aichat>
                    <!-- <div id="last_aichat_content"
                        :class="{ chat_text: true, waiting: cursor === cCURSOR_STATUS.waiting, typing: cursor === cCURSOR_STATUS.typing }">
                    </div> -->
                    <div :class="{ chat_text: true, waiting: cursor === cCURSOR_STATUS.waiting, typing: cursor === cCURSOR_STATUS.typing }"
                        v-html="lastAIchat"></div>
                    <!-- <icon_copy class="copy" :msg="lastAIchat"></icon_copy> -->
                </div>
            </div>
            <div v-if="outOfDate" class="recharge_tip">
                您的套餐已到期，请即刻<van-button type="primary" @click="upgradeVip">充值</van-button>，体验畅聊
            </div>
            <div v-if="insufficientBalance" class="recharge_tip">
                您的聊天次数已用完，请即刻
                <van-button type="primary" @click="upgradeVip">充值</van-button>，体验畅聊
            </div>
            <footer>
                <div class="msg_input">
                    <van-field v-model="prompt" :disabled="!enableChat" placeholder="请输入..." label="" />
                    <van-button class="send_msg" :loading="loading" :disabled="!enableChat || loading || !prompt"
                        @click="ask">
                        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
                            stroke-linejoin="round" class="h-4 w-4 mr-1" height="1em" width="1em"
                            xmlns="http://www.w3.org/2000/svg">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </van-button>
                </div>
            </footer>
            <RechargeDialog v-model:visible="showRecharge"></RechargeDialog>
        </template>
    </div>
</template>

<script setup lang="ts">
import {
    ref, reactive, onBeforeMount
} from 'vue'
import { showToast } from 'vant';
import icon_aichat from '@/assets/icon/icon_aichat.vue'
import icon_copy from '@/assets/icon/icon_copy.vue'
import RechargeDialog from '@/components/RechargeDialog.vue'
import { useUserInfo } from '@/stores/userInfo'
import { useChat } from '@/stores/chat'
import { CURSOR_STATUS } from '@/utils/const'

const cCURSOR_STATUS = CURSOR_STATUS
const userInfo = useUserInfo()
const chat = useChat()
const menu = ref(false)
const prompt = ref('')
const chats: Array<string> = reactive([])
const lastAIchat = ref('')
const showRecharge = ref(false)
const loading = ref(false)
const cursor = ref(CURSOR_STATUS.normal)

const outOfDate = ref(userInfo.isVip && userInfo.isOutOfDate)
const insufficientBalance = ref(!userInfo.isVip && userInfo.balance < 1)

const enableChat = ref((userInfo.isVip && !userInfo.isOutOfDate) || (!userInfo.isVip && userInfo.balance > 0))


const chatCreating = ref(false)

onBeforeMount(() => {
    chat.createChat({ model: 'gpt-3.5-turbo' }).then(() => {
        chatCreating.value = true
    })
})

function ask () {
    // return post({
    //     url: '/ask_chatgpt',
    //     data: { uid, prompt }
    // })
    // const uid = ''
    if (loading.value || !prompt.value) return

    const last_aichat_content = document.getElementById('last_aichat_content')

    chats.push(prompt.value)
    // prompt.value = ''
    loading.value = true
    cursor.value = CURSOR_STATUS.waiting

    // const query = `model=${encodeURIComponent("gpt-3.5-turbo")}&chatConvId=${encodeURIComponent(chat.chatConvId)}&question=${encodeURIComponent(prompt.value)}`
    // const url = `${import.meta.env.VITE_BASE_URL}/api/chat/ask_stream/?${query}`
    const query = `userId=${encodeURIComponent(userInfo.uid)}&chatConvId=${encodeURIComponent(chat.chatConvId)}`
    const url = `${import.meta.env.VITE_BASE_URL}/yundiApp/gpt/createSse?${query}`
    // const url = `http://43.153.124.180:8080/api/chat/ask_stream/?${query}`
    const eventSource = new EventSource(url)

    // eventSource.addEventListener('open', event => {
    //     cursor.value = CURSOR_STATUS.typing;
    // })
    let startMessage = false
    // eventSource.addEventListener('open', event => {
    //     // 问题传给后端，同时发起sse流式数据返回
    //     // event source api detail, css 选择器优先级
    //     // chat.postChatQuestion({ model: 'gpt-3.5-turbo', question: prompt.value })
    // })
    eventSource.addEventListener('message', event => {
        // alert(`Said: ${event.data}`);

        const { lastEventId, data } = event
        // console.log(event, 'onmessage')

        // 回答完了
        if (lastEventId == "[DONE]") {
            chats.push(lastAIchat.value)
            lastAIchat.value = ''
            loading.value = false
            cursor.value = CURSOR_STATUS.normal
            eventSource.close()
            return;
        }

        if (lastEventId == "[TOKENS]") {
            return;
        }

        if (!startMessage) {
            cursor.value = CURSOR_STATUS.typing;
            startMessage = true
        }

        const jsonData = JSON.parse(data)
        if (jsonData?.content) {
            lastAIchat.value += jsonData.content
            last_aichat_content && (last_aichat_content.innerHTML = lastAIchat.value)
        }

    });
    // eventSource.addEventListener('complete', event => {

    //     const { data } = event
    //     // recharged, balance
    //     const { recharged, balance, isOutOfDate } = data
    //     if (isOutOfDate === 1) {
    //         userInfo.setState({ recharged, balance, endTime: new Date("1980.1.1").valueOf() })
    //     } else {
    //         userInfo.setState({ recharged, balance })
    //     }
    // });
    eventSource.addEventListener('error', event => {
        // console.log('sse error', event)
        loading.value = false
        cursor.value = CURSOR_STATUS.normal
        showToast({ message: '出错了，请重试', duration: 500 });
        eventSource.close()
    });
    setTimeout(() => {
        chat.postChatQuestion({ model: 'gpt-3.5-turbo', question: prompt.value })
        prompt.value = ''
    }, 500);
}


const showMenu = () => {
    menu.value = true;
}

const upgradeVip = () => {
    showRecharge.value = true
}

</script>

<style scoped>
.chat {
    width: 100%;
    min-height: 100%;
    padding: var(--menuHeight) 0 var(--chatHeight) 0;
}

.chat:deep(.van-loading) {
    display: flex;
    height: calc(100vh - var(--menuHeight) - var(--chatHeight));
    align-items: center;
    justify-content: center;
}

.chat:deep(header),
.chat:deep(footer) {
    background-color: var(--bodyBg);
    position: fixed;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    align-items: center;
}

.chat:deep(header) {
    background-color: var(--headerBg);
    color: var(--headerColor);
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
    font-size: var(--titleFontsize);
}

.chat_item:not(:first-child) {
    /* border-top: var(--border-Color) solid var(--borderWidth); */
}

/* .chat_item:nth-of-type(even) {
    background-color: var(--bodyBg);
} */

.chat_user_item {
    /* justify-content: flex-end; */
}

.icon_avatar {
    flex: var(--iconAvatarWrapWidth) 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--iconAvatarWrapWidth);
    height: var(--iconAvatarWrapHeight);
}

.icon_avatar:deep(svg) {
    width: var(--iconAvatarWidth);
    height: var(--iconAvatarHeight);
}

.icon_ai_avatar {
    background-color: var(--primaryBtnBg);
    color: var(--bodyBg);
}

.chat_ai_item {
    background-color: var(--aiChatBg);
    color: var(--aiChatColor);
    border: var(--borderWidth) solid var(--borderColor);
    border-left: none;
    border-right: none;
}

.chat_text {
    margin-left: 10px;
    flex: 1;
    white-space: pre-wrap;
    word-wrap: break-word;
}

/* 光标字符显示 */
.typing::after,
.waiting::after {
    content: ' ▌';
    color: var(--subMainColor);
}

/* 光标闪烁动画 */
.waiting::after {
    animation: waiting 1s step-end infinite;
}

@keyframes waiting {
    0% {
        visibility: visible;
    }

    50% {
        visibility: hidden;
    }

    100% {
        visibility: visible;
    }
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
    display: flex;
    align-items: center;
    justify-content: center;
}

.msg_input {
    display: flex;
    border: var(--borderWidth) solid var(--borderColor);
    height: 44px;
    width: 90%;
    box-shadow: 0 0 transparent, 0 0 transparent, 0 0 10px var(--borderColor);
}

.chat:deep(footer .van-icon-guide-o) {
    font-size: 20px;
    margin-right: 15px;
    /* transform: rotate(45deg); */
}

.send_msg {
    border: none;
    color: var(--lightFontColor);
    height: 100%;
}

.send_msg:deep(.van-button__text) {
    display: flex;
    align-items: center;
    justify-content: center;
}

.send_msg svg {
    width: 16px;
    height: 16px;
}
</style>