import express from "express";
import dotenv from "dotenv";
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

const PORT = process.env.PORT || 8080;
const app = express();
console.log('PORT', PORT)
//dotenv.config({ path: './private/.env' })

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(helmet());
app.use(cookieParser());
app.use(morgan("dev"));

var whitelist = ['multi-refine.vercel.app']
var corsOptions = {
  origin: function (origin, callback) {
    console.log('origin', origin, whitelist)
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));

dbConnect;

app.use("", authRoutes);
app.use("/api", webflowRoutes);
app.use("/api/filter", filterRoutes);
app.use("/api/profile", profileRoutes);

console.log('process.env.NODE_ENV', process.env.NODE_ENV )

if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler())
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT || 8080}`);
});

export { app }
