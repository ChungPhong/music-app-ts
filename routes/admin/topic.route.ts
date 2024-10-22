import { Router } from "express";
const router: Router = Router();
import multer from "multer";

import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware";
const upload = multer();

import * as controller from "../../controller/admin/topic.controller";
router.get("/", controller.index);
router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("avatar"),
  uploadCloud.uploadSingle,
  controller.createPost
);

router.get("/detail/:id", controller.detail);


router.get("/edit/:id", controller.edit);
router.patch(
    "/edit/:id",
    upload.single("thumbnail"),
    uploadCloud.uploadSingle,
    controller.editPatch
  );
export const topicRoutes: Router = router;
