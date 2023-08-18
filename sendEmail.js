import { createTransport } from "nodemailer";
import path from "path";
import ejs, { renderFile } from "ejs";
import { emailPort, user, pass } from "./config.js"

const Email = createTransport({
  service: "gmail",
  port: emailPort,
  auth: {
    user: user, // email
    pass: pass, //password
  },
});
const sendEmail = async ({ fullName, email, message }) => {
  if (!fullName || !email || !message) {
    return { error: true, errorMessage: "Missing required fields" };
  }
  try {
    const data = await renderFile(path.join(process.cwd(), "./views/email.ejs"), {
      fullName,
      email,
      message,
    });

    const mailOptions = {
      from: `Javier Peréz Portfolio 📩 <${user}>`,
      to: email,
      bcc: user,
      subject: "Message from Javier Pérez",
      html: data,
    };

    const info = await Email.sendMail(mailOptions);
    console.log(`Message sent: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { error: true, errorMessage: "Error sending email" };
  }
};


export default sendEmail;
