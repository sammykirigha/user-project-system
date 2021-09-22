const express = require('express');
const config = require('./db/dbConfig');
const mssql = require('mssql');
const bodyParser = require('body-parser');
const taskRouter = require('./routes/tasks.router') 
const dotenv = require('dotenv');
dotenv.config();

const app = express()

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send('task microservices')
})

mssql.connect(config).then(pool => {
    if (pool.connected) {
        console.log('server connected to my sql server databse.....');
    }
})

app.use('/api/v3/tasks', taskRouter)

app.listen(PORT, () => {
    console.log(`app running on port: ${PORT}`);
})