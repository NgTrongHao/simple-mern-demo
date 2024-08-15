import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const uuid = require("uuid/v4");
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
}); // middleware

app.listen(3001); // start server on port 3001
