<template>
    <el-card v-if="ok">

        <template #header>
            <div>
                <span class="text-xl font-extrabold">修改密码</span>
            </div>
        </template>

        <el-form v-model="info">
            <el-row :gutter="16" class=" justify-start items-start">
                <el-col :span="8"><span class="text-black">原密码</span></el-col>
                <el-col :span="16"><el-input v-model="info.oldPassword" type="password" show-password /></el-col>
            </el-row>
            <el-row :gutter="16" class=" justify-start items-start">
                <el-col :span="8"><span class="text-black">新密码</span></el-col>
                <el-col :span="16"><el-input v-model="info.newPassword" type="password" show-password /></el-col>
            </el-row>
            <el-row :gutter="16" class=" justify-start items-start">
                <el-col :span="8"><span class="text-black">重复新密码</span></el-col>
                <el-col :span="16"><el-input v-model="info.newPasswordRepeated" type="password" show-password /></el-col>
            </el-row>
        </el-form>

        <template #footer>
            <div>
                <el-button type="danger" @click="handleSubmit">保存修改</el-button>
            </div>
        </template>

    </el-card>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useRouter } from 'vue-router'

import { changePassword } from '~/api/user.js'

import { ElNotification } from 'element-plus'

const props = defineProps({
    user: ""
})

const isUserExist = ref(true)
const router = useRouter()
const info = reactive({
    oldPassword: "",
    newPassword: "",
    newPasswordRepeated: "",
})
const ok = ref(false)
const user = reactive(JSON.parse(props.user))
const id = ref(0)
id.value = user.id

const handleSubmit = async () => {
    let result = await changePassword(info.oldPassword, info.newPassword, info.newPasswordRepeated)
    if (result.code == 1) {
        ElNotification({
            title: "成功",
            message: result.msg,
            type: "success",
        })
        router.push("/dashboard/")
    }
}

ok.value = true

</script>

<style scoped></style>

