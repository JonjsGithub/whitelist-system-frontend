import {
    createRouter,
    createWebHistory,
} from 'vue-router'

import Index from '~/pages/index.vue'

import Register from '~/pages/register.vue'
import Login from '~/pages/login.vue'
import Logout from '~/pages/logout.vue'
import FindPassword from '~/pages/findPassword.vue'
import ResetPassword from '~/pages/resetPassword.vue'

import Admin_Index from '~/pages/admin/index.vue'
import Admin_User_List from '~/pages/admin/user/list.vue'
import Admin_User_Add from '~/pages/admin/user/add.vue'
import Admin_User_Edit from '~/pages/admin/user/edit.vue'
import Admin_User_Delete from '~/pages/admin/user/delete.vue'
import Admin_Exam_List from '~/pages/admin/exam/list.vue'
import Admin_Exam_Edit from '~/pages/admin/exam/edit.vue'
import Admin_Exam_Add from '~/pages/admin/exam/add.vue'
import Admin_Exam_Delete from '~/pages/admin/exam/delete.vue'

import Dashboard_Index from '~/pages/dashboard/index.vue'
import Dashboard_Account_ChangeProfile from '~/pages/dashboard/account/changeProfile.vue'
import Dashboard_Account_ChangePassword from '~/pages/dashboard/account/changePassword.vue'
import Dashboard_Account_Delete from '~/pages/dashboard/account/delete.vue'
import Dashboard_Account_ValidateStudent from '~/pages/dashboard/account/validateStudent.vue'
import Dashboard_Account_Old from '~/pages/dashboard/account/old.vue'
import Dashboard_Account_MCValidate from '~/pages/dashboard/account/MCValidate.vue'

import Exam_Info from '~/pages/exam/info.vue'
import Exam_Start from '~/pages/exam/start.vue'
import Exam_Judge from '~/pages/exam/judge.vue'

import ErrorPage_404 from '~/pages/error/404.vue'

const routes = [
    {
        path: "/",
        component: Index,
    },
    {
        path: "/register",
        component: Register,
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/logout",
        component: Logout,
    },
    {
        path: "/findPassword",
        component: FindPassword,
    },
    {
        path: "/resetPassword/:vcode",
        component: ResetPassword,
    },
    {
        path: "/admin/",
        component: Admin_Index,
    },
    {
        path: "/admin/user/list",
        component: Admin_User_List,
    },
    {
        path: "/admin/user/add",
        component: Admin_User_Add,
    },
    {
        path: "/admin/user/edit/:id",
        component: Admin_User_Edit,
    },
    {
        path: "/admin/user/delete/:id",
        component: Admin_User_Delete,
    },
    {
        path: "/admin/exam/list",
        component: Admin_Exam_List,
    },
    {
        path: "/admin/exam/edit/:id",
        component: Admin_Exam_Edit,
    },
    {
        path: "/admin/exam/add",
        component: Admin_Exam_Add,
    },
    {
        path: "/admin/exam/delete/:id",
        component: Admin_Exam_Delete,
    },
    {
        path: "/dashboard/",
        component: Dashboard_Index,
    },
    {
        path: "/dashboard/account/changeProfile",
        component: Dashboard_Account_ChangeProfile,
    },
    {
        path: "/dashboard/account/changePassword",
        component: Dashboard_Account_ChangePassword,
    },
    {
        path: "/dashboard/account/delete",
        component: Dashboard_Account_Delete,
    },
    {
        path: "/dashboard/account/validateStudent",
        component: Dashboard_Account_ValidateStudent,
    },
    {
        path: "/dashboard/account/old",
        component: Dashboard_Account_Old,
    },
    {
        path: "/dashboard/account/mcValidate",
        component: Dashboard_Account_MCValidate,
    },
    {
        path: "/exam/info",
        component: Exam_Info,
    },
    {
        path: "/exam/start",
        component: Exam_Start,
    },
    {
        path: "/exam/judge",
        component: Exam_Judge,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: ErrorPage_404,
    },
]

const router = createRouter({
    history: createWebHistory("/"),
    routes: routes,
})

export default router

