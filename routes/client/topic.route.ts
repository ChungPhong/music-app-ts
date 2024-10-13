import { Router } from "express";
const router: Router = Router();
import * as controller from "../../controller/client/topics.controller";

router.get("/", controller.topics);

export const topicRoutes: Router = router;
