<template>
    <el-scrollbar max-height="100%">
    <el-table :data="props.list" auto class="w-screen">
        <el-table-column label="#" prop="id" width="48px" />
        <el-table-column label="题目内容" prop="questionJson" />
        <el-table-column align="right">
            <template #header>
                <el-input v-model="search" size="small" placeholder="搜索..." />
            </template>
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    </el-scrollbar>
</template>

<script setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const props = defineProps({
    list: {}
})

const search = ref("")

// 表格按钮逻辑处理
const handleEdit = (index, row) => {
    console.log(index, row)
    router.push("/admin/exam/edit/" + row.id)
}
const handleDelete = (index, row) => {
    console.log(index, row)
    router.push("/admin/exam/delete/" + row.id)
}
</script>

<style scoped>

</style>

