import { NextFunction, Request, Response } from "express";
import { query, validationResult } from "express-validator";
import fs from "fs";

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

const checkImageExists = (req: Request, res: Response, next: NextFunction) => {
  fs.readdir(imagesFolder, (err, files) => {
    const img = files.find((image) => req.query.filename === image);
    if (img) {
      next();
    } else {
      res.status(400);
      const error = new Error("Image not found");
      next(error);
    }
  });
};

const validator = (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const message = result
      .array()
      .reduce((current, error) => current + error.msg + " ", "");
    const error = new Error(message);
    res.status(422);

    throw error;
  } else next();
};

const imageValidation = [
  query("filename")
    .exists({ checkFalsy: true })
    .withMessage("filename must be included"),
  checkImageExists,
  query("width")
    .isInt({ min: 10, max: 1000 })
    .withMessage("width must be numeric"),
  query("height")
    .isInt({ min: 10, max: 1000 })
    .withMessage("height must be numeric"),
  query("fit")
    .optional()
    .isIn(objectFitOptions)
    .withMessage("fit must be in (contain, fill, cover, inside, outside)"),
  query("position")
    .optional()
    .isIn(positionOptions)
    .withMessage(
      "position must be in (top, right-top, right, right-bottom, bottom, left-bottom, left, left-top)"
    ),
  validator,
];

export default imageValidation;
