<script setup>
import { reactive, ref, watch } from 'vue'
import { useQuestionStore } from '~/stores/questions.js';
import { useRouter } from 'vue-router';

const props = defineProps({
    questions: ""
})

const questionStore = useQuestionStore()
const router = useRouter()

// const q = JSON.parse(questionStore.questions)
const q = JSON.parse(props.questions)
console.log("=== 考试数据如下 ===")
console.log(q)

// 当前题目序号
// ref 数据定义
const qNum = ref(1)
const qId = ref(0)
const qCount = ref(1)
const oCount = ref(0)

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
const isCache = ref(false)
const isLastOne = ref(false)
const isFirstOne = ref(true)
const dialogVisible = ref(false)
const selection = ref("")
const cacheAnswer = localStorage.getItem("question-" + qNum.value)
if (cacheAnswer != null) {
    selection.value = cacheAnswer
    isCache.value = true
}

function getCount(obj) {
    return Object.keys(obj).length
}

// 当前题目ID
qId.value = qNum.value - 1
const qObj = q[qId.value]['question']

// 当前题目信息获取
qCount.value = getCount(q)
qr.type = qObj['type']
qr.title = qObj['title']
qr.addition = qObj['addition'] //额外html
qr.options = qObj['options'] //qr.options.0 => A
qr.optionTexts = qObj['optionTexts'] //qr.optionTexts.0 => XXXX
qr.score = qObj['score']
oCount.value = getCount(qr.options)

if (qr.type == "单选题") {
    type1.value = true
}

// 是否位于第一页, 如果位于那么就不显示
if (qNum.value == 1) {
    isFirstOne.value = true //不显示
} else {
    isFirstOne.value = false //显示
}
// 是否是最后一页
console.log(qNum.value >= qCount.value)
if (qNum.value >= qCount.value) {
    isLastOne.value = true //显示
} else {
    isLastOne.value = false //不显示
}

const handleSubmitOne = (val) => {
    localStorage.setItem("question-" + qNum.value, selection.value)
    isCache.value = false
    console.log("submit")
}
const handleSubmitAll = () => {
    const answers = [];
    for (var i = 0; i < qCount.value; i++) {
        var num = i+1
        var answer = localStorage.getItem("question-" + num)
        answers.push(answer)
    }
    sessionStorage.setItem("answers", JSON.stringify(answers))
    console.log(sessionStorage.getItem("answers"))
    router.push("/exam/judge")
}

const nextQuestion = (val) => {
    if (qNum.value < qCount.value) {
        qNum.value = qNum.value + 1
    }
}
const prevQuestion = (val) => {
    if (qNum.value >= 2) {
        qNum.value = qNum.value - 1
    }
}

const onChange = (val) => {
    isCache.value = false
}

const toPage = (page) => {
    qNum.value = page
}

watch(qNum, (newVal, oldVal) => {
    console.log('qNum 值变了:', newVal, oldVal);
    qId.value = newVal - 1
    const qObj = q[qId.value]['question']
    qCount.value = getCount(q)
    qr.type = qObj['type']
    qr.title = qObj['title']
    qr.addition = qObj['addition'] //额外html
    qr.options = qObj['options'] //qr.options.0 => A
    qr.optionTexts = qObj['optionTexts'] //qr.optionTexts.0 => XXXX
    qr.score = qObj['score']
    oCount.value = getCount(qr.options)
    if (qr.type == "单选题") {
        type1.value = true
    }
    // 答案缓存展示
    const cacheAnswer = localStorage.getItem("question-" + newVal)
    if (cacheAnswer != null) {
        selection.value = cacheAnswer
        isCache.value = true
    }
    // 是否位于第一页, 如果位于那么就不显示
    if (qNum.value == 1) {
        isFirstOne.value = true //不显示
    } else {
        isFirstOne.value = false //显示
    }
    // 是否是最后一页
    if (qNum.value >= qCount.value) {
        isLastOne.value = true
    } else {
        isLastOne.value = false
    }
    ok.value = true
})
</script>

<template>
    <el-card>
        <el-button v-for="i in qCount" @click="toPage(i);">{{ i }}</el-button>
    </el-card>
    
    <el-card>

        <template #header>
            <div>
                <span class="text-xl font-extrabold">题目 {{ qNum }} - {{ qr.type }} - {{ qr.score }} 分<br>{{ qr.title }}</span>
            </div>
            
            <div v-html="qr.addition"></div>
        </template>

        <div v-if="type1">
            <el-radio-group @change="onChange(); handleSubmitOne();" v-model="selection">
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
            <el-text v-if="isCache" type="danger">* 当前自动选中的答案, 是您已保存的答案.</el-text>
        </div>

        <template #footer>
            {{ qNum }} / {{ qCount }}
            <el-button :disabled="isFirstOne" @click="prevQuestion()" type="info">上一题</el-button>
            <el-button :disabled="isLastOne" @click="handleSubmitOne(); nextQuestion();" type="success">下一题</el-button>
            <el-button @click="dialogVisible = true" type="danger">提交整张试卷</el-button>
            <el-dialog v-model="dialogVisible" title="确定要提交吗?" width="30%" destroy-on-close center>
                <span>一旦提交将无法撤回, 请再仔细检查一下~</span>
                <template #footer>
                    <span class="font-bold">
                        <el-button type="primary" @click="dialogVisible = false">再检查一下</el-button>
                        <el-button type="danger" @click="dialogVisible = false; handleSubmitAll();">确定提交</el-button>
                    </span>
                </template>
            </el-dialog>
        </template>
    </el-card>
</template>

<style scoped></style>
