import express, { Express } from "express";
// import cors from "cors";
import * as database from "./config/database";
import dotenv from "dotenv";
// import mainV1Routes from "./api/v1/routes/index.route";

import clientRoutes from "./routes/client/index.route";
import adminRoutes from "./routes/admin/index.route";
import { systemConfig } from "./config/config";
import path from "path";
dotenv.config();
database.connect();
const app: Express = express();
const port: number | string = process.env.Port || 3000;

app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "pug");

// TinyMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
// End TinyMCE

// App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

clientRoutes(app);
adminRoutes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
