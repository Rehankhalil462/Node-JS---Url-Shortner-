import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { getShortUrl, shortenURL } from "./controllers/UrlController.js";

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(process.env.MONGO_URI);

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.status(200).sendFile(process.cwd() + "/views/index.html");
});
app.post("/api/shorturl", shortenURL);
app.get("/api/:id", getShortUrl);

app.listen(port, () => {
  console.info(`App is listening at PORT ${port}`);
});

app.get("/heartbeat", (req, res) => {
  res.status(200).send("URL Shortener Microservice is working.");
});
