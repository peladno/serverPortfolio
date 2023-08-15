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
    const result = await EmailSender({ fullName, email, message });

    if (result.success) {
      res.status(200).json({ message: "Your message sent successfully" });
    } else {
      res.status(500).json({ message: "Error sending email" });
    }
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email" });
  }
});


app.get("/", (request, resolve) => {
  resolve.send("<h1>OK</h1>");
});

app.get("/cv", (request, resolve) => {
  resolve.sendFile(path.join(__dirname, "/public", "CurriculumJavierPerezESP.pdf"));
});

httpServer.listen(PORT, () => {
  console.log(`Server http on ${PORT}...`);
});
httpServer.on("error", (error) => console.log("Error on server", error));
