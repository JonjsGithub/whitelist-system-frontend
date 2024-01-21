<template>
    <!-- header 导航 -->
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">概览</el-menu-item>
        <el-sub-menu index="2">
            <template #title>用户</template>
            <el-menu-item index="2-1">用户列表</el-menu-item>
            <el-menu-item index="2-2">新增用户</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
            <template #title>题目</template>
            <el-menu-item index="3-1">题目列表</el-menu-item>
            <el-menu-item index="3-2">新增题目</el-menu-item>
        </el-sub-menu>
        <!-- <el-sub-menu index="4">
            <template #title>白名单</template>
            <el-menu-item index="4-1">白名单列表</el-menu-item>
            <el-menu-item index="4-2">快捷新增/移除</el-menu-item>
        </el-sub-menu> -->
        <el-sub-menu index="5">
            <template #title>{{ userObject.name }}</template>
            <el-menu-item index="5-1">个人信息</el-menu-item>
            <el-menu-item index="5-2">退出登录</el-menu-item>
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

const userObject = reactive(JSON.parse(user))
const permission = userObject.permission

if (user == "" || user == null || token == null) {
  ElNotification({
    title: "错误",
    message: "您尚未登录",
    type: "error",
  });
  router.push("/login");
}

if (permission < 2) {
    ElNotification({
        title: "错误",
        message: "您不是管理员",
        type: "error",
    });
    router.push("/dashboard/");
}

// 横向导航菜单逻辑处理
const activeIndex = ref('3')
const handleSelect = (key, keyPath) => {
    console.log(key, keyPath)
    switch (key) {
        case "1":
            router.push("/")
            break
        case "2-1":
            router.push("/admin/user/list")
            break
        case "2-2":
            router.push("/admin/user/add")
            break
        case "3-1":
            router.push("/admin/exam/list")
            break
        case "3-2":
            router.push("/admin/exam/add")
            break
        case "4-1":
            router.push("/admin/whitelist/list")
            break
        case "4-2":
            router.push("/admin/whitelist/edit")
            break
        case "5-1":
            router.push("/dashboard/")
            break
        case "5-2":
            router.push("/logout")
            break
        default:
    }
}

</script>

<style scoped></style>

