"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFoundMW = (req, res, next) => {
    res.status(404).json({ message: "Not found" });
    next();
};
exports.default = notFoundMW;
