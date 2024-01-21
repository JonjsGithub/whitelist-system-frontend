<template>
    <el-container class="layout-container-demo w-screen">
        <el-container>
            <!-- header 导航 -->
            <HeaderMenuAdmin :user="user"></HeaderMenuAdmin>
            <el-header hidden>
                <span class=" text-red-600 font-extrabold text-3xl mt-3 float-start">五彩世界白名单后台</span>
            </el-header>
            <!-- 页header -->
            <el-page-header class=" ml-3 mt-3 mb-3">
                <template #breadcrumb>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/admin/' }">
                            后台
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>用户</el-breadcrumb-item>
                        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
                    </el-breadcrumb>
                </template>
                <template #content>
                    <span class="text-large font-600 mr-3"> 用户列表 </span>
                </template>
            </el-page-header>

            <el-main>
                <!-- 主要内容 -->

                <!-- 用户列表 -->
                <div>
                    <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[5, 10, 30, 50]"
                        :small="small" :disabled="disabled" :background="background"
                        layout="total, sizes, prev, pager, next, jumper" v-model:total="total"
                        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
                </div>

                <el-table :data="list_byPage" auto class="w-screen">
                    <el-table-column label="#" prop="id" width="48px" />
                    <el-table-column label="游戏名" prop="name" />
                    <el-table-column label="QQ号码" prop="qq" />
                    <el-table-column label="电子邮箱" prop="email" />
                    <el-table-column label="权限" prop="permission" />
                    <el-table-column align="right">
                        <template #header>
                            <el-input v-model="search" size="small" placeholder="搜索..." />
                        </template>
                        <template #default="scope">
                            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="small" type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>


            </el-main>
            <FooterText></FooterText>
        </el-container>
    </el-container>
</template>
  
<script setup>
import { useCookies } from "@vueuse/integrations/useCookies";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import FooterText from '~/components/FooterText.vue'
import { listPage, listCount } from "~/api/user";

import { ElNotification } from "element-plus";
import HeaderMenuAdmin from "~/components/admin/website/HeaderMenuAdmin.vue";

const cookies = useCookies();
const router = useRouter();

// 表格按钮逻辑处理
const handleEdit = (index, row) => {
    console.log(index, row)
    router.push("/admin/user/edit/" + row.id)
}
const handleDelete = (index, row) => {
    console.log(index, row)
    router.push("/admin/user/delete/" + row.id)
}

const user = ref("");
user.value = localStorage.getItem("user");

// 表格数据更新、数据分页
const search = ref("")
const pageNum = ref(1)
const pageSize = ref(10)
const list_byPage = ref([])
const small = ref(false)
const background = ref(true)
const disabled = ref(false)
const total = ref(0)

const updateUserCount = async () => {
    let result = await listCount()
    total.value = result.data;
}
const updateUserList = async () => {
    let result = await listPage(pageNum.value, pageSize.value)
    list_byPage.value = result.data
}
updateUserCount()
updateUserList()

const handleSizeChange = (val) => {
    updateUserList()
}
const handleCurrentChange = (val) => {
    updateUserList()
}


</script>
  
<style scoped></style>