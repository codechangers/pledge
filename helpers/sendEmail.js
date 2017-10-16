const nodemailer = require('nodemailer');

module.exports = ({
  firstName, lastName, email, guardianEmail,
}) => {
  const transporter = nodemailer.createTransport({
    host: 'email-smtp.us-west-2.amazonaws.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const message = {
    from: 'pledge@codechangers.com',
    to: [email, guardianEmail].filter(Boolean),
    subject: 'Test',
    text: 'Plaintext version of the message',
    html: `<p>Thanks for pledgeing ${firstName} ${lastName} </p>`,
  };
  return transporter.sendMail(message);
};
