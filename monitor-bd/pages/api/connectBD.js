// connectBD.js
const oracledb = require('oracledb');
const dbConfig = require('./configBD'); // Asegúrate de que la ruta sea correcta

async function connectToOracle() {
  try {
    // Conexión a la base de datos
    const connection = await oracledb.getConnection(dbConfig);

    // Consulta SQL
    const sql = `
      SELECT 
        df.tablespace_name AS "Tablespace",
        ROUND(df.bytes / (1024 * 1024), 2) AS "Tamaño (en MB)",
        TO_CHAR(SUM(s.bytes) / df.bytes * 100, '999.99') || '%' AS "Usado (%)",
        t.table_name AS "Table",
        CASE 
          WHEN c.constraint_type = 'P' THEN 'Primary Key'
          WHEN c.constraint_type = 'U' THEN 'Unique Key'
          WHEN c.constraint_type = 'R' THEN 'Referential Constraint'
          ELSE 'Otro'
        END AS "Tipo de Constraint"
      FROM 
        dba_data_files df
      JOIN 
        dba_segments s ON df.tablespace_name = s.tablespace_name
      LEFT JOIN 
        dba_tables t ON s.segment_name = t.table_name
      LEFT JOIN 
        dba_constraints c ON t.table_name = c.table_name
      WHERE 
        df.tablespace_name NOT IN ('SYSTEM', 'SYSAUX', 'TEMP', 'USERS', 'UNDOTBS1')
      GROUP BY 
        df.tablespace_name, df.bytes, t.table_name, c.constraint_type
    `;

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
