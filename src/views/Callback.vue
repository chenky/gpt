<script setup lang="ts">
import { useRouter } from 'vue-router'
import queryString from 'query-string';
import { useUserInfo } from '@/stores/userInfo'

const userInfo = useUserInfo()
const router = useRouter()

const qs = queryString.parse(location.search)

userInfo.wxAuth(qs.code as string).then(() => {
    router.push({ path: '/', query: qs })
}).catch(() => {
    // 清空参数重新授权
    router.push({ path: '/' })
})
</script>