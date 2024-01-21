<template>
    <el-container class="layout-container-demo w-screen">
        <el-container>
            <!-- header 导航 -->
            <HeaderMenu :user="user" />
            <el-header hidden>
                <span class=" text-red-600 font-extrabold text-3xl mt-3 float-start">五彩世界白名单自助申请系统</span>
            </el-header>
            <!-- 页header -->
            <el-page-header @back="onBack('/dashboard/')" class=" ml-3 mt-3 mb-3">
                <template #breadcrumb>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/dashboard/' }">
                            个人控制台
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>老玩家快捷通道</el-breadcrumb-item>
                    </el-breadcrumb>
                </template>
                <template #content>
                    <span class="text-large font-600 mr-3"> 老玩家快捷通道 </span>
                </template>
            </el-page-header>



            <el-main>
                <!-- 主要内容 -->

                <!-- 用户编辑 -->

                <OldPlayer :user="user" />


            </el-main>
            <FooterText></FooterText>
        </el-container>
    </el-container>
</template>
  
<script setup>
import { useCookies } from "@vueuse/integrations/useCookies"
import { useRouter } from "vue-router"
import { ref } from "vue"

import HeaderMenu from "~/components/user/website/HeaderMenu.vue"
import FooterText from '~/components/FooterText.vue'

import OldPlayer from "~/components/user/dashboard/account/OldPlayer.vue"

const router = useRouter()
const route = router.currentRoute.value

const user = ref("")
user.value = localStorage.getItem("user")

const onBack = (r) => {
  router.push(r)
}

</script>
  
<style scoped></style>
