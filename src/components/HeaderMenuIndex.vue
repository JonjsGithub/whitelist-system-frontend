<template>
    <!-- header 导航 -->
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
    >
        <el-menu-item index="1">注册</el-menu-item>
        <el-menu-item index="2">登录</el-menu-item>
        <el-menu-item index="3">个人控制台</el-menu-item>
    </el-menu>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useRouter } from 'vue-router'

import { ElNotification } from 'element-plus';

const router = useRouter()

// 横向导航菜单逻辑处理
const activeIndex = ref("3")
const handleSelect = (key, keyPath) => {
    console.log(key, keyPath)
    switch (key) {
        case "1":
            router.push("/register")
            break
        case "2":
            router.push("/login")
            break
        case "3":
            router.push("/dashboard/")
            break
        default:
    }
}

</script>

<style scoped></style>

