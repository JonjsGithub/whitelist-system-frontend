<template>
    <el-card v-if="ok">

        <template #header>
            <div>
                <span class="text-indigo-600 font-bold text-2xl">
                    个人资料
                </span>
            </div>
        </template>

        <div>
            <el-row :gutter="8" class=" justify-start items-start">
                <el-col :span="8"><span class="text-black font-bold">UID</span></el-col>
                <el-col :span="16"><span class="text-black italic">{{ userObject.id }}</span></el-col>
            </el-row>
            <el-row :gutter="8" class=" justify-start items-start">
                <el-col :span="8"><span class="text-black font-bold">游戏名</span></el-col>
                <el-col :span="16">
                    <span class="text-green-700 text-bold">{{ userObject.name }}</span>
                </el-col>
            </el-row>
            <el-row class=" justify-start items-start">
                <el-col :span="24">
                    <span class="text-red-600 italic">(如需更改游戏名, 请删除账号, 重新注册)</span>
                </el-col>
            </el-row>
            <el-row :gutter="8" class=" justify-start items-start">
                <el-col :span="8"><span class="text-black font-bold">Email</span></el-col>
                <el-col :span="16">
                    <span class="text-black">{{ userObject.email }}</span>
                </el-col>
            </el-row>
            <el-row :gutter="8" class=" justify-start items-start">
                <el-col :span="8"><span class="text-black font-bold">QQ</span></el-col>
                <el-col :span="16">
                    <span class="text-black">{{ userObject.qq }}</span>
                </el-col>
            </el-row>

            <el-row class=" justify-start items-start">
                <el-col :span="8"><span class="text-black font-bold">加入于</span></el-col>
                <el-col :span="16"><span>{{ createTime }}</span></el-col>
            </el-row>
        </div>

        <template #footer>
            <div>
                <el-button @click="toChangeProfile" type="primary">
                    <el-icon><Edit /></el-icon>
                    修改资料
                </el-button>
                <el-button @click="toChangePassword" type="warning">
                    <el-icon><Edit /></el-icon>
                    修改密码
                </el-button>
                <el-popconfirm width="220" confirm-button-text="确定删除" cancel-button-text="不了" :icon="WarningFilled"
                    icon-color="#CC0000" title="你确定要删除这个账号吗?" @confirm="toDelete" @cancel="cancelDelete">
                    <template #reference>
                        <el-button type="danger">
                            <el-icon><Delete /></el-icon>
                            删除账号
                        </el-button>
                    </template>
                </el-popconfirm>
            </div>
        </template>

    </el-card>
</template>

<script setup>

import { reactive, ref } from "vue"
import { useRouter } from "vue-router"

import { ElMessage } from "element-plus"
import { WarningFilled } from "@element-plus/icons-vue";

const props = defineProps({
    user: {}
})

const router = useRouter()

const ok = ref(false)
const isDangerShow = ref(false)

const userObject = ref()
userObject.value = JSON.parse(props.user)

const createTime = ref()
var timestamp = Date.parse(userObject.value.createTime)
var t1 = new Date(timestamp)
var t2 = t1.toLocaleDateString() + " " + t1.toTimeString().substring(0, 8)
createTime.value = t2

console.log(createTime.value)

const cancelDelete = () => {
    isDangerShow.value = false
}

const toChangeProfile = () => {
    router.push("/dashboard/account/changeProfile")
}
const toChangePassword = () => {
    router.push("/dashboard/account/changePassword")
}
const toDelete = () => {
    router.push("/dashboard/account/delete")
}

ok.value = true



</script>

<style scoped></style>
