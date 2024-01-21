<template>
    <el-card v-if="!isExamExist">
        <span class="text-xl font-extrabold text-red-700">题目 (ID: {{ props.id }}) 不存在!</span>
    </el-card>
    <el-card v-if="ok">

        <template #header>
            <div>
                <span class="text-xl font-extrabold">编辑题目 - ID: {{ info.id }}</span>
            </div>
        </template>

        <el-form v-model="info">
            <el-row :gutter="16" class=" justify-start items-start">
                <el-col :span="4"><span class="text-black">ID</span></el-col>
                <el-col :span="20"><el-input v-model="info.id" disabled /></el-col>
            </el-row>
            <el-row :gutter="16" class=" justify-start items-start">
                <el-col :span="4"><span class="text-black">内容</span></el-col>
                <el-col :span="20">
                    <el-input
                        v-model="info.questionJson"
                        :autosize="{ minRows: 4, maxRows: 8 }"
                        type="textarea"
                    />
                </el-col>
            </el-row>
            <el-row :gutter="16" class=" justify-start items-start">
                <el-col :span="4"><span class="text-black">创建者</span></el-col>
                <el-col :span="20"><el-input v-model="info.createMember" /></el-col>
            </el-row>
            <el-row :gutter="16" class=" justify-start items-start">
                <el-col :span="4"><span class="text-black">时间</span></el-col>
                <el-col :span="20"><el-input v-model="info.createTime" disabled /></el-col>
            </el-row>
        </el-form>

        <template #footer>
            <div>
                <el-button type="primary" v-if="!preview" @click="preview = true">点击展开预览</el-button>
                <el-button type="primary" v-if="preview" @click="preview = false">双击刷新预览</el-button>
                <el-button type="success" @click="handleSubmit">保存修改</el-button>
            </div>
        </template>

    </el-card>

    <QuestionPreview v-if="preview" :questions="info.questionJson" />

</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useRouter } from 'vue-router'

import { getExamByID, updateExam } from '~/api/exam.js'

import { ElNotification } from 'element-plus'
import QuestionPreview from '~/components/exam/QuestionPreview.vue'



const props = defineProps({
    id: 0
})

const preview = ref(false)
const isExamExist = ref(true)
const router = useRouter()
const id = props.id
const info = ref("")
const ok = ref(false)
console.log(id)

const getInfo = async (id) => {
    let result = await getExamByID(id)
    if (result.data == null) {
        isExamExist.value = false
        return
    }
    info.value = result.data
    ok.value = true
}
getInfo(id)

const handleUpdateInfo = async () => {
    // info.value.questionJson = JSON.stringify(info.value.questionJson)
    let result = await updateExam(info.value)
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

    let res = await handleUpdateInfo()
    if (res != null && res.code == 1) {
        // 成功
        ElNotification({
            title: "成功",
            message: res.msg,
            type: "success",
        })
    }
}

</script>

<style scoped></style>

