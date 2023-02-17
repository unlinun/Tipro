import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import multer from "multer";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

// router
import authRoute from "./routes/auth.js";
import companyRoute from "./routes/company.js";
import projectsRoute from "./routes/projects.js";
import taskRoute from "./routes/tasks.js";
import phaseRoute from "./routes/phase.js";

// security
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import { authorizationToken } from "./middleware/auth.js";

// 因為在 package.json 是使用 type : "module"，所以需要配置 __fileName, __dirName
// *import.meta是一个给 JavaScript 模块暴露特定上下文的元数据属性的对象。它包含了这个模块的信息，比如说这个模块的 URL。*
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== 建立 express app =====
const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(bodyParser.json({ limit: "30mb", extended: true })); // 解析 json
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // 解析 urlencoded

// security
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(xss());

// routes
app.use("/auth", authRoute);
app.use("/staffs", authorizationToken, companyRoute);
app.use("/projects", authorizationToken, projectsRoute);
app.use("/tasks", authorizationToken, taskRoute);
app.use("/phase", authorizationToken, phaseRoute);

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
