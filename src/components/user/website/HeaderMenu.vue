<template>
    <!-- header 导航 -->
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">回到主页</el-menu-item>
        <el-sub-menu index="2">
            <template #title>{{ userObject.name }}</template>
            <el-menu-item index="2-1">个人信息</el-menu-item>
            <el-menu-item index="2-2" v-if="isAdmin">管理后台</el-menu-item>
            <el-menu-item index="2-3">退出登录</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useRouter } from 'vue-router'

import { ElNotification } from 'element-plus';

const props = defineProps({
    user: ""
})

const cookies = useCookies()
const user = props.user
const token = cookies.get("token")
const router = useRouter()

const isAdmin = ref(false)

if (user == "" || user == null || token == null) {
  ElNotification({
    title: "错误",
    message: "您尚未登录",
    type: "error",
  });
  router.push("/login");
}

const userObject = reactive(JSON.parse(user))

if (userObject.permission >= 2) {
    isAdmin.value = true
}

// 横向导航菜单逻辑处理
const activeIndex = ref('2')
const handleSelect = (key, keyPath) => {
    console.log(key, keyPath)
    switch (key) {
        case "1":
            router.push("/")
            break
        case "2-1":
            router.push("/dashboard/")
            break
        case "2-2":
            router.push("/admin/")
            break
        case "2-3":
            router.push("/logout")
            break
        default:
    }
}

</script>

<style scoped></style>

