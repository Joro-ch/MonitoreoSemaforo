// pages/api/db.js
const { connectToOracle } = require('./connectBD');

const sql = 'SELECT SUM(bytes) / 1048576 AS total_size_in_mb FROM v$sgastat';

export default async function handler(req, res) {
  try {
    const dataFromOracle = await connectToOracle(sql);
    res.status(200).json({ data: dataFromOracle });
  } catch (error) {
    console.error('Error al obtener datos de Oracle:', error);
    res.status(500).json({ error: 'Error al obtener datos de Oracle' });
  }
}

