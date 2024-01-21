<template>
  <el-row class="relative min-h-screen flex">
    <div
      class="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
      <div
        class="h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-indigo-500 text-white bg-no-repeat bg-cover relative">
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
            <h2 class="mt-6 text-3xl font-bold text-gray-900">欢迎回来</h2>
          </div>
          <div class="flex items-center justify-center space-x-2">
            <span class="h-px w-16 bg-gray-200"></span>
            <span class="text-gray-300 font-normal">使用游戏名登录</span>
            <span class="h-px w-16 bg-gray-200"></span>
          </div>
          <!-- 表单开始 -->
          <el-form :model="form" :rules="rules" ref="formRef" class="mt-8 space-y-6">
            <el-form-item prop="username" class="relative">
              <el-input v-model="form.username" placeholder="游戏名">
                <template #prefix>
                  <el-icon>
                    <user />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password" class="mt-8 content-center">
              <el-input v-model="form.password" type="password" show-password placeholder="密码">
                <template #prefix>
                  <el-icon>
                    <lock />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button round color="#626AEF" class="w-dvw" type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>
          </el-form>
          <p class="items-center justify-center mt-10 text-center text-md text-red-700 font-extrabold">
            <span>* 若显示用户名不存在请注册新账号!!!</span>
          </p>
          <!-- 表单下方文字 -->
          <p class="items-center justify-center mt-10 text-center text-md text-gray-700">
            <span>还没有账号? </span>
            <a href="/register" class="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300">
              立即注册
            </a>
            <br />
            <span>忘记密码了? </span>
            <a href="/findPassword" class="text-red-500 hover:text-red-700 no-underline hover:underline cursor-pointer transition ease-in duration-300">
              找回密码
            </a>
          </p>

          <!-- 备案号 -->
          <FooterText />

        </div>
      </div>
    </div>
  </el-row>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useCookies } from "@vueuse/integrations/useCookies";
import { useTokenStore } from "~/stores/token";
import { ElNotification } from "element-plus";
import { login, getUserInfo } from "~/api/user";
import { getConfigList } from "~/api/website";
import { useRouter } from "vue-router";

import FooterText from "~/components/FooterText.vue";

const router = useRouter();

const tokenStore = useTokenStore();

const form = reactive({
  username: "",
  password: "",
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
};

const formRef = ref(null);

function onToRegister() {
  router.push("/register");
}

const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false;
    }
    login(form.username, form.password).then((res) => {
      console.log(res.code);
      // 提示成功
      if (res.code == 1) {
        ElNotification({
          title: "成功",
          message: "登录成功",
          type: "success",
        });
      }
      console.log(res.data);
      // cookies储存token
      const cookies = useCookies();
      var ex = Date.parse(Date.now() + 12 * 60 * 60 * 1000); // 过期时间 12小时之后
      cookies.set("token", res.data.token, {expires: ex});
      // pinia储存token
      tokenStore.setToken(res.data.token);
      // 在localStorage中储存用户信息
      getUserInfo().then((res) => {
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data))
      });
      // 获取网站配置信息
      getConfigList().then((res) => {
        console.log(res.data)
        localStorage.setItem("website", JSON.stringify(res.data))
      });
      // 跳转到Index页面
      router.push("/dashboard/");
    });
  });
};
</script>

<style scoped></style>
