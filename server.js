import express from "express";
import http from "http";
import EmailSender from "./sendEmail.js";
import { port, clientURL } from "./config.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = http.createServer(app);

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
const PORT = process.env.PORT || port;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//API
app.post("/send", async (req, res) => {
  try {
    const { fullName, email, message } = req.body;
    EmailSender({ fullName, email, message });
    res.json({ message: "Your message sent successfully" });
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
});

app.get("/", (request, resolve) => {
  resolve.send("<h1>OK</h1>");
});

app.get("/cv", (request, resolve) => {
  resolve.sendFile(path.join(__dirname, "/public", "JavierCurriculum.pdf"));
});

httpServer.listen(PORT, () => {
  console.log(`Server http on ${PORT}...`);
});
httpServer.on("error", (error) => console.log("Error on server", error));
