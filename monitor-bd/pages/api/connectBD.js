// connectBD.js
const oracledb = require('oracledb');
const dbConfig = require('./configBD'); // Asegúrate de que la ruta sea correcta

async function connectToOracle() {
  try {

    // Conexión a la base de datos
    const connection = await oracledb.getConnection(dbConfig);

    // Consulta de prueba
    const sql = 'SELECT * FROM personas'; 
    const result = await connection.execute(sql);

    // Imprimir resultados en la consola
    console.log('Resultado de la consulta:');
    for (const row of result.rows) {
      console.log(row);
    }

    // Cerrar la conexión
    await connection.close();
    
    return result.rows; 

  } catch (error) {
    console.error('Error al conectar a Oracle:', error);
    throw error; 
  }
}

module.exports = { connectToOracle };