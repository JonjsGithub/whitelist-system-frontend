import axios from "~/axios"; //axios实例

export function getWhitelistList() {
  return axios.get("/whitelist/list")
}

export function getRconStatus() {
  return axios.get("/whitelist/rconStatus")
}

export function addWhitelist(name) {
  return axios.post(
    "/whitelist/add",
    {
      "name": name
    },
    {
      headers:
      {
          'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
}

export function deleteWhitelist(name) {
  return axios.post(
    "/whitelist/delete",
    {
      "name": name
    },
    {
      headers:
      {
          'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
}
