import axios from "~/axios"; //axios实例

export function validateByCode(id, code) {
  return axios.get(
    "/student/validate",
    {
      params: {
        "id": id,
        "code": code,
      },
    },
    {
      headers:
      {
          'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
}

export function getStudentByCode(code) {
    return axios.get(
      "/student/getByCode",
      {
        params: {
          "code": code,
        },
      },
      {
        headers:
        {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
  }
