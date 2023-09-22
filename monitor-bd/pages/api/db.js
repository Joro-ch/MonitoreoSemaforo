// pages/api/db.js
const { connectToOracle } = require('./connectBD');

export default async function handler(req, res) {
  try {
    const dataFromOracle = await connectToOracle();
    res.status(200).json({ data: dataFromOracle });
  } catch (error) {
    console.error('Error al obtener datos de Oracle:', error);
    res.status(500).json({ error: 'Error al obtener datos de Oracle' });
  }
}
