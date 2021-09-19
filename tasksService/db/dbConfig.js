const dotenv = require('dotenv')
dotenv.config();

const sqlConfig = {
    user: 'sa',
    password: 'Sammy3646.',
    database: 'TasksDatabase',
    server: 'localhost',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        trustedConnection: true,
        encrypt: true, // for azure 
        trustServerCertificate: true// change to true for local dev / self-signed certs
    }
}

module.exports = sqlConfig