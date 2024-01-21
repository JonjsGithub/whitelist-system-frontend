<template>
</template>

<script setup>
import { useCookies } from '@vueuse/integrations/useCookies'
import { useRouter } from 'vue-router'
import { useTokenStore } from '~/stores/token'
import { ElNotification } from 'element-plus'

const cookies = useCookies()
const router = useRouter()
const token = cookies.get("token")
const tokenStore = useTokenStore()
const name = localStorage.getItem("name")
const permission = parseInt(localStorage.getItem("permission"))

if (token == null || name == null || permission == null) {
    ElNotification({
        title: "错误",
        message: "您尚未登录",
        type: 'error'
    })
    router.push("/login")
} else {
    ElNotification({
        title: "成功",
        message: "账号已退出登录",
        type: 'success'
    })
    cookies.remove("token")
    tokenStore.removeToken()
    localStorage.clear()
    sessionStorage.clear()
    router.push("/login")
}

</script>
