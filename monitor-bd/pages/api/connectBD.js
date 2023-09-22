// connectBD.js
const oracledb = require('oracledb');
const dbConfig = require('./configBD'); // Asegúrate de que la ruta sea correcta

async function connectToOracle() {
  try {

    // Conexión a la base de datos
    const connection = await oracledb.getConnection(dbConfig);

    // Consulta de prueba
    // const insertSql = 'INSERT INTO personas VALUES (8, 8, 8)';
    // await connection.execute(insertSql);

    // await connection.commit();

    // Consulta de prueba (opcional)
    const selectSql = 'SELECT SUM(bytes) / 1048576 AS total_size_in_mb FROM v$sgastat';
    const result = await connection.execute(selectSql);
    // Imprimir resultados en la consola
    // console.log('Resultado de la consulta:');
    // for (const row of result.rows) {
    //   console.log(row);
    // }

    // Cerrar la conexión
    await connection.close();

    return result.rows[0][0];

  } catch (error) {
    console.error('Error al conectar a Oracle:', error);
    throw error;
  }
}

module.exports = { connectToOracle };