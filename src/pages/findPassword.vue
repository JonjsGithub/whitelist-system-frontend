<template>
    <el-row class="relative min-h-screen flex">
        <div
            class="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
            <div
                class="h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-indigo-700 text-white bg-no-repeat bg-cover relative">
                <div class="w-full max-w-md z-10">
                    <!-- 左侧文字 -->
                    <div class="font-bold text-5xl text-white mb-4">
                        五彩世界<br />白名单自助申请系统
                    </div>
                    <div class="text-gray-200 text-sm">
                        ColorfulWorld Server Whitelist Manage System
                    </div>
                </div>
            </div>
            <div
                class="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8 md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
                <div class="max-w-md w-full mx-auto space-y-8">
                    <div class="text-center">
                        <!-- 右侧文字 -->
                        <h2 class="mt-6 text-3xl font-bold text-gray-900">找回密码</h2>
                    </div>
                    <div class="flex items-center justify-center space-x-2">
                        <span class="h-px w-16 bg-gray-200"></span>
                        <span class="text-gray-300 font-normal">填写信息以找回密码</span>
                        <span class="h-px w-16 bg-gray-200"></span>
                    </div>
                    <!-- 表单开始 -->
                    <el-form :model="form" :rules="rules" ref="formRef" class="mt-8 space-y-6">
                        <el-form-item prop="name" class="relative">
                            <el-input v-model="form.name" placeholder="游戏名">
                                <template #prefix>
                                    <el-icon>
                                        <user />
                                    </el-icon>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="email" class="mt-8 content-center">
                            <el-input v-model="form.email" placeholder="电子邮箱地址">
                                <template #prefix>
                                    <el-icon><Wallet /></el-icon>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button round color="#CC0000" :disabled="posted" class="w-dvw" type="primary"
                                @click="onSubmit">找回密码</el-button>
                        </el-form-item>
                    </el-form>
                    <!-- 表单下方文字 -->
                    <p class="items-center justify-center mt-10 text-center text-md text-gray-700">
                        <span>想到密码了? </span>
                        <a href="/login"
                            class="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300">现在登录</a>
                    </p>

                    <!-- 备案号 -->
                    <FooterText />

                </div>
            </div>
        </div>
    </el-row>
</template>
  
<script setup>
import { reactive, ref } from "vue";
import { ElNotification } from "element-plus";
import { findPassword } from "~/api/password.js";
import { useRouter } from "vue-router";

import FooterText from "~/components/FooterText.vue";

const router = useRouter();


const form = reactive({
    name: "",
    email: "",
});

const rules = {
    username: [
        { required: true, message: "必须输入用户名", trigger: "blur" },
        { min: 3, max: 24, message: "用户名长度必须在 3~24 之间", trigger: "blur" },
    ],
    password: [
        { required: true, message: "必须输入电子邮箱地址", trigger: "blur" },
        { min: 5, max: 128, message: "密码长度必须在 5~128 之间", trigger: "blur" },
    ],
};

const formRef = ref(null);

const posted = ref(false);

const onSubmit = () => {
    formRef.value.validate(async (valid) => {
        if (!valid) {
            return false;
        }
        posted.value = true
        let res = await findPassword(form.name, form.email)
        if (res.code == 1) {
            posted.value = true
            ElNotification({
                title: "成功",
                message: res.msg,
                type: "success",
            });
        } else {
            posted.value = false
        }
    });
};
</script>
  
<style scoped></style>
  