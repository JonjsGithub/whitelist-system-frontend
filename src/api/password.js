import axios from "~/axios";


export function findPassword(name, email) {
    return axios.post(
        "/user/findPassword",
        {
            "name": name,
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

export function resetPassword(vcode, newPassword, newPasswordRepeated) {
    return axios.post(
        "/user/resetPassword",
        {
            "vcode": vcode,
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

export function vcodeStatus(vcode) {
    return axios.get(
        "/user/vcodeStatus",
        {
            params:
            {
                "vcode": vcode,
            }
        },
        {
            headers:
            {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    )
}

