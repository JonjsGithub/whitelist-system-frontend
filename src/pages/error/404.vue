<template>
    <div>
      <el-result
        icon="error"
        title="404 Not Found"
        sub-title="页面未找到"
      >
        <template #extra>
          <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
        </template>
      </el-result>
    </div>
</template>
