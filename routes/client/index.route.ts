import { Express } from "express";
import { topicRoutes } from "./topic.route";

// import * as authMiddleware from "../middlewares/auth.middlewares";

const clientRoutes = (app: Express): void => {
  app.use("/topics", topicRoutes);
};
export default clientRoutes;
