require('dotenv').config();
const cors = require('cors');
const express = require('express');
const dbconnnecion = require('./config/db');
const documentrouter = require('./routes/doumentroute');

// console.log(process.env.GEMINI_API_KEY); // debug removed

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://chatbaot-frotend.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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