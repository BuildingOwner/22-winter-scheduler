const indexDao = require("../dao/indexDao");

exports.createTodo = async function (req, res) {
  const { userIdx, contents, type } = req.body;

  if (!userIdx || !contents || !type) {
    return res.send({
      isSuccess: false,
      code: 400,
      messege: "입력값이 누락됬습니다."
    });
  }

  // contents 20글자 초과 불과
  if (contents.length > 20) {
    return res.send({
      isSuccess: false,
      code: 400,
      messege: "컨텐츠는 20글자 이하로 설정해주세요."
    });
  }

  // type : do, decide, delete, delegate
  const validType = ["do", "decide", "delete", "delegate"];
  if (!validType.includes(type)) {
    return res.send({
      isSuccess: false,
      code: 400,
      messege: "유효한 타입이 아닙니다."
    });
  }

  const insertTodoRow = await indexDao.insertTodo(userIdx, contents, type);

  if (!insertTodoRow) {
    return res.send({
      isSuccess: false,
      code: 403,
      messege: "요청에 실패했습니다. 관리자에게 문의해주세요."
    });
  }

  return res.send({
    isSuccess: true,
    code: 200,
    messege: "일정 생성 성공"
  });
};


exports.readTodo = async function (req, res) {
  const { userIdx } = req.params;

  const todos = {};
  const types = ["do", "decide", "delegate", "delete"];

  for (let type of types) {
    let selectTodoByTypeRows = await indexDao.selectTodoByType(userIdx, type);

    if (!selectTodoByTypeRows) {
      return res.send({
        isSuccess: false,
        code: 400,
        messege: "일정 조회 실패. 관리자에게 문의해주세요."
      });
    }
    todos[type] = selectTodoByTypeRows;
  }

  return res.send({
    result: todos,
    isSuccess: true,
    code: 200,
    messege: "일정 조회 성공"
  });
};

// todo 수정
exports.updateTodo = async function (req, res) {
  let { userIdx, todoIdx, contents, status } = req.body;

  if (!userIdx || !todoIdx) {
    return res.send({
      isSuccess: false,
      code: 400,
      messege: "userIdx와 todoIdx를 보내주세요."
    });
  }

  if (!contents) {
    contents = null;
  }

  if (!status) {
    status = null;
  }

  const isValidTodoRow = await indexDao.selectValideTodo(userIdx, todoIdx);

  if (isValidTodoRow.length < 1) {
    return res.send({
      isSuccess: false,
      code: 400,
      messege: "유효한 요청이 아닙니다. userIdx와 todoIdx를 확인하세요."
    });
  }

  const updateTodoRow = await indexDao.updateTodo(userIdx, todoIdx, contents, status);
  if (!updateTodoRow) {
    return res.send({
      isSuccess: false,
      code: 400,
      messege: "수정 실패. 관리자에게 문의해주세요."
    });
  }

  return res.send({
    isSuccess: true,
    code: 200,
    messege: "수정 성공"
  });
};


// todo 삭제
exports.deleteTodo = async function (req, res) {
  const { userIdx, todoIdx } = req.params;

  if (!userIdx || !todoIdx) {
    return res.send({
      isSuccess: false,
      code: 400,
      messege: "userIdx와 todoIdx를 입력해주세요."
    });
  }

  const isValidTodoRow = await indexDao.selectValideTodo(userIdx, todoIdx);
  if (isValidTodoRow.length < 1) {
    return res.send({
      isSuccess: false,
      code: 400,
      messege: "유효한 요청이 아닙니다. userIdx와 todoIdx를 확인하세요."
    });
  }

  const deleteTotoRow = await indexDao.deleteTodo(userIdx, todoIdx);
  if (!deleteTotoRow) {
    return res.send({
      isSuccess: false,
      code: 400,
      messege: "삭제 실패. 관리자에게 문의해주세요."
    });
  }

  return res.send({
    isSuccess: true,
    code: 200,
    messege: "삭제 성공"
  });
};