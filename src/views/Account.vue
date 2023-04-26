<template>
<div>
    <header>
        <van-image
  round
  width="10rem"
  height="10rem"
  src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
/>

        <template>
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
        <div class="info_item">
            <label>剩余次数：</label><span>30次</span>
        </div>
    </header>
    <van-cell-group>
        <van-cell title="订阅升级VIP" />
        <van-cell title="退出登录" />
    </van-cell-group>
    <footer>
        <div>联系客服</div>
        <van-image
  width="100"
  height="100"
  src="https://upload.jianshu.io/images/js-qrc.png"
/>

    </footer>
</div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>
