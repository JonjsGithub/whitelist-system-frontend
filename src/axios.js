import axios from "axios";
import { ElNotification } from 'element-plus';
import { useCookies } from '@vueuse/integrations/useCookies'
import router from '~/router'

const service = axios.create({
  baseURL: "/api"
})


// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const cookies = useCookies()
    const token = cookies.get("token")
    if(token) {
        config.headers["Authorization"] = token
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    if (response.data.code == 0) {
      ElNotification({
        title: "错误",
        message: response.data.msg || "出现错误",
        type: 'error',
      });
    }
    return response.data;
  },
  function (error) {
    // 对响应错误做点什么
    if (error.response.status == 401) {
      ElNotification({
        title: "错误",
        message: error.response.data.msg || "您尚未登录",
        type: 'error',
      });
      router.push("/login");
    } else {
      ElNotification({
        title: "错误",
        message: error.response.data.msg || "请求失败",
        type: 'error',
      });
    }
    return Promise.reject(error);
  }
)

export default service
