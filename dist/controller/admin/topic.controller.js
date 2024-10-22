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
exports.deleteItem = exports.editPatch = exports.edit = exports.detail = exports.createPost = exports.create = exports.index = void 0;
const topic_model_1 = __importDefault(require("../../model/topic.model"));
const config_1 = require("../../config/config");
const pagination_1 = __importDefault(require("../../helpers/pagination"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        deleted: false,
    };
    let initPagination = {
        currentPage: 1,
        limitPage: 5,
    };
    const countTask = yield topic_model_1.default.countDocuments(find);
    const objectPagination = (0, pagination_1.default)(initPagination, req.query, countTask);
    const topics = yield topic_model_1.default.find(find)
        .limit(objectPagination.limitPage)
        .skip(objectPagination.skip);
    res.render("admin/pages/topics/index", {
        pageTitle: "Quản lý chủ đề",
        topics: topics,
        pagination: objectPagination,
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/topics/create", {
        pageTitle: "Thêm mới chủ đề",
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topic = {
        title: req.body.title,
        status: req.body.status,
        avatar: req.body.avatar,
    };
    const topicSong = new topic_model_1.default(topic);
    yield topicSong.save();
    res.redirect(`/${config_1.systemConfig.prefixAdmin}/topics`);
});
exports.createPost = createPost;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        deleted: false,
        _id: req.params.id,
    };
    const records = yield topic_model_1.default.findOne(find);
    res.render("admin/pages/topics/detail", {
        pageTitle: "Thông tin chủ đề",
        records: records,
    });
});
exports.detail = detail;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = yield topic_model_1.default.findOne({
        deleted: false,
        _id: id,
    });
    res.render("admin/pages/topics/edit", {
        pageTitle: "Chỉnh sửa chủ đề",
        data: data,
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const topic = {
        title: req.body.title,
        status: req.body.status,
        avatar: req.body.avatar,
    };
    try {
        yield topic_model_1.default.updateOne({ _id: id }, topic);
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/topics`);
    }
    catch (error) {
        res.redirect("back");
    }
});
exports.editPatch = editPatch;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield topic_model_1.default.updateOne({ _id: id }, {
        deleted: true,
    });
    res.redirect("back");
});
exports.deleteItem = deleteItem;
