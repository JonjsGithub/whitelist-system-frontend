<template>
    <el-card v-if="!isUserExist">
        <span class="text-xl font-extrabold text-red-700">用户 (ID: {{ props.id }}) 不存在!</span>
    </el-card>
    <el-card v-if="ok">

        <template #header>
            <div>
                <span class="text-xl font-extrabold">编辑用户 - {{ info.name }}</span>
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
                <el-col :span="4"><span class="text-black">ID</span></el-col>
                <el-col :span="20"><el-input v-model="info.id" disabled /></el-col>
            </el-row>
            <el-row :gutter="16" class=" justify-start items-start">
                <el-col :span="4"><span class="text-black">游戏名</span></el-col>
                <el-col :span="20"><el-input v-model="info.name" disabled /></el-col>
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
                    <el-input-number :min="0" :max="2" @change="handleChange" v-model="info.permission" />
                </el-col>
            </el-row>
            <el-row :gutter="16" class=" justify-start items-start">
                <el-col :span="4"><span class="text-black">加入于</span></el-col>
                <el-col :span="20"><el-input v-model="info.createTime" disabled /></el-col>
            </el-row>
        </el-form>

        <template #footer>
            <div v-if="rconOK">
                <el-row v-if="showTip">
                    <el-text type="danger">* {{ permTipText }}</el-text>
                </el-row>
                <el-button type="success" @click="handleSubmit">保存修改</el-button>
            </div>
        </template>

    </el-card>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useRouter } from 'vue-router'

import { getUserInfoByID, updateInfo } from '~/api/user.js'
import { addWhitelist } from '~/api/whitelist.js'
import { deleteWhitelist } from '~/api/whitelist.js'
import { getRconStatus } from '~/api/whitelist.js'

import { ElNotification } from 'element-plus'



const props = defineProps({
    id: 0
})

const showTip = ref(true)
const permTipText = ref("")
const rconOK = ref(false)
const isUserExist = ref(true)
const router = useRouter()
const id = props.id
const info = ref("")
const ok = ref(false)
console.log(id)

const handleRconStatus = async () => {
    let result = await getRconStatus()
    if (result.code == 0) {
        rconOK.value = false
    } else if (result.code == 1) {
        rconOK.value = true
    }
}
handleRconStatus()

const handlePermChange = () => {
    if (info.value.permission == null) {
        return;
    }
    switch (info.value.permission) {
        case 0:
            permTipText.value = "权限设置为 0, 系统将在提交后尝试取消该玩家的白名单"
            break
        case 1:
            permTipText.value = "权限设置为 1, 系统将在提交后尝试使玩家加入白名单内"
            break
        case 2:
            permTipText.value = "权限设置为 2, 该账号将成为网站管理员"
            break
        default:
            permTipText.value = "权限设置错误"
            break

    }
}

const getInfo = async () => {
    let result = await getUserInfoByID(id)
    if (result.data == null) {
        isUserExist.value = false
        return
    }
    info.value = result.data
    handlePermChange()
    ok.value = true
}
getInfo(id)

const handleUpdateInfo = async () => {
    let result = await updateInfo(info.value)
    getInfo(id)
    console.log(result)
    if (result.code == 1) {
        ElNotification({
            title: "成功",
            message: result.msg,
            type: "success",
        })
    }
}

const handleSubmit = async () => {

    let perm = info.value.permission
    let res = null
    if (perm == 0 || perm == 1) {
        if (perm == 1) {
            res = await addWhitelist(info.value.name)
        } else if (perm == 0) {
            res = await deleteWhitelist(info.value.name)
        }
        if (res != null && rconOK.value && res.code == 1) {
            // 成功
            ElNotification({
                title: "成功",
                message: res.msg,
                type: "success",
            })
            // 更新白名单后再提交信息修改
            handleUpdateInfo()
        }
    } else {
        handleUpdateInfo()
    }


}

const handleChange = (val1) => {
    handlePermChange()
    console.log(val1)
}

</script>

<style scoped></style>

