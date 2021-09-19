const express = require('express');
const mssql = require('mssql');
const config = require('./db/dbCongif')
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('hello from users service')
})

mssql.connect(config).then(pool => {
    if (pool.connected) {
        console.log('Connected to MSSQL Server.....');
    }
})

app.listen(PORT, () => {
    console.log(`App running from port: ${PORT}`);
})

