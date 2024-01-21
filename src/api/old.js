import axios from "~/axios"; //axios实例

export function submitOld() {
  return axios.post("/old/submit")
}

