import axios from "~/axios"; //axios实例

export function getExamList() {
  return axios.get("/exam/list")
}

export function submit(answers) {
  const answer = JSON.parse(answers)
  return axios.post("/exam/submit", answer)
}

export function deleteExamByID(id) {
  return axios.delete(
    "/exam/delete",
    {
      params:
      {
        "id": id,
      },
    },
  )
}

export function updateExam(exam) {
  return axios.put(
    "/exam/update",
    exam
  )
}

export function addExam(exam) {
  return axios.post(
    "/exam/add",
    exam
  )
}

export function getExamByID(id) {
  return axios.get(
    "/exam/getByID",
    {
      params: {
        "id": id,
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

// result: 字符串
/** {
  type: "单选题",
  title: "题目文本",
  option: "A$$B$$C"
  addtion: "<p>测试额外内容HTML</p>"
  optionText: "optionA$$2fefd$$ckm3o",
  right: "A",
  score: 1.5
  } */
export function handleExamList(res) {
  let resultJson = res
  for (var i in resultJson) {
    var questionJson = resultJson[i]["questionJson"];
    var json = JSON.parse(questionJson);
    resultJson[i]["question"] = json;
    var question = resultJson[i]["question"];
    var optionStr = question["option"];
    var optionSplited = optionStr.split("$$");
    question["options"] = {};
    for (let index = 0; index < optionSplited.length; index++) {
      const element = optionSplited[index];
      question["options"][index] = element;
    }
    var optionStr2 = question["optionText"];
    var optionSplited2 = optionStr2.split("$$");
    question["optionTexts"] = {};
    for (let index = 0; index < optionSplited2.length; index++) {
      const element2 = optionSplited2[index];
      question["optionTexts"][index] = element2;
    }
  }
  return resultJson;
}

export function handleExamList2(res) {
  let resultJson = res
  let i = 0
    var question = resultJson[i];
    var optionStr = question["option"];
    var optionSplited = optionStr.split("$$");
    question["options"] = {};
    for (let index = 0; index < optionSplited.length; index++) {
      const element = optionSplited[index];
      question["options"][index] = element;
    }
    var optionStr2 = question["optionText"];
    var optionSplited2 = optionStr2.split("$$");
    question["optionTexts"] = {};
    for (let index = 0; index < optionSplited2.length; index++) {
      const element2 = optionSplited2[index];
      question["optionTexts"][index] = element2;
    }
  return resultJson;
}