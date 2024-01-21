<template>
    <el-card v-if="ok">

        <template #header>
            <div>
                <span class="text-xl font-extrabold">正版验证步骤</span>
            </div>
        </template>

        <span class="text-xl text-blue-700 font-extrabold">如何进行正版验证直接获取白名单？</span>
        <br /><span>1. 登录正版账号, 启动游戏</span>
        <br /><span>2. 加入服务器 <el-tag class="mx-1" size="large" type="" effect="light">validate.jonjs.cn</el-tag></span>
        <br /><span>3. 等待一小会儿, 在游戏界面收到成功提示后即可获得白名单</span>
        <br /><span class="text-red-700 font-bold">* 注意: 正版验证获取白名单的数据与网页暂不互通</span>

        <template #footer>
            <div>
                <el-button type="primary" @click="toDashboard">返回控制台</el-button>
            </div>
        </template>

    </el-card>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const ok = ref(false)

const toDashboard = ()=>{
    router.push("/dashboard/")
}

ok.value = true

</script>

<style scoped></style>

