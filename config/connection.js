const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

let sequelize;

// First IF Statement is an original connection to Heroku + JawsDB hosting service;
// if (process.env.JAWSDB_URL) {
//   sequelize = new Sequelize(process.env.JAWSDB_URL);
// }

// Second IF Statement is a new DB hosting service by TiDB to avoid reliance on Heroku;
if (process.env.TIDB_URL) {
  console.log('Entering TIDB...');
  sequelize = new Sequelize(
    process.env.TIDB_DATABASE,    
    process.env.TIDB_USER,
    process.env.TIDB_PASSWORD,
    {
      host: process.env.TIDB_HOST,
      dialect: 'mysql',
      port: process.env.TIDB_PORT,
      dialectOptions: {
        ssl: {
          ca: fs.readFileSync(path.resolve('../isrgrootx1.pem'))
        }
      }
    }
  );
} else { // Else, utilize a local MySQL connection for development purposes.
  console.log('Others failed: Entering Localhost...');
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: '127.0.0.1',
      dialect: 'mysql',
      port: 3306,
    }
  );
}

module.exports = sequelize;
