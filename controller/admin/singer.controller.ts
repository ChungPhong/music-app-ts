import { Request, Response } from "express";
import Singer from "../../model/singer.model";
import { systemConfig } from "../../config/config";

// [GET] /admin/singers/
export const index = async (req: Request, res: Response) => {
  const singers = await Singer.find({
    deleted: false,
  });
  res.render("admin/pages/singers/index", {
    pageTitle: "Quản lý ca sĩ",
    singers: singers,
  });
};

// [GET] /admin/singers/create
export const create = async (req: Request, res: Response) => {
  res.render("admin/pages/singers/create", {
    pageTitle: "Thêm mới ca sĩ",
  });
};

// [POST] /admin/songs/create
export const createPost = async (req: Request, res: Response) => {
  const singer = {
    fullName: req.body.fullName,
    status: req.body.status,
    avatar: req.body.avatar,
  };
  const singerSong = new Singer(singer);
  await singerSong.save();
  res.redirect(`/${systemConfig.prefixAdmin}/singers`);
};
