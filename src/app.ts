import dotenv from "dotenv";
import express, { Application } from "express";
import connectDB from "./config/mongoDB/dbConn.config";
import bodyParser from "body-parser";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import corsOptions from "./config/cors/corsOptions.config";
import errorRoutes from "./routes/error.routes";
import errorHandler from "./middleware/errorHandler.middleware";
import { connection as mongooseConnection } from "mongoose";
import fs from "fs";
import path from "path";

dotenv.config();
const app: Application = express();
const PORT: string | number = process.env.PORT || 8080;

connectDB();

console.log(process.env.NODE_ENV);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

app.use(helmet());
app.use(cors(corsOptions));

import chatRoutes from "./routes/chat.routes";
import businessInfoRoutes from "./routes/businessInfo.routes";

app.use("/chat", chatRoutes);
app.use("/business-info", businessInfoRoutes);

app.use("*", errorRoutes);
app.use(errorHandler);

mongooseConnection.once("open", () => {
  console.log("Connected to MongoDB");

  const migrationFiles = fs.readdirSync(path.join(__dirname, "migrations"));
  migrationFiles.forEach((file) => {
    require(path.join(__dirname, "migrations", file));
  });
  console.log("Migrations executed");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

mongooseConnection.on("error", (err) => {
  console.log(err);
});
