"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMW = (err, req, res, _next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};
exports.default = errorMW;
