<template>
    <el-card v-if="ok">

        <template #header>
            <div>
                <span class="text-xl font-extrabold">高校认证</span>
                <br />
                <span v-if="validated" class="text-l font-extrabold text-green-700">已认证</span>
                <span v-if="!validated" class="text-l font-extrabold text-red-700">未认证</span>
            </div>
        </template>

        <el-form v-model="form" v-if="!validated">
            <el-row :gutter="0" class=" justify-start items-start">
                <el-col :span="4"><span class="text-black font-bold text-xl">学信网在线验证码</span></el-col>
                <el-col :span="20"><el-input v-model="form.code" /></el-col>
            </el-row>
        </el-form>

        <br />
        <span class="text-xl text-blue-700 font-extrabold">如何生成“学信网在线验证码”？</span>
        <br /><span>1. 登录学信网. <a href="https://my.chsi.com.cn/" target="_blank">[点此跳转]</a></span>
        <br /><span>2. 点击页面头部的“在线验证报告”栏目. <a href="https://my.chsi.com.cn/archive/bab/index.action" target="_blank">[点此跳转]</a></span>
        <br /><span>3. 选择您要生成验证码的内容 (学籍/学历/学位), 点击右侧“查看”按钮.</span>
        <br /><span>4. 根据提示生成在线验证码. 如下图, 红方框内即为在线验证码.</span>
        <img src="https://mirror.jonjs.cn/Whitelist/xxwcode.png" />

        <template #footer>
            <div>
                <el-button type="success" @click="handleValidation">验证</el-button>
            </div>
        </template>

    </el-card>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useRouter } from 'vue-router'

import { validateByCode, getStudentByCode } from '~/api/student.js'

import { ElNotification } from 'element-plus'

const props = defineProps({
    user: ""
})

const router = useRouter()
const form = reactive({
    code: "",
})
const validated = ref(false)
const ok = ref(false)
const user = reactive(JSON.parse(props.user))
form.code = user.code

const isValidated = () => {
    if (user.code != null) {
        validated.value = true
    } else {
        validated.value = false
    }
}
isValidated()

const handleValidation = async () => {
    let result = await validateByCode(user.id, form.code)
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

ok.value = true

</script>

<style scoped></style>

