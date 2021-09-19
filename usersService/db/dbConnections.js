const config = require('./dbCongif');
const mssql = require('mssql')

const pool = mssql.connect(config)