const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const { MAILER_HOST, MAILER_USER, MAILER_USER_PASSWORD } = process.env;

const sendEmail = async ({ feedback, senderEmail }) => {
  const emailTransporter = nodemailer.createTransport({
    host: MAILER_HOST,
    port: 587,
    secure: false,
    auth: {
      user: MAILER_USER,
      pass: MAILER_USER_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const sendFrom = senderEmail || '"Anonymous feedback" <anonymous@egodact.com>';
  const result = await emailTransporter.sendMail({
    from: sendFrom,
    to: 'feedback@egodact.com',
    subject: 'User feedback',
    text: feedback
  });

  // We don't want actual user data in the logs. Let's remove it!
  if (senderEmail) {
    result.envelope.from = 'removed@egodact.com';
  }

  console.log('Sent e-mail: ', result);
};

module.exports = sendEmail;
