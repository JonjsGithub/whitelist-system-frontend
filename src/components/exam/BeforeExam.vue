<template>

<el-card v-if="ok">

    <template #header>
        <div>
            <span class=" text-2xl font-extrabold text-indigo-700">
                申请须知
            </span>
        </div>
    </template>
    <p class="text-black font-bold text-l">版本 2, 最后更新时间: 2024年1月19日 23:10</p>
    <br />
    <p class="text-black text-l">(1) 五彩世界白名单自助申请(下面简称“考试”) 采用的是答题考试模式</p>
    <p class="font-bold text-l">(2) 若您在2024年1月17日前(含)加入过服务器, 请直接进入个人控制台中的“老玩家快捷通道”, 可直接获取白名单</p>
    <p class="font-bold text-l">(3) 若您是高校在校生或已从高校毕业, 请直接进行个人控制台中的“高校认证”, 可直接获取白名单</p>
    <p class="text-black text-l">(4) 该考试不限时, 但24小时内仅可提交3次, 在中途关闭浏览器, 不影响已经保存过的题目. 答题过程中不要清除浏览器缓存, 不要进行电脑垃圾清理</p>
    <p class="font-bold text-red-600 text-l">(5) 考试题目共 {{ questionTotal }} 题, 均为单选题. 满分 {{ fullScore }} 分, 获得 {{ passScore }} 分即可通过考试获得白名单</p>
    <p class="text-black text-l">(6) 考试结束后会告知您是否通过. 如果通过后进服仍提示没有白名单, 那么请前往个人控制台刷新白名单状态</p>

    <template #footer>
        <div>
            <el-button @click="toStart" type="primary" size="large">
                我已完整阅读所有注意事项, 准备开始答题
            </el-button>
        </div>
    </template>

</el-card>

</template>

<script setup>

import { useRouter } from 'vue-router'

import { ref } from 'vue'

import { getConfigList } from '~/api/website.js'
import { ElNotification } from 'element-plus'

const router = useRouter()

const ok = ref(false)

const questionTotal = ref()
const fullScore = ref(10000.0)
const passScore = ref(10000.0)

const toStart = ()=>{
    router.push("/exam/start")
}

const handleWebsiteInfo = async () => {
    let result = await getConfigList()
    if (result.code == 1) {
        let websiteConfig = JSON.parse(localStorage.getItem("website"))
        questionTotal.value = websiteConfig["exam_questionTotal"]
        fullScore.value = parseFloat(websiteConfig["exam_fullScore"]).toFixed(1)
        passScore.value = parseFloat(websiteConfig["exam_passScore"]).toFixed(1)
        ok.value = true
    } else {
        ElNotification({
            title: "错误",
            message: "无法获取通过分数, 无法开始考试, 请联系管理员",
            type: "error",
            duration: 0,
            showClose: false,
        })
    }
}
handleWebsiteInfo()

</script>

<style scoped>

</style>
