const nodemailer = require("nodemailer");
const {
  SMTP_HOST,
  SMTP_EMAIL,
  SMTP_PASSWORD,
  SMTP_PORT,
  FROM_EMAIL,
  FROM_NAME,
} = require("../config/mailConfig");

/*
    options = {
        email: user.email,
      subject: "Password reset token",
      message,
    }

*/

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  const message = {
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
};
module.exports = sendEmail;
