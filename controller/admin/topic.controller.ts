import { Request, Response } from "express";
import Topic from "../../model/topic.model";
import { systemConfig } from "../../config/config";
import paginationHelpers from "../../helpers/pagination";
import filterStatusHelpers from "../../helpers/filterStatus";
import searchHelper from "../../helpers/search";
// [GET] /admin/topics/
export const index = async (req: Request, res: Response) => {
  interface Find {
    deleted: boolean;
    status?: string;
    title?: RegExp;
  }
  const find: Find = {
    deleted: false,
  };

  //đoạn bộ lọc
  const filterStatus = filterStatusHelpers(req.query);
  if (req.query.status) {
    find.status = req.query.status as string;
  }
  //đoạn bộ lọc

  //search
  const objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  //END search

  //PAGINATION
  const countProduct = await Topic.countDocuments(find);
  const objectPagination = paginationHelpers(
    {
      currentPage: 1,
      limitPage: 4,
    },
    req.query,
    countProduct
  );
  //END PAGINATION

  const topics = await Topic.find(find)
    .limit(objectPagination.limitPage)
    .skip(objectPagination.skip);
  res.render("admin/pages/topics/index", {
    pageTitle: "Quản lý chủ đề",
    topics: topics,
    pagination: objectPagination,
    keyword: objectSearch.keyword,
    filterStatus: filterStatus,
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

//[DELETE]Admin/topics/delete:id
export const deleteItem = async (req: Request, res: Response) => {
  const id = req.params.id;

  // await Product.deleteOne({ _id: id }); Xóa cứng
  await Topic.updateOne(
    { _id: id },
    {
      deleted: true,
    }
  );

  res.redirect("back");
};

//[PATCH]Admin/topics/change-status/:status/:id
export const changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Topic.updateOne(
    { _id: id },
    {
      status: status,
    }
  );

  res.redirect("back");
};
