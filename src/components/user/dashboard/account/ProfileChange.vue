<template>
    <el-card v-if="ok">

        <template #header>
            <div>
                <span class="text-xl font-extrabold">修改个人资料</span>
            </div>
        </template>

        <el-form v-model="info">
            <el-row :gutter="16" class=" justify-start items-start">
                <el-col :span="4"><span class="text-black">ID</span></el-col>
                <el-col :span="20"><el-input v-model="info.id" disabled /></el-col>
            </el-row>
            <el-row :gutter="16" class=" justify-start items-start">
                <el-col :span="4"><span class="text-black">游戏名</span></el-col>
                <el-col :span="20"><el-input v-model="info.name" disabled /></el-col>
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
                <el-col :span="4"><span class="text-black">加入于</span></el-col>
                <el-col :span="20"><el-input v-model="info.createTime" disabled /></el-col>
            </el-row>
        </el-form>

        <template #footer>
            <div>
                <el-button type="success" @click="handleUpdateInfo">保存修改</el-button>
            </div>
        </template>

    </el-card>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useRouter } from 'vue-router'

import { getUserInfoByID, updateInfo } from '~/api/user.js'

import { ElNotification } from 'element-plus'

const props = defineProps({
    user: ""
})

const isUserExist = ref(true)
const router = useRouter()
const info = ref("")
const ok = ref(false)
const user = reactive(JSON.parse(props.user))
const id = ref(0)
id.value = user.id

const getInfo = async (param) => {
    let result = await getUserInfoByID(param)
    if (result.data == null) {
        isUserExist.value = false
        return
    }
    info.value = result.data
    ok.value = true
}
getInfo(id.value)

const handleUpdateInfo = async () => {
    let result = await updateInfo(info.value)
    getInfo(id.value)
    console.log(result)
    if (result.code == 1) {
        ElNotification({
            title: "成功",
            message: result.msg,
            type: "success",
        })
        router.push("/dashboard/")
    }
}

</script>

<style scoped></style>

