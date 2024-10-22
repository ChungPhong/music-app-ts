import { Request, Response } from "express";
import Song from "../../model/song.model";
import Topic from "../../model/topic.model";
import Singer from "../../model/singer.model";
import { systemConfig } from "../../config/config";

// [GET] /admin/songs/
export const index = async (req: Request, res: Response) => {
  const songs = await Song.find({
    deleted: false,
  });

  // Lấy ra thông tin ca sĩ bên Singer
  for (const song of songs) {
    const singerName = await Singer.findOne({
      deleted: false,
      _id: song.singerId,
    });
    song.singerId = singerName.fullName;
  }

  res.render("admin/pages/songs/index", {
    pageTitle: "Quản lý bài hát",
    songs: songs,
  });
};

// [GET] /admin/songs/create
export const create = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false,
  }).select("title");

  const singers = await Singer.find({
    deleted: false,
  }).select("fullName");

  res.render("admin/pages/songs/create", {
    pageTitle: "Thêm mới bài hát",
    topics: topics,
    singers: singers,
  });
};

// [POST] /admin/songs/create
export const createPost = async (req: Request, res: Response) => {
  let avatar = "";
  let audio = "";
  if (req.body.avatar) {
    avatar = req.body.avatar[0];
  }
  if (req.body.audio) {
    audio = req.body.audio[0];
  }
  const dataSong = {
    title: req.body.title,
    topicId: req.body.topicId,
    singerId: req.body.singerId,
    description: req.body.description,
    status: req.body.status,
    avatar: avatar,
    audio: audio,
    lyrics: req.body.lyrics,
  };
  const song = new Song(dataSong);
  await song.save();

  res.redirect(`/${systemConfig.prefixAdmin}/songs`);
};

// [GET] /admin/songs/edit/:id
export const edit = async (req: Request, res: Response) => {
  const id = req.params.id;
  const song = await Song.findOne({
    _id: id,
    deleted: false,
  });
  const topics = await Topic.find({
    deleted: false,
  }).select("title");
  const singers = await Singer.find({
    deleted: false,
  }).select("fullName");
  res.render("admin/pages/songs/edit", {
    pageTitle: "Chỉnh sửa bài hát",
    song: song,
    topics: topics,
    singers: singers,
  });
};

// [PATCH] /admin/songs/edit/:id
export const editPatch = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (req.body.avatar) {
    req.body.avatar = req.body.avatar[0];
  }
  if (req.body.audio) {
    req.body.audio = req.body.audio[0];
  }
  await Song.updateOne(
    {
      _id: id,
      deleted: false,
    },
    req.body
  );
  res.redirect("back");
};

// [GET] /admin/songs/detail/:id
export const detail = async (req: Request, res: Response) => {
  const find = {
    deleted: false,
    _id: req.params.id,
  };
  const record = await Song.findOne(find);

  if (record) {
    const singer = await Singer.findOne({
      deleted: false,
      _id: record.singerId,
    });
    if (singer) {
      record.singerId = singer.fullName;
    }
  }

  res.render("admin/pages/songs/detail", {
    pageTitle: "Thông tin bài hát",
    records: record,
  });
};
