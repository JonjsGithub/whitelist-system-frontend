import axios from "~/axios"; //axios实例

export function getConfigList() {
  return axios.get("/website/getAll");
}

export function getConfig(key) {
    return axios.get("/website/getValue",
        {
            params: {
                "key": key,
            }
        }
    );
}
