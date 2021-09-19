const express = require('express');
const bodyParser = require('body-parser')
const mssql = require('mssql');
const config = require('./db/dbCongif')
const dotenv = require('dotenv');
const userRouter = require('./routes/user.router')
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('hello from users service')
})

mssql.connect(config).then(pool => {
    if (pool.connected) {
        console.log('Connected to MSSQL Server.....');
    }
})

app.use('/api/users', userRouter)

app.listen(PORT, () => {
    console.log(`App running from port: ${PORT}`);
})

