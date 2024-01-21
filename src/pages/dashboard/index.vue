<template>
  <el-container class="layout-container-demo w-screen">
      <el-container v-if="ok">
          <!-- header 导航 -->
          <HeaderMenu :user="user" />
          <el-header hidden>
              <span class=" text-red-600 font-extrabold text-3xl mt-3 float-start">五彩世界白名单个人控制台</span>
          </el-header>
          <!-- 页header -->
          <el-page-header @back="onBack('/dashboard/')" class=" ml-3 mt-3 mb-3">
              <template #breadcrumb>
                  <el-breadcrumb separator="/">
                      <el-breadcrumb-item :to="{ path: '/dashboard/' }">
                          控制台
                      </el-breadcrumb-item>
                      <el-breadcrumb-item>概览</el-breadcrumb-item>
                  </el-breadcrumb>
              </template>
              <template #content>
                  <span class="text-large font-600 mr-3"> 信息概览 </span>
              </template>
          </el-page-header>

          <el-main>
              <!-- 主要内容 -->
              <!-- 卡片列表 -->
              <el-row :gutter="32">
                <el-col :md="12" :sm="24"><BriefInfo :user="user" /></el-col>
                <el-col :md="12" :sm="24"><Whitelist :user="user" /></el-col>
              </el-row>
              <el-row :gutter="32" v-if="isStudent">
                <el-col :md="12" :sm="24"><StudentInfo :user="user" /></el-col>
              </el-row>

          </el-main>
          <FooterText></FooterText>
      </el-container>
  </el-container>
</template>

<script setup>
import { useCookies } from "@vueuse/integrations/useCookies"
import { useRouter } from "vue-router"
import { ref } from "vue"

import HeaderMenu from "~/components/user/website/HeaderMenu.vue"
import FooterText from '~/components/FooterText.vue'
import BriefInfo from '~/components/user/dashboard/BriefInfo.vue'
import Whitelist from "~/components/user/dashboard/Whitelist.vue"
import StudentInfo from "~/components/user/dashboard/StudentInfo.vue"

import { getUserInfo } from '~/api/user.js'

import { ElNotification } from "element-plus";

const cookies = useCookies()
const router = useRouter()

const user = ref("")
const ok = ref(false)
const isStudent = ref(false)

const queryUserInfo = async () => {
  let result = await getUserInfo()
  if (result.code == 1) {
    localStorage.setItem("user", JSON.stringify(result.data))
    user.value = localStorage.getItem("user")
    let userObj = JSON.parse(user.value)
    if (userObj.code != null && userObj.code != "") {
      isStudent.value = true
    }
    ok.value = true
  }
}
queryUserInfo()

const onBack = (r) => {
  router.push(r)
}


</script>

<style scoped></style>
