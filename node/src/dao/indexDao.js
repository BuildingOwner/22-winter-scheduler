const { pool } = require("../../database");

exports.getUserRows = async function () {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const selectUserQurey = "SELECT * FROM Users;"
      const [row] = await connection.query(selectUserQurey);
      return row;

    } catch (err) {
      console.error(`##### getUserRows Query error #####`);
      return false;

    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(` ##### getUserRows DB error #####`);
    return false;
  }
};

exports.insertTodo = async function (userIdx, contents, type) {
  try {
    // DB 연결 검사
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      // 쿼리
      const insertTodoQuery = "insert into Todos (userIdx, contents, type) values (?, ?, ?);"
      const insertTodoParams = [userIdx, contents, type];

      const [row] = await connection.query(insertTodoQuery, insertTodoParams);
      return row;

    } catch (err) {
      console.error(`##### insertTodo Query error ##### \n ${err}`);
      return false;

    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(` ##### insertTodo DB error ##### \n ${err}`);
    return false;
  }
};

exports.selectTodoByType = async function (userIdx, type) {
  try {
    // DB 연결 검사
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      // 쿼리
      const insertTodoByTypeQuery = "select todoIdx, contents from Todos where userIdx = ? and type = ? and not (status = 'D');"
      const insertTodoByTypeParams = [userIdx, type];

      const [row] = await connection.query(insertTodoByTypeQuery, insertTodoByTypeParams);
      return row;

    } catch (err) {
      console.error(`##### selectTodoByType Query error ##### \n ${err}`);
      return false;

    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(` ##### selectTodoByType DB error ##### \n ${err}`);
    return false;
  }
};

exports.selectValideTodo = async function (userIdx, todoIdx) {
  try {
    // DB 연결 검사
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      // 쿼리
      const selectValideTodoQuery = "select * from Todos where userIdx = ? and todoIdx = ? and not (status = 'D');"
      const selectValideTodoParams = [userIdx, todoIdx];

      const [row] = await connection.query(selectValideTodoQuery, selectValideTodoParams);
      return row;

    } catch (err) {
      console.error(`##### selectValideTodo Query error ##### \n ${err}`);
      return false;

    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(` ##### selectValideTodo DB error ##### \n ${err}`);
    return false;
  }
};

exports.updateTodo = async function (userIdx, todoIdx, contents, status) {
  try {
    // DB 연결 검사
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      // 쿼리
      const updateTodoQuery = "update Todos set contents = ifnull(?, contents) , status = ifnull(?, status) where userIdx = ? and todoIdx = ?;"
      const updateTodoParams = [contents, status, userIdx, todoIdx];

      const [row] = await connection.query(updateTodoQuery, updateTodoParams);
      return row;

    } catch (err) {
      console.error(`##### updateTodo Query error ##### \n ${err}`);
      return false;

    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(` ##### updateTodo DB error ##### \n ${err}`);
    return false;
  }
};

exports.deleteTodo = async function (userIdx, todoIdx) {
  try {
    // DB 연결 검사
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      // 쿼리
      const deleteTodoQuery = "update Todos set status = 'D' where userIdx = ? and todoIdx = ?;"
      const deleteTodoParams = [userIdx, todoIdx];

      const [row] = await connection.query(deleteTodoQuery, deleteTodoParams);
      return row;

    } catch (err) {
      console.error(`##### deleteTodo Query error ##### \n ${err}`);
      return false;

    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(` ##### deleteTodo DB error ##### \n ${err}`);
    return false;
  }
}