const config = require('./dbConfig');
const mssql = require('mssql');

const pool = mssql.connect(config);

module.exports = pool;