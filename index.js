const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post('/feedback/create', (req, res) => {
  res.json(req.body);
});

const PORT = 8080 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
