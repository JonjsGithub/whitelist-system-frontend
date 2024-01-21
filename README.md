# Minecraft 服务器白名单自助申请系统 (前端)

## 功能简介

前端实现的功能是: 玩家注册登录账号后, 在控制台通过在线答题/高校认证/正版验证获取服务器白名单.

带有网站账号管理、题目管理、白名单管理等功能

后端提供有关网站账号(`user`)、题目(`exam`)、白名单(`whitelist`)、网站配置项(`website`)的内容

API 风格是`RESTful`

## 后端项目地址

[JonjsGithub/whitelist-system-backend](https://github.com/JonjsGithub/whitelist-system-backend)

## 所用框架、依赖

**使用 Node.js `20+` 构建**

- Node.js `20`
- Vue `3.3.11`
- Vue-Router `4.2.5`
- Vite `5.0.8`
- axios
- cors
- element-plus
- tailwindcss + postcss
- pinia + pinia-persistedstate-plugin,
- universal-cookie


## 运行环境要求
- Nginx `(需要配置nginx.conf, 使用反向代理来访问后端api接口)`

## 目录结构

```text
index.html 主页
postcss.config.js PostCSS 配置文件
tailwind.config.js TailwindCSS 配置文件
vite.config.js Vite 配置文件
dist/ 构建后成品输出目录
src/ 源码
|-- App.vue Vue程序主入口
|-- axios.js axios配置
|-- main.js Vue程序主要配置
|-- style.css 全局CSS样式
|-- tailwind.css 全局TailwindCSS样式
|-- api/ API接口
    |-- exam.js 题目与考试
    |-- old.js 老玩家
    |-- student.js 高校认证
    |-- user.js 用户/账号
    |-- website.js 网站配置
    |-- whitelist.js 白名单
    |-- password.js 找回密码
|-- assets/ 静态资源
    |-- vue.svg 网站favicon图标
|-- components/ 组件
    |-- ...
|-- pages/ 页面
    |-- admin/ 管理页
        |-- exam/ 管理考试题目
            |-- ...
        |-- user/ 管理用户
            |-- ...
        |-- index.vue 管理主页
    |-- dashboard/ 个人控制台页
        |-- account/ 账号相关操作页
            |-- changePassword.vue 修改密码
            |-- changeProfile.vue 修改资料
            |-- delete.vue 删除账号
            |-- mcValidate.vue 正版验证
            |-- old.vue 老玩家
            |-- validateStudent.vue 高校认证
        |-- index.vue 个人控制台主页
    |-- error/ 错误页
        |-- 404.vue 自定义404页面
    |-- exam/ 考试答题页
        |-- info.vue 考试须知
        |-- judge.vue 考试评判
        |-- start.vue 考试答题页面
    |-- index.vue 主页
    |-- login.vue 登录页
    |-- logout.vue 退出登录页
    |-- register.vue 注册页
    |-- findPassword.vue 找回密码页
    |-- resetPassword.vue 重置密码页 (从邮箱链接而来)
|-- router/ 路由
    |-- index.js 路由配置
|-- stores/ pinia储存
    |-- questions.js 考试、问题相关储存
    |-- token.js token储存
```

## Nginx 配置

由于使用了`proxy`代理 和 `WebHistory`模式构建路由, 所以需要配置一下 Nginx 的反向代理和静态资源重定向

(我使用了 1Panel 创建代理的功能)

- 打开 `nignx.conf`, 在 `server { }` 块内加入以下内容来实现**反向代理后端API**

```
location ^~ /api/ {
    proxy_pass http://你的后端地址:端口号/; 
    proxy_set_header Host $host; 
    proxy_set_header X-Real-IP $remote_addr; 
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; 
    proxy_set_header REMOTE-HOST $remote_addr; 
    proxy_set_header Upgrade $http_upgrade; 
    proxy_set_header Connection "upgrade"; 
    proxy_set_header X-Forwarded-Proto $scheme; 
    proxy_http_version 1.1; 
    add_header Cache-Control no-cache; 
    add_header Strict-Transport-Security "max-age=31536000"; 
}
```

- 打开 `nginx.conf`, 在同一个 `server { }` 块内加入一下内容来实现**静态资源重定向**
- 这样可以解决网站部署后, 刷新页面, 报404错误的问题 (当然选用 `WebHashHistory` 模式路由将不会出现这个问题)

```
location / {
    index index.html;
    try_files $uri $uri/ /index.html;
}
```
