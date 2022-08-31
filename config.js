import dotenv from "dotenv";
dotenv.config();

export const {user, pass, port, emailPort, clientURL} = {
    user: process.env.EMAIL,
    pass: process.env.PASS,
    port: process.env.PORT,
    emailPort: process.env.EMAIL_PORT,
    clientURL: process.env.CLIENT_URL,
}