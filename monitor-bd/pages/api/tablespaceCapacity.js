const oracledb = require('oracledb');
const dbConfig = require('./configBD');

export default async (req, res) => {
    try {
      // Establecer una conexión a la base de datos Oracle
      const connection = await oracledb.getConnection(dbConfig);
  
      // Consultar la capacidad de todos los tablespaces
      const query = `
      select
      a.tablespace_name,
      round(a.bytes_alloc / 1024 / 1024, 2) megs_alloc,
      round(nvl(b.bytes_free, 0) / 1024 / 1024, 2) megs_free,
      round((a.bytes_alloc - nvl(b.bytes_free, 0)) / 1024 / 1024, 2) megs_used,
      round(maxbytes/1048576,2) Max
      from ( select f.tablespace_name, sum(f.bytes) bytes_alloc,
      sum(decode(f.autoextensible, 'YES',f.maxbytes,'NO', f.bytes)) maxbytes
   from
      dba_data_files f
   group by
      tablespace_name) a,
   (  select
         f.tablespace_name,
         sum(f.bytes) bytes_free
      from
         dba_free_space f
   group by
         tablespace_name) b
   where
         a.tablespace_name = b.tablespace_name (+)
         And a.tablespace_name NOT IN ('SYSTEM', 'SYSAUX', 'TEMP', 'USERS', 'UNDOTBS1')
      `;
      const result = await connection.execute(query);
  
      // Cerrar la conexión
      await connection.close();
  
      // Combinar la información de capacidad total y capacidad actual en un arreglo de objetos
      const tablespaces = result.rows.map(row => {
        console.log(row);
        return {
          tablespaceName: row[0],
          currentCapacityMB: row[3],
          totalCapacityMB: row[2]
        };
      });
  
      // Enviar la lista de tablespaces como respuesta
      res.status(200).json({ tablespaces });
    } catch (error) {
      console.error('Error al obtener la capacidad de los tablespaces', error);
      res.status(500).json({ error: 'Error al obtener la capacidad de los tablespaces' });
    }
  };