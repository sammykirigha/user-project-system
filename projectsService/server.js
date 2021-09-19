const express = require('express');
const mssql = require('mssql');
const config = require('./db/dbConfig')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config()

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send("projects microservice")
})

mssql.connect(config).then(pool => {
    if (pool.connected) {
        console.log('Server connecte to mssql database...');
    }
})

app.listen(PORT, () => {
    console.log(`App running from port ${PORT}`);
})
