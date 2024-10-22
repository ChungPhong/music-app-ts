import { Request, Response } from "express";
import Topic from "../../model/topic.model";
import { systemConfig } from "../../config/config";
// [GET] /admin/topics/
export const index = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false,
  });
  res.render("admin/pages/topics/index", {
    pageTitle: "Quản lý chủ đề",
    topics: topics,
  });
};

// [GET] /admin/topics/
export const create = async (req: Request, res: Response) => {
  res.render("admin/pages/topics/create", {
    pageTitle: "Thêm mới chủ đề",
  });
};

// [POST] /admin/songs/create
export const createPost = async (req: Request, res: Response) => {
  const topic = {
    title: req.body.title,
    status: req.body.status,
    avatar: req.body.avatar,
  };
  const topicSong = new Topic(topic);
  await topicSong.save();
  res.redirect(`/${systemConfig.prefixAdmin}/topics`);
};
