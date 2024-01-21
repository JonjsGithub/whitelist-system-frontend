<template>
    <el-container class="layout-container-demo w-screen">
        <el-container>
            <HeaderMenu :user="user"></HeaderMenu>
            <el-header hidden>
                <span class=" text-red-600 font-extrabold text-3xl mt-3 float-start">五彩世界白名单自助申请</span>
            </el-header>
            <!-- 页header -->
            <el-page-header @back="toDashboard" class=" ml-3 mt-3 mb-3">
                <template #breadcrumb>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">
                            五彩世界白名单自助申请
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>考试</el-breadcrumb-item>
                        <el-breadcrumb-item>申请须知</el-breadcrumb-item>
                    </el-breadcrumb>
                </template>
                <template #content>
                    <span class="text-large font-600 mr-3"> 申请须知 </span>
                </template>
            </el-page-header>
            <el-main>
                <!-- 主要内容 -->
                <!-- 须知区域 -->
                <div>
                    <BeforeExam />
                </div>
            </el-main>
            <FooterText></FooterText>
        </el-container>
    </el-container>
</template>
  
<script setup>
import { useCookies } from "@vueuse/integrations/useCookies"
import { useRouter } from "vue-router"
import { computed, ref } from "vue"

import HeaderMenu from "~/components/user/website/HeaderMenu.vue";
import FooterText from '~/components/FooterText.vue'
import BeforeExam from '~/components/exam/BeforeExam.vue'

import { ElNotification } from "element-plus"

const router = useRouter();

// ref 数据
const user = ref("")
user.value = localStorage.getItem("user")

const toDashboard = ()=>{
    router.push("/dashboard/")
}

</script>
  
<style scoped>
.layout-container-demo .el-header {
    @apply bg-blue-200 text-black relative;
}

.layout-container-demo .el-main {
    padding: 8px;
}

.layout-container-demo .toolbar {
    height: 100%;
    right: 24px;
    @apply inline-flex items-center justify-center;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-box {
    width: 50%
}
</style>
