import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import routerV1 from "./routes/v1/index.js";
import { errorHandler } from "./middlewares/index.js";
import cors from "cors";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Express instanciation
const server = express();

// Middlewares
server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(helmet());
server.use(cors());
server.use(express.static(path.join(__dirname, "../../frontend/dist")));

// v1 routes
server.use("/api/v1", routerV1);

// Serving static spa frontend
server.get(["/", "/*"], (req, res) => {
  res.sendFile(path.join(__dirname + "../../../frontend/dist", "index.html"));
});

// Error handler
server.use(errorHandler);

export default server;
