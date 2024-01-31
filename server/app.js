import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import webflowRoutes from "./routes/webflowRoutes.js";
import filterRoutes from "./routes/filterRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import { dbConnect } from "./db/dbConnect.js";
import errorhandler from "errorhandler";
import dotenv from "dotenv"

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(morgan("dev"));
dotenv.config();

dbConnect;

app.use("", authRoutes);
app.use("/api", webflowRoutes);
app.use("/api/filter", filterRoutes);
app.use("/api/profile", profileRoutes);

if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler())
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT || 8080}`);
});

export { app }