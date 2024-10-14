import { Express } from "express";
import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";

// import * as authMiddleware from "../middlewares/auth.middlewares";

const clientRoutes = (app: Express): void => {
  app.use("/topics", topicRoutes);
  app.use("/songs", songRoutes);
};
export default clientRoutes;
