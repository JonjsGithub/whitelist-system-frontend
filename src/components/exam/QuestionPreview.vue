<script setup>
import { reactive, ref, watch } from 'vue'
import { useQuestionStore } from '~/stores/questions.js';
import { useRouter } from 'vue-router';

import { handleExamList2 } from '~/api/exam.js'

const props = defineProps({
    questions: ""
})

const questionStore = useQuestionStore()
const router = useRouter()

// const q = JSON.parse(questionStore.questions)
const q2 = JSON.parse("[" + props.questions + "]") //变成数组
let q = handleExamList2(q2)
console.log("=== 预览数据如下 ===")
console.log(q)

// 当前题目序号
// ref 数据定义
const oCount = ref(0)

/** {
type: "单选题",
title: "题目文本",
option: "A$$B$$C"
addtion: "<p>测试额外内容HTML</p>"
optionText: "optionA$$2fefd$$ckm3o",
right: "A",
score: 1.5
} */
const qr = reactive({
    type: '',
    title: '',
    options: {},
    addition: '',
    optionTexts: {},
    score: 0.0,
})

const type1 = ref(false)
const ok = ref(false)

function getCount(obj) {
    return Object.keys(obj).length
}

// 当前题目
const qo = q[0]

// 当前题目信息获取
qr.type = qo['type']
qr.title = qo['title']
qr.addition = qo['addition'] //额外html
qr.options = qo['options'] //qr.options.0 => A
qr.optionTexts = qo['optionTexts'] //qr.optionTexts.0 => XXXX
qr.score = qo['score']
oCount.value = getCount(qr.options)

if (qr.type == "单选题") {
    type1.value = true
}

</script>

<template>
    
    <el-card>

        <template #header>
            <div>
                <span class="text-xl font-extrabold">题目预览 - {{ qr.type }} - {{ qr.score }} 分<br>{{ qr.title }}</span>
            </div>
            
            <div v-html="qr.addition"></div>            
        </template>

        <div v-if="type1">
            <el-radio-group>
                <el-radio
                    v-for="n in oCount"
                    :label="qr.options[n-1]"
                    size="large"
                    border
                >
                ( {{ qr.options[n-1] }} ) {{ qr.optionTexts[n-1] }}
                </el-radio>
            </el-radio-group>
            <br>
            <el-text type="danger">* 当前题目处于预览中, 尚未保存</el-text>
            <br>
            <el-text type="danger">* 预览不是实时更新的, 如需刷新请双击按钮</el-text>
        </div>

    </el-card>
</template>

<style scoped></style>
