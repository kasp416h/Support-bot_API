import dotenv from "dotenv";
import express, { Application } from "express";
import bodyParser from "body-parser";
import compression from "compression";
import { connection as mongooseConnection } from "mongoose";
import connectDB from "./config/mongoDB/db.conn";

dotenv.config();
const app: Application = express();
const PORT: string | number = process.env.PORT || 8080;

connectDB();

console.log(process.env.NODE_ENV);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

import chatRoutes from "./routes/chat.routes";

app.use("/chat", chatRoutes);

mongooseConnection.once("open", () => {
  console.log("Connected to MongoDB");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

mongooseConnection.on("error", (err) => {
  console.log(err);
});
