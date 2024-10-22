"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paginationHelpers = (objectPagination, query, countRecords) => {
    if (query.page) {
        objectPagination.currentPage = parseInt(query.page);
    }
    const totalPage = Math.ceil(countRecords / objectPagination.limitPage);
    objectPagination.totalPage = totalPage;
    if (objectPagination.currentPage > totalPage) {
        objectPagination.currentPage = totalPage;
    }
    objectPagination.skip =
        (objectPagination.currentPage - 1) * objectPagination.limitPage;
    return objectPagination;
};
exports.default = paginationHelpers;
