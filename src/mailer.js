import nodemailer from "nodemailer";

const from = '"shop" <info@shop.com>';

function setup() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

export default function sendConfirmationEmail(user) {
  const tranport = setup();
  const email = {
    from,
    to: user.email,
    subject: "Wellcome to shop",
    text: `
        Wellcome to shop. Please confirm your email.

        ${user.generateConfirmationUrl()}
        `
  };

  tranport.sendMail(email);
}
