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

//[GET]admin/singers/detail/:id
export const detail = async (req: Request, res: Response) => {
  const find = {
    deleted: false,
    _id: req.params.id,
  };
  const records = await Singer.findOne(find);
  res.render("admin/pages/singers/detail", {
    pageTitle: "Thông tin ca sĩ",
    records: records,
  });
};

//[GET]Admin/product-categorry/edit:id
export const edit = async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await Singer.findOne({
    deleted: false,
    _id: id,
  });

  res.render("admin/pages/singers/edit", {
    pageTitle: "Chỉnh sửa danh mục sản phẩm",
    data: data,
  });
};

//[PATCH]Admin/product-categorry/edit:id
export const editPatch = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await Singer.updateOne({ _id: id }, req.body);
    res.redirect(`/${systemConfig.prefixAdmin}/singers`);
  } catch (error) {
    res.redirect("back");
  }
};
