"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detail = exports.editPatch = exports.edit = exports.createPost = exports.create = exports.index = void 0;
const song_model_1 = __importDefault(require("../../model/song.model"));
const topic_model_1 = __importDefault(require("../../model/topic.model"));
const singer_model_1 = __importDefault(require("../../model/singer.model"));
const config_1 = require("../../config/config");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield song_model_1.default.find({
        deleted: false,
    });
    for (const song of songs) {
        const singerName = yield singer_model_1.default.findOne({
            deleted: false,
            _id: song.singerId,
        });
        song.singerId = singerName.fullName;
    }
    res.render("admin/pages/songs/index", {
        pageTitle: "Quản lý bài hát",
        songs: songs,
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topic_model_1.default.find({
        deleted: false,
    }).select("title");
    const singers = yield singer_model_1.default.find({
        deleted: false,
    }).select("fullName");
    res.render("admin/pages/songs/create", {
        pageTitle: "Thêm mới bài hát",
        topics: topics,
        singers: singers,
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const song = new song_model_1.default(dataSong);
    yield song.save();
    res.redirect(`/${config_1.systemConfig.prefixAdmin}/songs`);
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const song = yield song_model_1.default.findOne({
        _id: id,
        deleted: false,
    });
    const topics = yield topic_model_1.default.find({
        deleted: false,
    }).select("title");
    const singers = yield singer_model_1.default.find({
        deleted: false,
    }).select("fullName");
    res.render("admin/pages/songs/edit", {
        pageTitle: "Chỉnh sửa bài hát",
        song: song,
        topics: topics,
        singers: singers,
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (req.body.avatar) {
        req.body.avatar = req.body.avatar[0];
    }
    if (req.body.audio) {
        req.body.audio = req.body.audio[0];
    }
    yield song_model_1.default.updateOne({
        _id: id,
        deleted: false,
    }, req.body);
    res.redirect("back");
});
exports.editPatch = editPatch;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        deleted: false,
        _id: req.params.id,
    };
    const record = yield song_model_1.default.findOne(find);
    if (record) {
        const singer = yield singer_model_1.default.findOne({
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
});
exports.detail = detail;
