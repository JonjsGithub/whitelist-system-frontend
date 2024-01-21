import axios from '~/axios' //axios实例

export function deleteUser(id) {
    return axios.delete(
        "/user/delete",
        {
            params: {
                "id": id,
            }
        },
        
    )
}

export function changePassword(oldPassword, newPassword, newPasswordRepeated) {
    return axios.post(
        "/user/changePassword",
        {
            "oldPassword": oldPassword,
            "newPassword": newPassword,
            "newPasswordRepeated": newPasswordRepeated,
        },
        {
            headers:
            {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    )
}

export function updateInfo(user) {
    return axios.put(
        "/user/updateInfo",
        user
    )
}

export function getUserInfo() {
    return axios.get(
        "/user/userInfo"
    )
}

export function getUserInfoByID(id) {
    console.log("ID submit " + id)
    return axios.get(
        "/user/userInfo",
        {
            params: {
                "id": id,
            },
        },
    )
}

export function listPage(pageNum, pageSize) {
    return axios.get(
        "/user/listPage",
        {
            params: {
                "pageNum": pageNum,
                "pageSize": pageSize,
            },
        },
    );
}

export function list() {
    return axios.get("/user/list");
}

export function listCount() {
    return axios.get("/user/listCount");
}

export function login(username, password) {
    return axios.post(
        "/user/login",
        {
            "name": username,
            "password": password
        },
        {
            headers:
            {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    );
}

export function register(username, password, qq, email) {
    return axios.post(
        "/user/register",
        {
            "name": username,
            "password": password,
            "qq": qq,
            "email": email,
        },
        {
            headers:
            {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    )
}

