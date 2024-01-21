<template>
    <el-card v-if="ok">

        <template #header>
            <div>
                <span class="text-xl font-extrabold">老玩家快捷通道</span>
            </div>
        </template>
        <span v-if="isOld" class="text-xl text-green-800">恭喜您, 您是老玩家, 点击按钮即可重获白名单!</span>
        <span v-if="!isOld" class="text-xl text-red-800">抱歉, 您不是老玩家, 请回到个人控制台</span>
        <template #footer>
            <div>
                <el-button type="success" v-if="isOld" @click="handleSubmit">重获白名单</el-button>
                <el-button type="primary" v-if="!isOld" @click="toDashboard">回到控制台</el-button>
            </div>
        </template>

    </el-card>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useRouter } from 'vue-router'

import { getConfig } from '~/api/website.js'
import { submitOld } from '~/api/old.js'

import { ElNotification } from 'element-plus'

const props = defineProps({
    user: ""
})

const isUserExist = ref(true)
const router = useRouter()
const ok = ref(false)
const isOld = ref(false)
const user = reactive(JSON.parse(props.user))
const info = ref()

const getOldList = async () => {
    let result = await getConfig("player_old")
    info.value = JSON.parse(result.data)
    console.log(info.value)
    if (info.value.includes(user.name)) {
        isOld.value = true
    }
    ok.value = true
}
getOldList()

const handleSubmit = async () => {
    let result = await submitOld()
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

const toDashboard = ()=>{
    router.push("/dashboard/")
}

</script>

<style scoped></style>

