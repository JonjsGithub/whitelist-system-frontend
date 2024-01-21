<template>
    <el-card v-if="ok">

        <template #header>
            <div>
                <span class="text-xl font-extrabold">重置密码</span>
            </div>
        </template>

        <div v-if="!valid">
            <el-row>
                <span class=" text-red-700 font-extrabold text-3xl">抱歉, 验证码已失效!</span>
            </el-row>
        </div>

        <div v-if="valid">
        <el-form v-model="info">
            <el-row :gutter="16" class=" justify-start items-start">
                <el-col :span="10"><span class="text-black font-bold">验证码</span></el-col>
                <el-col :span="14"><el-input v-model="info.vcode" disabled /></el-col>
            </el-row>
            <el-row :gutter="16" class=" justify-start items-start">
                <el-col :span="10"><span class="text-black font-bold">新密码</span></el-col>
                <el-col :span="14"><el-input v-model="info.newPassword" type="password" show-password /></el-col>
            </el-row>
            <el-row :gutter="16" class=" justify-start items-start">
                <el-col :span="10"><span class="text-black font-bold">重复新密码</span></el-col>
                <el-col :span="14"><el-input v-model="info.newPasswordRepeated" type="password" show-password /></el-col>
            </el-row>
            <el-row>
                <span class=" text-red-700 font-bold text-lg">* 密码设置要求: 小写/大写字母/数字/特殊符号至少包含 2 种, 长度 6~32 位</span>
            </el-row>
        </el-form>
        </div>

        <template #footer>
            <div>
                <el-button type="danger" @click="handleSubmit" v-if="valid">确定重置密码</el-button>
                <el-button type="warning" @click="toFindPassword" v-if="!valid">重新找回密码</el-button>
            </div>
        </template>

    </el-card>
</template>

<script setup>

import { ElNotification } from 'element-plus'
import { reactive, ref } from 'vue'

import { vcodeStatus, resetPassword } from '~/api/password.js'

import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
    vcode: "",
})

const info = reactive({
    vcode: "",
    newPassword: "",
    newPasswordRepeated: "",
})

info.vcode = props.vcode

const ok = ref(false)
const valid = ref(false)

if (props.vcode == "" || props.vcode == null) {
    ElNotification({
        title: "错误",
        message: "验证码为空",
        type: "error",
    })
}

const VerifyVCodeStatus = async()=>{
    let result = await vcodeStatus(props.vcode)
    if (result.code == 1) {
        valid.value = true
    }
    ok.value = true
}
VerifyVCodeStatus()

const handleSubmit = async()=>{
    let result = await resetPassword(info.vcode, info.newPassword, info.newPasswordRepeated)
    if (result.code == 1) {
        ElNotification({
            title: "成功",
            message: "密码重置成功",
            type: "success",
        })
        router.push("/login")
    }
}

const toFindPassword = async ()=>{
    router.push("/findPassword")
}

</script>

<style scoped>

</style>