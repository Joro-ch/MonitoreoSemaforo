// connectBD.js
const oracledb = require('oracledb');
const dbConfig = require('./configBD'); // Asegúrate de que la ruta sea correcta

async function connectToOracle(consultaSQL) {
  try {
    // Conexión a la base de datos
    const connection = await oracledb.getConnection(dbConfig);

    // Consulta SQL
    const sql = consultaSQL;

    // Ejecutar la consulta
    const result = await connection.execute(sql);

    // Cerrar la conexión
    await connection.close();
    
    // Devolver los resultados de la consulta
    return result.rows; 

  } catch (error) {
    console.error('Error al conectar a Oracle:', error);
    throw error; 
  }
}

module.exports = { connectToOracle };
