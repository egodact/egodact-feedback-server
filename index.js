const express = require('express');
const cors = require('cors');
const sendEmail = require('./lib/sendEmail');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/feedback/create', async (req, res) => {
  const {
    feedback,
    sender_email: senderEmail
  } = req.body;

  if (!feedback) {
    return res.status(400).json({
      error_description: 'No feedback provided.'
    });
  }

  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const senderEmailIsValid = senderEmail && EMAIL_REGEX.test(senderEmail);

  await sendEmail({
    feedback,
    senderEmail: senderEmailIsValid ? senderEmail : null
  });

  if (senderEmail && !senderEmailIsValid) {
    return res.json({
      success: true,
      warning_description: 'Note: the sender e-mail address was excluded from your feedback since it was invalid.'
    });
  }

  res.json({
    success: true
  });
});

const PORT = 8080 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
