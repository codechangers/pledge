const nodemailer = require('nodemailer');
const pdf = require('html-pdf');
const moment = require('moment');

module.exports = ({
  firstName, lastName, email, guardianEmail, grade,
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
  const html = `
  <html>
  <head>
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Permanent+Marker" rel="stylesheet">
  </head>
  <body>
    <div style="width:720px; height:540px; padding:20px; text-align:center; margin:auto; display:block;">
      <div style="width:670px; height:490px; padding:20px; text-align:center; border:5px solid #8EC641;">
       <span style="font-family: 'Roboto', sans-serif; font-size:50px; font-weight:700; color:#1D3260;">Certificate of Completion</span>
       <br>
       <span style="font-family: 'Roboto', sans-serif; font-size:25px; color:#6D6D6C;"><i>This certificate is awarded to</i></span>
       <br>
       <span style="font-family: 'Permanent Marker', cursive; font-size:45px; color:#8EC641;"><b>${firstName} ${lastName}</b></span><br>
       <span style="font-family: 'Roboto', sans-serif; font-size:20px; color:#6D6D6C;"><i>for successfull completion of</i></span> <br><br>
       <span style="font-family: 'Roboto', sans-serif; font-weight:700; font-size:30px; line-height:35px; color:#6D6D6C;">CodeChangers Digital Safety Course ${grade}</span> <br>
       <span style="font-family: 'Roboto', sans-serif; font-size:15px; color:#6D6D6C;">and pledging to be a responsible internet user and digital citizen.</span><br><br>
       <span style="font-family: 'Roboto', sans-serif; font-weight:400; font-size:20px; color:#6D6D6C;">${moment().format('MMMM Do YYYY')}</span><br>
       <div style=""><img height="80" style="padding-top:15px;" src="https://www.codechangers.com/images/signiture.png"></div>
       <span style="font-family: 'Roboto', sans-serif; font-size:11px; color:#6D6D6C;">Jason Schallenberger, Co-Founder and Chief Executive Officer, CodeChangers.com</span><br><br>
       <span style="font-family: 'Roboto', sans-serif; font-size:12px; color:#6D6D6C;">For more information visit CodeChangers.com/pledge</span><br><br>
       <div style="height:60px; background-color:#003D58;"><img height="30" style="padding-top:15px;" src="https://www.codechangers.com/NEW/static/img/codechangers-logo.svg"></div><br><br>
      </div>
    </div>
  </body>
  </html>
`;
  pdf.create(html, {
    orientation: 'landscape',
    format: 'Letter',
  }).toBuffer((err, buff) => {
    if (err) {
      throw err;
    }
    const message = {
      from: 'pledge@codechangers.com',
      to: [email, guardianEmail].filter(Boolean),
      subject: 'Test',
      text: 'Here is your web-safe certificate',
      attachments: [{
        filename: 'cert.pdf',
        content: buff,
      }],
    };
    return transporter.sendMail(message);
  });
};
