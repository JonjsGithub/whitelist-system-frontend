<template>
    <el-card v-if="ok">

        <template #header>
            <div>
                <span class="text-green-600 font-bold text-2xl">
                    白名单状态与自助申请
                </span>
            </div>
        </template>

        <el-watermark :content="['ColorfulWorld']" :gap="[50, 50]">
        <div>

            <el-row class=" justify-start items-start">
                <el-col :span="10"><span class="text-black font-bold">服务器IP</span></el-col>
                <el-col :span="14">
                    <div>
                        <el-tag light size="large">
                            <span class="font-bold text-xl">mc.jonjs.cn</span>
                        </el-tag>
                    </div>
                </el-col>
            </el-row>

            <el-row class=" justify-start items-start">
                <el-col :span="10"><span class="text-black font-bold">服务器状态</span></el-col>
                <el-col :span="14">
                    <!-- <div v-if="!rconOK"><span class="font-bold">离线</span></div>
                    <div v-if="rconOK"><span class="font-bold">在线</span></div> -->
                    <div v-if="!rconOK">
                        <el-icon><CloseBold color="darkred" /></el-icon>
                        <span class="font-bold text-red-700"> 离线</span>
                    </div>
                    <div v-if="rconOK">
                        <el-icon><Select color="green" /></el-icon>
                        <span class="font-bold text-green-700"> 在线</span>
                    </div>
                </el-col>
            </el-row>
            <el-row class=" justify-start items-start">
                <el-col :span="10"><span class="text-black font-bold">高校认证</span></el-col>
                <el-col :span="14">
                    <div v-if="!passed2">
                        <el-icon><CloseBold color="darkred" /></el-icon>
                        <span class="font-bold text-red-700"> 无</span>
                    </div>
                    <div v-if="passed2">
                        <el-icon><Select color="green" /></el-icon>
                        <span class="font-bold text-green-700"> 已通过</span>
                    </div>
                </el-col>
            </el-row>
            <el-row class=" justify-start items-start">
                <el-col :span="10"><span class="text-black font-bold">白名单</span></el-col>
                <el-col :span="14">
                    <div v-if="!passed">
                        <el-icon><CloseBold color="darkred" /></el-icon>
                        <span class="font-bold text-red-700"> 无</span>
                    </div>
                    <div v-if="passed">
                        <el-icon><Select color="green" /></el-icon>
                        <span class="font-bold text-green-700"> 有</span>
                    </div>
                </el-col>
            </el-row>
        </div>
        </el-watermark>

        <template #footer>
            <div>
                <el-text type="primary">* 若显示已有白名单, 但入服仍提示没有, 请尝试“刷新白名单状态”</el-text>
                <br />
                <el-text type="danger">* 若服务器离线, 则无法刷新白名单状态, 请联系管理员</el-text>
                <br />
                <el-text type="danger">* 正版验证数据与网页端暂不互通</el-text>
                <br />
                <el-button v-if="rconOK" @click="refreshInfo" type="success">
                    <el-icon><Refresh /></el-icon>
                    刷新白名单状态
                </el-button>
                <br /><br />
                <span class="font-bold text-orange-700">请任选一种方式来申请白名单:</span>
                <br />
                <el-button @click="toOld" type="success">
                    <el-icon><UserFilled /></el-icon>
                    老玩家快捷通道
                </el-button> 
                <el-button :disabled="passed" @click="toExam" type="primary">
                    <el-icon><TopRight /></el-icon>
                    答题申请
                </el-button>
                <el-button :disabled="passed2" @click="toStudent" type="warning">
                    <el-icon><TopRight /></el-icon>
                    高校认证
                </el-button>
                <el-button @click="toMC" type="danger">
                    <el-icon><TopRight /></el-icon>
                    正版验证
                </el-button>
            </div>
        </template>

    </el-card>
</template>

<script setup>

import { ElNotification } from "element-plus"
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"

import { getUserInfoByID } from '~/api/user.js'
import { getRconStatus, addWhitelist } from '~/api/whitelist.js'

const props = defineProps({
    user: ""
})

const router = useRouter()

const ok = ref(false)

const rconOK = ref(false)
const passed = ref(false)
const passed2 = ref(false)

const user = ref()
user.value = JSON.parse(props.user)

const getInfo = async () => {
    let result = await getUserInfoByID(user.value.id)
    user.value = result.data
    if (user.value.code != null) {
        passed2.value = true
    }
    handlePermText()
}
getInfo()

const handlePermText = () => {
    if (user.value.permission >= 1) {
        passed.value = true
    } else {
        passed.value = false
    }
}

const handleWhitelist = async () => {
    if (user.value.permission >= 1) {
        let result = await addWhitelist(user.value.name)
        if (result.code == 1) {
            ElNotification({
                title: "成功",
                message: "白名单已更新, 请尝试加入服务器",
                type: "success",
            })
            router.push("/dashboard/")
        }
    }
}

const handleRconStatus = async () => {
    let result = await getRconStatus()
    if (result.code == 0) {
        rconOK.value = false
    } else if (result.code == 1) {
        rconOK.value = true
    }
}
handleRconStatus()

const refreshInfo = async () => {
    handleRconStatus()
    getInfo()
    handlePermText()
    handleWhitelist()
    ElNotification({
        title: "成功",
        message: "白名单状态已刷新",
        type: "success",
    })
}

const toExam = () => {
    router.push("/exam/info")
}
const toStudent = () => {
    router.push("/dashboard/account/validateStudent")
}
const toOld = () => {
    router.push("/dashboard/account/old")
}
const toMC = ()=>{
    router.push("/dashboard/account/mcValidate")
}

ok.value = true



</script>

<style scoped></style>
