<template>
  <el-row class="relative min-h-screen flex">
    <div
      class="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
      <div
        class="h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-indigo-500 text-white bg-no-repeat bg-cover relative">
        <div class="absolute bg-gradient-to-b from-indigo-600 to-blue-500 opacity-75 inset-0 z-0"></div>
        <div class="w-full max-w-md z-10">
          <!-- 左侧文字 -->
          <div class="font-bold text-5xl text-white mb-4">
            五彩世界<br />白名单自助申请系统
          </div>
          <div class="text-gray-200 text-sm">
            ColorfulWorld Server Whitelist Manage System
          </div>
        </div>
      </div>
      <div
        class="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8 md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
        <div class="max-w-md w-full mx-auto space-y-8">
          <div class="text-center">
            <!-- 右侧文字 -->
            <h2 class="mt-6 text-3xl font-bold text-gray-900">注册新账号</h2>
          </div>
          <div class="flex items-center justify-center space-x-2">
            <span class="h-px w-16 bg-gray-200"></span>
            <span class="text-gray-300 font-normal">请填写表单信息</span>
            <span class="h-px w-16 bg-gray-200"></span>
          </div>
          <!-- 表单开始 -->
          <el-form :model="form" :rules="rules" ref="formRef" class="mt-8 space-y-6">
            <el-form-item prop="username">
              <el-input v-model="form.username" placeholder="游戏名">
                <template #prefix>
                  <el-icon>
                    <user />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="form.password" type="password" show-password placeholder="密码">
                <template #prefix>
                  <el-icon>
                    <lock />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="qq">
              <el-input v-model="form.qq" placeholder="QQ号码">
                <template #prefix>
                  <el-icon>
                    <UserFilled />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="email">
              <el-input v-model="form.email" placeholder="电子邮箱">
                <template #prefix>
                  <el-icon>
                    <Connection />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-button round color="#3b82f6" class="w-dvw" type="primary" @click="onSubmit">注册</el-button>
            </el-form-item>
          </el-form>
          <p class="items-center justify-center mt-10 text-center text-md text-red-500 font-extrabold">
            <span>* 白名单申请系统的密码 与 服务器游玩密码 无关!!!</span>
          </p>
          <p class="items-center justify-center mt-10 text-center text-md text-red-700 font-bold">
            <span>* “游戏名”请填写您加入服务器所使用的游戏名. 要求3~24字符, 不能是中文</span>
          </p>
          <p class="items-center justify-center mt-10 text-center text-md text-red-700 font-bold">
            <span>* “密码”要求6~32字符, 大写/小写字母/数字/符号至少包含2种
            </span>
          </p>
          <!-- 表单下方文字 -->
          <p class="items-center justify-center mt-10 text-center text-md text-gray-700">
            <span>已注册过账号? </span>
            <a href="/login"
              class="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300">现在登录</a>
          </p>

          <!-- 备案号 -->
          <!-- <p class="items-center justify-center text-center text-[14px] text-gray-500">
            <span>备案号：豫XXXX</span>
          </p> -->
          <FooterText />
        </div>
      </div>
    </div>
  </el-row>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useCookies } from "@vueuse/integrations/useCookies";
import { ElNotification } from "element-plus";
import { register } from "~/api/user";
import { useRouter } from "vue-router";

import FooterText from "~/components/FooterText.vue";

const router = useRouter();

const form = reactive({
  username: "",
  password: "",
  qq: "",
  email: "",
});

const rules = {
  username: [
    { required: true, message: "必须输入用户名", trigger: "blur" },
    { min: 3, max: 24, message: "用户名长度必须在 3~24 之间", trigger: "blur" },
  ],
  password: [
    { required: true, message: "必须输入密码", trigger: "blur" },
    { min: 6, max: 32, message: "密码长度必须在 6~32 之间", trigger: "blur" },
  ],
  qq: [
    { required: true, message: "必须输入QQ号码", trigger: "blur" },
    { min: 5, max: 16, message: "请输入正确的QQ号码", trigger: "blur" },
  ],
  email: [
    { required: true, message: "必须输入邮箱", trigger: "blur" },
    {
      min: 8,
      max: 128,
      message: "邮箱长度必须在 8~128 字符之间",
      trigger: "blur",
    },
  ],
};

const formRef = ref(null);

const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false;
    }
    register(form.username, form.password, form.qq, form.email).then((res) => {
      // 提示成功
      if (res.code == 1) {
        ElNotification({
          title: "成功",
          message: "注册成功, 请登录",
          type: "success",
        });
        // 跳转到登录页
        router.push("/login");
      }
    });
  });
};
</script>

<style scoped></style>
