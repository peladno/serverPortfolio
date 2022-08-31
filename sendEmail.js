import { createTransport } from "nodemailer";
import path from "path";
import ejs from "ejs";
import {emailPort, user, pass } from "./config.js"

const Email = createTransport({
  service: "gmail",
  port: emailPort,
  auth: {
    user: user, // email
    pass: pass, //password
  },
});

const sendEmail = ({ fullName, email, message }) => {
  ejs.renderFile(
    path.join(process.cwd(), "./views/email.ejs"),
    { fullName, email, message },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const mailOptions = {
          from: `Javier Peréz Portfolio 📩 <${user}>`,
          to: `${email}`,
          bcc: `${user}`,
          subject: "Message from Javier Pérez",
          html: data,
        };

        Email.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log("Message sent: %s", info.messageId);
        });
      }
    }
  );
};

export default sendEmail;
