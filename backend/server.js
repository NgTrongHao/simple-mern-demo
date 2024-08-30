import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import placesRoutes from "./routes/place-routes.js";
import HttpError from "./models/http-error.js";
import userRoutes from "./routes/user-routes.js";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
}); // register middleware

app.use("/api/places", placesRoutes);
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  throw new HttpError("Could not find this route.", 404);
});

// Centralized Error Handling Middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(5000); // start server on port 5000
  })
  .catch((err) => {
    console.log(err);
  });
