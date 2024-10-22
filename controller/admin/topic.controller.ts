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

//[GET]admin/singers/detail/:id
export const detail = async (req: Request, res: Response) => {
  const find = {
    deleted: false,
    _id: req.params.id,
  };
  const records = await Topic.findOne(find);
  res.render("admin/pages/topics/detail", {
    pageTitle: "Thông tin chủ đề",
    records: records,
  });
};

//[GET]Admin/topics/edit:id
export const edit = async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await Topic.findOne({
    deleted: false,
    _id: id,
  });

  res.render("admin/pages/topics/edit", {
    pageTitle: "Chỉnh sửa chủ đề",
    data: data,
  });
};

//[PATCH]Admin/topics/edit:id
export const editPatch = async (req: Request, res: Response) => {
  const id = req.params.id;
  const topic = {
    title: req.body.title,
    status: req.body.status,
    avatar: req.body.avatar,
  };
  try {
    await Topic.updateOne({ _id: id }, topic);
    res.redirect(`/${systemConfig.prefixAdmin}/topics`);
  } catch (error) {
    res.redirect("back");
  }
};
