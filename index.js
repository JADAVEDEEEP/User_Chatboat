require('dotenv').config();
const cors = require('cors');
const express = require('express');
const dbconnnecion = require('./config/db');
const documentrouter = require('./routes/doumentroute');

// console.log(process.env.GEMINI_API_KEY); // debug removed

const app = express();
app.use(
  cors({
    origin: "https://chatbaot-frotend.vercel.app",
    credentials: true,
  })
);
dbconnnecion();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/documentapi', documentrouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});