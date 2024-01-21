<template>
    <el-card v-if="ok">

        <template #header>
            <div>
                <span class="text-orange-600 font-bold text-2xl">
                    高校认证信息
                </span>
            </div>
        </template>

        <div>
            <el-row :gutter="8" class=" justify-start items-start">
                <el-col :span="8"><span class="text-black font-bold">学信网在线验证码</span></el-col>
                <el-col :span="4">
                    <el-button plain v-if="!showCode" @click="handleShowCode">查看</el-button>
                    <el-button plain v-if="showCode" @click="handleHideCode">隐藏</el-button>
                </el-col>
                <el-col :span="12"><span class="text-black italic">{{ code }}</span></el-col>
            </el-row>

            <el-row class=" justify-start items-start">
                <el-col :span="24">
                    <span class="text-red-600 italic">(如需更改, 请联系管理员)</span>
                </el-col>
            </el-row>
            <br />
            <el-row :gutter="8" class=" justify-start items-start">
                <el-col :span="8"><span class="text-black font-bold">院校</span></el-col>
                <el-col :span="16"><span class="text-black">{{ info.univ }}</span></el-col>
            </el-row>
            <el-row :gutter="8" class=" justify-start items-start">
                <el-col :span="8"><span class="text-black font-bold">专业</span></el-col>
                <el-col :span="16"><span class="text-black">{{ info.major }}</span></el-col>
            </el-row>
        </div>

        <template #footer>
        </template>

    </el-card>
</template>

<script setup>

import { reactive, ref } from "vue"
import { useRouter } from "vue-router"

import { getStudentByCode } from '~/api/student.js'

const props = defineProps({
    user: ""
})

const router = useRouter()

const ok = ref(false)
const info = ref()

const userObject = ref()
userObject.value = JSON.parse(props.user)

const showCode = ref(false)
const code = ref("***")

const handleShowCode = () => {
    showCode.value = true
    code.value = userObject.value.code
}
const handleHideCode = () => {
    showCode.value = false
    code.value = "***"
}

const getStudentInfo = async () => {

    let result = await getStudentByCode(userObject.value.code)
    if (result.code == 1) {
        info.value = result.data
        ok.value = true
    }

}
getStudentInfo()



</script>

<style scoped></style>
