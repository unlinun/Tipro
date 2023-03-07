import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
//,利用multer將圖片存在後端storage，取得圖片儲存的相對路徑

import multer from "multer";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

// router
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import projectsRoute from "./routes/projects.js";
import taskRoute from "./routes/tasks.js";
import timerRoute from "./routes/timer.js";

// security
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import { authorizationToken } from "./middleware/auth.js";
import { errorHandlerMiddleware } from "./middleware/errorHandler.js";
import { updateUser } from "./controller/user.js";

// 因為在 package.json 是使用 type : "module"，所以需要配置 __fileName, __dirName
// *import.meta是一个给 JavaScript 模块暴露特定上下文的元数据属性的对象。它包含了这个模块的信息，比如说这个模块的 URL。*
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ===== 建立 express app =====
const app = express();
// read assets file 靜態資源
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

app.use(express.json());
app.use(morgan("tiny"));
app.use(bodyParser.json({ limit: "30mb", extended: true })); // 解析 json
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // 解析 urlencoded

// ===== 建立 security =====
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(xss());

// 設定 multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      "avatar" +
        new Date().getFullYear() +
        new Date().getDate() +
        new Date().getHours() +
        new Date().getSeconds() +
        path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter(req, file, cb) {
    // 只接受三種圖片格式
    if (!file.originalname.match(/\.(jpg|jpeg|png|svg)$/)) {
      cb(new Error("Image type can only accept jpg/jpeg/png/svg"));
    }
    cb(null, true);
  },
});

// routes
app.use("/auth", authRoute);
app.use("/auth/login", authRoute);
app.patch("/user/:id", authorizationToken, upload.single("avatar"), updateUser);
app.use("/user", authorizationToken, userRoute);
app.use("/projects", authorizationToken, projectsRoute);
app.use("/tasks", authorizationToken, taskRoute);
app.use("/timer", authorizationToken, timerRoute);

// Error handler
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3001;

mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
