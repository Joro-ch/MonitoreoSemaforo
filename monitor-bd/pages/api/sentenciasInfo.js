const oracledb = require('oracledb');
const dbConfig = require('./configBD');

export default async (req, res) => {
    try {
      // Establecer una conexión a la base de datos Oracle
      const connection = await oracledb.getConnection(dbConfig);
  
      // Usar AUDIT ALL; por cualquier cosa
      //ALTER SYSTEM SET AUDIT_SYS_OPERATIONS=TRUE SCOPE=SPFILE; y este para que se guarde las sentecias hechas por sistem
      const query1 = `
      SELECT  TO_CHAR(timestamp, 'YYYY-MM-DD'),
      TO_CHAR(timestamp, 'HH24:MI:SS'),
      SESSION_CPU,
      SESSIONID, 
      ACTION_NAME
      FROM DBA_AUDIT_TRAIL
      where action_name IN ('SELECT', 'INSERT', 'UPDATE', 'DELETE')
    `;
    await connection.execute(query1);

      const query = `
        SELECT  TO_CHAR(timestamp, 'YYYY-MM-DD'),
        TO_CHAR(timestamp, 'HH24:MI:SS'),
        SESSION_CPU,
        SESSIONID, 
        ACTION_NAME
        FROM DBA_AUDIT_TRAIL
        where action_name IN ('SELECT', 'INSERT', 'UPDATE', 'DELETE')
      `;
      const result = await connection.execute(query);
  
      // Cerrar la conexión
      await connection.close();
  
      const infoSentencias = result.rows.map(row => {
        return {
            Fecha: row[0],
            Hora: row[1],
            SESSION_CPU: row[2]?row[2]:0,
            SESSIONID: row[3],
            ACTION_NAME: row[4],

        };
      });
  
      // Enviar la lista de tablespaces como respuesta
      res.status(200).json({ infoSentencias });
    } catch (error) {
      console.error('Error al obtener la capacidad de los tablespaces', error);
      res.status(500).json({ error: 'Error al obtener la capacidad de los tablespaces' });
    }
  };