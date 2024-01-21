<template>
    <el-container>
        <el-container>
            <!-- header 导航 -->
            <HeaderMenuIndex />
            <el-header hidden>
                <span class=" text-red-600 font-extrabold text-3xl mt-3 float-start">五彩世界白名单主页</span>
            </el-header>
            <el-main>
                <!-- 主要内容 -->
                <div class="">
                    <el-card>
                        <template #header>
                            <div class="flex items-center justify-center">
                                <span class="text-4xl font-extrabold text-indigo-800">
                                    五彩世界白名单自助申请系统
                                </span>
                            </div>
                        </template>
                        <div class="flex items-center justify-center">
                            <span class="text-3xl font-extrabold text-green-800">
                                通过答题或高校认证均可获得白名单
                            </span>
                        </div>
                        <div class="flex items-center justify-center">
                            <el-row :gutter="16">
                                <el-col :md="8" :span="24">
                                    <el-button @click="toRegister" size="large" plain type="primary">
                                        <el-icon>
                                            <TopRight />
                                        </el-icon>
                                        注册新账号
                                    </el-button>
                                </el-col>
                                <el-col :md="8" :span="24">
                                    <el-button @click="toLogin" size="large" type="primary">
                                        <el-icon>
                                            <TopRight />
                                        </el-icon>
                                        登录已有账号
                                    </el-button>
                                </el-col>
                                <el-col :md="8" :span="24">
                                    <el-button @click="toDashboard" size="large" type="success">
                                        <el-icon>
                                            <Monitor />
                                        </el-icon>
                                        前往个人控制台
                                    </el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                </div>
            </el-main>
            <FooterText />
        </el-container>
    </el-container>
</template>

<script setup>

import { ref } from 'vue'

import HeaderMenuIndex from '~/components/HeaderMenuIndex.vue'
import FooterText from '~/components/FooterText.vue'

import { useRouter } from 'vue-router'

const router = useRouter()

const toRegister = ()=>{
    router.push("/register")
}
const toLogin = ()=>{
    router.push("/login")
}
const toDashboard = ()=>{
    router.push("/dashboard/")
}

</script>

<style scoped>
.bg {
    background-image: url("https://cn.bing.com/th?id=OHR.SleepyWolf_ZH-CN9870873990_1920x1080.jpg");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    padding: 0px;
    width: 100%;
    height: 90%;
    top: 64px;
    left: 0;
}</style>

