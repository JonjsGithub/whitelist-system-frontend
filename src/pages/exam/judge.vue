<template>
    <el-container class="layout-container-demo w-screen">
        <el-container>
            <HeaderMenu :user="user"></HeaderMenu>
            <el-header hidden>
                <span class=" text-red-600 font-extrabold text-3xl mt-3 float-start">五彩世界白名单考试</span>
            </el-header>
            <!-- 页header -->
            <el-page-header class=" ml-3 mt-3 mb-3">
                <template #breadcrumb>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">
                            五彩世界白名单自助申请
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>考试</el-breadcrumb-item>
                        <el-breadcrumb-item>提交</el-breadcrumb-item>
                    </el-breadcrumb>
                </template>
                <template #content>
                    <span class="text-large font-600 mr-3"> 提交完成 </span>
                </template>
            </el-page-header>
            <el-main>
                <!-- 主要内容 -->
                <!-- 考试区域 -->
                <div>
                    <el-card v-if="ok">
                        <template #header>
                            <p class="text-4xl font-bold text-green-800">感谢, 考试内容已提交!</p>
                        </template>
                        <p class="text-2xl font-bold text-black">您的得分: {{ res.score }} 分</p>
                        <p class="text-2xl font-bold text-black">通过需要: {{ passScore }} 分</p>
                        <p v-if="passed" class="text-2xl font-extrabold text-green-700">恭喜, 考试已通过! 请前往个人控制台点击获取白名单</p>
                        <p v-if="!passed" class="text-2xl font-extrabold text-red-700">很遗憾, 考试未通过!</p>
                        <template #footer>
                            <el-button @click="toDashboard" type="primary" size="large">回到个人控制台</el-button>
                        </template>
                    </el-card>
                </div>
            </el-main>
            <FooterText></FooterText>
        </el-container>
    </el-container>
</template>

<script setup>

import { useRouter } from 'vue-router';
import { reactive, ref } from 'vue'
import { submit } from '~/api/exam.js';

import { useQuestionStore } from "~/stores/questions.js";
import { getConfig } from '~/api/website.js'

import HeaderMenu from '~/components/user/website/HeaderMenu.vue'
import FooterText from '~/components/FooterText.vue'

import { ElNotification } from 'element-plus'

const questionStore = useQuestionStore()

const router = useRouter()

const answerStr = ref('')
const ok = ref(false)
const res = ref()
const user = ref("")
const passScore = ref(10000.0)
const passed = ref(false)
const answerSession = sessionStorage.getItem("answers")
user.value = localStorage.getItem("user")

if (answerSession != null) {
    answerStr.value = answerSession
}

const getWebsiteConfig = async () => {
    let result = await getConfig("exam_passScore")
    if (result.code == 1) {
        passScore.value = parseFloat(result.data).toFixed(1)
    }
}

const handleSubmit = async() => {
    getWebsiteConfig()
    let result = await submit(answerStr.value)
    if (result.code == 1) {
        res.value = result.data
        passed.value = res.value.pass
        if (res.value.pass == true) {
            ElNotification({
                title: "恭喜您",
                message: "考试已通过",
                type: "success",
            })
        } else {
            ElNotification({
                title: "抱歉",
                message: "考试未通过",
                type: "error",
            })
        }
        let q = JSON.parse(questionStore.questions)
        for (var i = 0; i < Object.keys(q).length; i++) {
            let j = i + 1
            localStorage.removeItem("question-" + j)
        }
    }
    ok.value = true
}
handleSubmit()

const toDashboard = ()=>{
    router.push("/dashboard/")
}

</script>

<style scoped></style>
