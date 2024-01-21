<template>
    <el-card v-if="ok">

        <template #header>
            <div>
                <span class="text-xl font-extrabold">新增题目</span>
            </div>
        </template>

        <el-form v-model="info">
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
        </el-form>

        <template #footer>
            <div>
                <el-button type="primary" v-if="!preview" @click="preview = true">点击展开预览</el-button>
                <el-button type="primary" v-if="preview" @click="preview = false">双击刷新预览</el-button>
                <el-button type="success" @click="handleSubmit">新增题目</el-button>
            </div>
        </template>

    </el-card>

    <QuestionPreview v-if="preview" :questions="info.questionJson" />

</template>

<script setup>
import { reactive, ref } from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useRouter } from 'vue-router'

import { addExam } from '~/api/exam.js'

import QuestionPreview from '~/components/exam/QuestionPreview.vue'

import { ElNotification } from 'element-plus'

const preview = ref(false)
const router = useRouter()
const info = reactive({
    questionJson: "",
    createMember: "",
})
const user = JSON.parse(localStorage.getItem("user"))["name"]
const defaultJson = '{"type": "单选题", "right": "A", "score": 3.0, "title": "题目文本", "option": "A$$B$$C", "addition": "<p>测试额外HTML</p>", "optionText": "optionA$$2fefd$$ckm3o"}'
info.questionJson = defaultJson
info.createMember = user
const ok = ref(false)

const handleAdd = async () => {
    let res = await addExam(info)
    if (res.code == 1) {
        ElNotification({
            title: "成功",
            message: "题目新增成功",
            type: "success",
        })
        router.push("/admin/exam/list")
    }
}

const handleSubmit = async () => {

    if (info.createMember != "" && info.questionJson != "") {
        handleAdd()
    } else {
        ElNotification({
            title: "错误",
            message: "信息不完整",
            type: "error",
        })
    }

}

ok.value = true

</script>

<style scoped></style>

