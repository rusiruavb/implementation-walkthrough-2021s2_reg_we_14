import express from "express";
import log from "./log/logger";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./routes";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create database connection - Start
mongoose
  .connect(MONGO_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    log.info(process.env.MONGO_URI);
    log.info(process.env.ENVIRONMENT);
  })
  .catch((error) => log.error(error.message))
  .finally(() => {
    log.info("Database Synced");
  });
// Create database connection - End

app.get("/", (req, res, next) => {
  res.send("<h5>Transportation Backend API - 2021REG_WE_14</h5>");
});

app.listen(PORT, () => {
  log.info(`API server up and running on PORT ${PORT}`);
  routes(app);
});

module.exports = app;
