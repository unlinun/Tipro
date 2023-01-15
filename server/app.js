import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// security
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(bodyParser.json({ limit: "30mb", extended: true })); // 解析 json
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // 解析 urlencoded

// security
app.use(cors());
app.use(helmet());
app.use(xss());

app.get("/", (req, res) => {
  res.send("hello");
});

const PORT = process.env.PORT || 3001;

mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
