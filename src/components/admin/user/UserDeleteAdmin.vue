<template>
    <el-card v-if="!isUserExist">
        <span class="text-xl font-extrabold text-red-700">用户 (ID: {{ props.id }}) 不存在!</span>
    </el-card>
    <el-card v-if="ok">

        <template #header>
            <div>
                <span class="text-xl font-extrabold text-red-700">删除用户 - {{ info.name }}</span>
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
                <el-col :span="20"><el-input v-model="info.password" disabled /></el-col>
            </el-row>
            <el-row :gutter="16" class=" justify-start items-start">
                <el-col :span="4"><span class="text-black">Email</span></el-col>
                <el-col :span="20"><el-input v-model="info.email" disabled /></el-col>
            </el-row>
            <el-row :gutter="16" class=" justify-start items-start">
                <el-col :span="4"><span class="text-black">QQ</span></el-col>
                <el-col :span="20"><el-input v-model="info.qq" disabled /></el-col>
            </el-row>
            <el-row :gutter="16" class=" justify-start items-start">
                <el-col :span="4"><span class="text-black">权限</span></el-col>
                <el-col :span="20">
                    <el-input-number :min="0" :max="2" v-model="info.permission" disabled />
                </el-col>
            </el-row>
            <el-row :gutter="16" class=" justify-start items-start">
                <el-col :span="4"><span class="text-black">加入于</span></el-col>
                <el-col :span="20"><el-input v-model="info.createTime" disabled /></el-col>
            </el-row>
        </el-form>

        <template #footer>
            <div v-if="rconOK">
                <el-button type="danger" @click="handleDelete">确认删除</el-button>
            </div>
        </template>

    </el-card>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useRouter } from 'vue-router'

import { deleteUser, getUserInfoByID } from '~/api/user.js'
import { deleteWhitelist } from '~/api/whitelist.js'
import { getRconStatus } from '~/api/whitelist.js'

import { ElNotification } from 'element-plus'



const props = defineProps({
    id: 0
})

const rconOK = ref(false)
const isUserExist = ref(true)
const router = useRouter()
const id = props.id
const info = ref("")
const ok = ref(false)
console.log(id)

const getInfo = async (id) => {
    let result = await getUserInfoByID(id)
    if (result.data == null) {
        isUserExist.value = false
        return
    }
    info.value = result.data
    ok.value = true
}
getInfo(id)

const handleRconStatus = async () => {
    let result = await getRconStatus()
    if (result.code == 0) {
        rconOK.value = false
    } else if (result.code == 1) {
        rconOK.value = true
    }
}
handleRconStatus()

const handleDelete = async () => {

    let res = await deleteWhitelist(info.value.name)
    if (res != null && rconOK.value && res.code == 1) {
        // 成功
        ElNotification({
            title: "成功",
            message: res.msg,
            type: "success",
        })
        let result = await deleteUser(id)
        console.log(result)
        if (result.code == 1) {
            ElNotification({
                title: "成功",
                message: result.msg,
                type: "success",
            })
            router.push("/admin/user/list")
        }
    }


}

</script>

<style scoped></style>

