// pages/api/db.js
const { connectToOracle } = require('./connectBD');

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

export default async function handler(req, res) {
  try {
    const dataFromOracle = await connectToOracle(sql);
    res.status(200).json({ data: dataFromOracle });
  } catch (error) {
    console.error('Error al obtener datos de Oracle:', error);
    res.status(500).json({ error: 'Error al obtener datos de Oracle' });
  }
}


