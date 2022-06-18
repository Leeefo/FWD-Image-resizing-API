"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const fs_1 = __importDefault(require("fs"));
const imagesFolder = "./assets/full";
const objectFitOptions = ["contain", "fill", "cover", "inside", "outside"];
const positionOptions = [
    "top",
    "right-top",
    "right",
    "right-bottom",
    "bottom",
    "left-bottom",
    "left",
    "left-top",
];
const checkImageExists = (req, res, next) => {
    fs_1.default.readdir(imagesFolder, (err, files) => {
        const img = files.find((image) => req.query.filename === image);
        if (img) {
            next();
        }
        else {
            res.status(400);
            const error = new Error("Image not found");
            next(error);
        }
    });
};
const validator = (req, res, next) => {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        const message = result
            .array()
            .reduce((current, error) => current + error.msg + " ", "");
        const error = new Error(message);
        res.status(422);
        throw error;
    }
    else
        next();
};
const imageValidation = [
    (0, express_validator_1.query)("filename")
        .exists({ checkFalsy: true })
        .withMessage("filename must be included"),
    checkImageExists,
    (0, express_validator_1.query)("width")
        .isInt({ min: 10, max: 1000 })
        .withMessage("width must be numeric"),
    (0, express_validator_1.query)("height")
        .isInt({ min: 10, max: 1000 })
        .withMessage("height must be numeric"),
    (0, express_validator_1.query)("fit")
        .optional()
        .isIn(objectFitOptions)
        .withMessage("fit must be in (contain, fill, cover, inside, outside)"),
    (0, express_validator_1.query)("position")
        .optional()
        .isIn(positionOptions)
        .withMessage("position must be in (top, right-top, right, right-bottom, bottom, left-bottom, left, left-top)"),
    validator,
];
exports.default = imageValidation;
