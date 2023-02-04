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
      const insertTodoByTypeQuery = "select todoIdx, contents from Todos where userIdx = ? and type = ? and status = 'A';"
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