const express = require('express');
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

app.listen(PORT, () => {
    console.log(`App running from port ${PORT}`);
})
