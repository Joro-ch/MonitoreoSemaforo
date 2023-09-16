// Ejemplo de configuración en un archivo configDB.js
// config.js
const oracledb = require('oracledb');
// configSysDB.js
module.exports = {
  user: 'sys',
  password: 'root', // Reemplaza 'tu_contraseña' por la contraseña adecuada
  connectString: 'localhost:1521/xe', // Asegúrate de ajustar esto según tu configuración
  privilege: oracledb.SYSDBA, // Especifica el privilegio SYSDBA
};