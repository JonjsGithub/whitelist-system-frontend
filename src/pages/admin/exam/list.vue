<template>
    <el-container class="layout-container-demo w-screen">
        <el-container>
            <!-- header 导航 -->
            <HeaderMenuAdmin :user="user"></HeaderMenuAdmin>
            <el-header hidden>
                <span class=" text-red-600 font-extrabold text-3xl mt-3 float-start">五彩世界白名单后台</span>
            </el-header>
            <!-- 页header -->
            <el-page-header @back="onBack('/admin/')" class=" ml-3 mt-3 mb-3">
                <template #breadcrumb>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/admin/' }">
                            后台
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>题目</el-breadcrumb-item>
                        <el-breadcrumb-item>题目列表</el-breadcrumb-item>
                    </el-breadcrumb>
                </template>
                <template #content>
                    <span class="text-large font-600 mr-3"> 题目列表 </span>
                </template>
            </el-page-header>



            <el-main>
                <!-- 主要内容 -->

                <!-- 题目列表 -->

                <ExamListAdmin v-if="ok" :list="list"></ExamListAdmin>

            </el-main>
            <FooterText></FooterText>
        </el-container>
    </el-container>
</template>
  
<script setup>
import { useCookies } from "@vueuse/integrations/useCookies";
import { useRouter } from "vue-router";
import { ref } from "vue";
import HeaderMenuAdmin from "~/components/admin/website/HeaderMenuAdmin.vue";
import ExamListAdmin from "~/components/admin/exam/ExamListAdmin.vue";
import FooterText from '~/components/FooterText.vue'
import { getExamList } from "~/api/exam.js";

import { ElNotification } from "element-plus";

const cookies = useCookies();
const router = useRouter();


const user = ref("");
user.value = localStorage.getItem("user");

// 表格数据更新、数据分页
const search = ref("")
const list = ref([])
const ok = ref(false)

const updateExamList = async () => {
    let result = await getExamList()
    if (result.code == 1) {
        list.value = result.data
    } else {
        ElNotification({title:"错误",message:"题目列表获取失败",type:"error"})
    }
    ok.value = true
}
updateExamList()

const onBack = (r) => {
    router.push(r)
}


</script>
  
<style scoped></style>