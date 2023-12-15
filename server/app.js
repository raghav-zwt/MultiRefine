import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import webflowAuthRoutes from "./routes/webflowAuthRoutes.js";
import { dbConnect } from "./db/dbConnect.js";
import { dotenvFile } from "./helper/dotenv.js"
const PORT = process.env.PORT || 8080;
const app = express();

dotenvFile;

var corsOptions = {
  origin: ['https://multi-refine.vercel.app', 'http://localhost:8080']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

dbConnect;

app.use("/webflow-auth", webflowAuthRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT || 8080}`); 
});

export { app }