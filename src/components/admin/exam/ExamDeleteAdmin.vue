<template>
    <el-card v-if="!isExamExist">
        <span class="text-xl font-extrabold text-red-700">题目 (ID: {{ props.id }}) 不存在!</span>
    </el-card>
    <el-card v-if="ok">

        <template #header>
            <div>
                <span class="text-xl font-extrabold text-red-700">删除题目 - ID: {{ props.id }}</span>
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
                        disabled
                    />
                </el-col>
            </el-row>
            <el-row :gutter="16" class=" justify-start items-start">
                <el-col :span="4"><span class="text-black">创建者</span></el-col>
                <el-col :span="20"><el-input v-model="info.createMember" disabled /></el-col>
            </el-row>
            <el-row :gutter="16" class=" justify-start items-start">
                <el-col :span="4"><span class="text-black">时间</span></el-col>
                <el-col :span="20"><el-input v-model="info.createTime" disabled /></el-col>
            </el-row>
        </el-form>

        <template #footer>
            <div>
                <el-button type="danger" @click="handleDelete">确认删除</el-button>
            </div>
        </template>

    </el-card>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useRouter } from 'vue-router'

import { getExamByID, deleteExamByID, handleExamList2  } from '~/api/exam.js'

import { ElNotification } from 'element-plus'

const props = defineProps({
    id: 0
})

const isExamExist = ref(true)
const router = useRouter()
const id = props.id
const info = ref("")
const question = ref("")
const ok = ref(false)

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

const handleDelete = async () => {

    let res = await deleteExamByID(info.value.id)
    if (res.code == 1) {
        // 成功
        ElNotification({
            title: "成功",
            message: res.msg,
            type: "success",
        })
        router.push("/admin/exam/list")
    }

}

</script>

<style scoped></style>

