import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import webflowRoutes from "./routes/webflowRoutes.js";
import filterRoutes from "./routes/filterRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import { dbConnect } from "./db/dbConnect.js";
import { dotenvFile } from "./helper/dotenv.js"
const PORT = process.env.PORT || 8080;
const app = express();

dotenvFile;



app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.use(helmet());
app.use(cookieParser());
app.use(morgan("dev"));

dbConnect;

app.use("", authRoutes);
app.use("/api", webflowRoutes);
app.use("/api/filter", filterRoutes);
app.use("/api/profile", profileRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT || 8080}`);
});

export { app }