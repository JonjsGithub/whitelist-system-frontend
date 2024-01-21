<template>
    <el-card v-if="ok">

        <template #header>
            <div>
                <span class="text-xl font-extrabold">新增用户</span>
                <br />
                <div v-if="rconOK">
                    <span class="text-m font-bold text-green-700">Rcon 连接成功</span>
                </div>
                <div v-else>
                    <span class="text-m font-bold text-red-700">Rcon 连接失败</span>
                </div>
            </div>
        </template>

        <el-form v-model="info" v-if="rconOK">
            <el-row :gutter="16" class=" justify-start items-start">
                <el-col :span="4"><span class="text-black">游戏名</span></el-col>
                <el-col :span="20"><el-input v-model="info.name" prop="name" /></el-col>
            </el-row>

            <el-row :gutter="16" class=" justify-start items-start">
                <el-col :span="4"><span class="text-black">密码</span></el-col>
                <el-col :span="20"><el-input v-model="info.password" /></el-col>
            </el-row>
            <el-row :gutter="16" class=" justify-start items-start">
                <el-col :span="4"><span class="text-black">Email</span></el-col>
                <el-col :span="20"><el-input v-model="info.email" /></el-col>
            </el-row>
            <el-row :gutter="16" class=" justify-start items-start">
                <el-col :span="4"><span class="text-black">QQ</span></el-col>
                <el-col :span="20"><el-input v-model="info.qq" /></el-col>

            </el-row>
            <el-row :gutter="16" class=" justify-start items-start">
                <el-col :span="4"><span class="text-black">权限</span></el-col>
                <el-col :span="20">
                    <el-text type="danger">出于安全考虑, 请新增后再修改权限</el-text>
                </el-col>
            </el-row>
        </el-form>

        <template #footer>
            <div v-if="rconOK">
                <el-button type="success" @click="handleSubmit">新增用户</el-button>
            </div>
        </template>

    </el-card>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useRouter } from 'vue-router'

import { register } from '~/api/user.js'
import { addWhitelist } from '~/api/whitelist.js'
import { deleteWhitelist } from '~/api/whitelist.js'
import { getRconStatus } from '~/api/whitelist.js'

import { ElNotification } from 'element-plus'

const rconOK = ref(false)
const router = useRouter()
const info = reactive({
    name: '',
    password: '',
    email: '',
    qq: '',
})
const ok = ref(false)

const handleRconStatus = async () => {
    let result = await getRconStatus()
    if (result.code == 0) {
        rconOK.value = false
    } else if (result.code == 1) {
        rconOK.value = true
    }
    ok.value = true
}
handleRconStatus()

const handleRegister = async () => {
    let res = await register(
        info.name,
        info.password,
        info.qq,
        info.email,
    )
    if (res.code == 1) {
        ElNotification({
            title: "成功",
            message: "用户新增成功",
            type: "success",
        })
        router.push("/admin/user/list")
    } else {
        ElNotification({
            title: "错误",
            message: "用户新增失败",
            type: "error",
        })
    }
}

const handleSubmit = async () => {

    if (info.email != "" && info.qq != "" && info.name != "" && info.password != "") {
        handleRegister()
    } else {
        ElNotification({
            title: "错误",
            message: "信息不完整",
            type: "error",
        })
    }


}

</script>

<style scoped></style>

