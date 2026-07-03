require('dotenv').config();

const express = require('express');
const dbconnnecion = require('./config/db');
const documentrouter = require('./routes/doumentroute');

// console.log(process.env.GEMINI_API_KEY); // debug removed

const app = express();

dbconnnecion();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/documentapi', documentrouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});