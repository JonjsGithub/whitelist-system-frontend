<template>
    <el-container class="layout-container-demo w-screen">
        <el-container>
            <!-- header 导航 -->
            <HeaderMenuAdmin :user="user"></HeaderMenuAdmin>
            <el-header hidden>
                <span class=" text-red-600 font-extrabold text-3xl mt-3 float-start">五彩世界白名单后台</span>
            </el-header>
            <!-- 页header -->
            <el-page-header @back="onBack('/admin/user/list')" class=" ml-3 mt-3 mb-3">
                <template #breadcrumb>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/admin/' }">
                            后台
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>用户</el-breadcrumb-item>
                        <el-breadcrumb-item>新增用户</el-breadcrumb-item>
                    </el-breadcrumb>
                </template>
                <template #content>
                    <span class="text-large font-600 mr-3"> 新增用户 </span>
                </template>
            </el-page-header>



            <el-main>
                <!-- 主要内容 -->

                <!-- 用户编辑 -->

                <UserAddAdmin></UserAddAdmin>


            </el-main>
            <FooterText></FooterText>
        </el-container>
    </el-container>
</template>
  
<script setup>
import { useCookies } from "@vueuse/integrations/useCookies"
import { useRouter } from "vue-router"
import { ref } from "vue"

import HeaderMenuAdmin from "~/components/admin/website/HeaderMenuAdmin.vue"
import FooterText from '~/components/FooterText.vue'
import UserAddAdmin from '~/components/admin/user/UserAddAdmin.vue'

import { ElNotification } from "element-plus";

const router = useRouter()
const route = router.currentRoute.value

const user = ref("")
user.value = localStorage.getItem("user")

const onBack = (r) => {
  router.push(r)
}

</script>
  
<style scoped></style>
