import { Request, Response, NextFunction } from "express";
import fs from "fs";
import sharp from "sharp";
import path from "path";

const thumbsFolder = path.resolve("assets", "thumb");

export const getImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { filename, width, height, fit } = req.query;

  const position = (req.query.position as string) || "centre".replace("-", " ");

  try {
    const thumbName = `${width}_${height}_${fit || "cover"}_${req.query.position || "centre"
      }_${filename}`;

    fs.readdir(thumbsFolder, (err, files) => {
      const img = files.find((image) => thumbName === image);
      if (img) {
        console.log();
        console.log(
          `Cache hit -> ${path.resolve(
            __dirname,
            "..",
            thumbsFolder,
            thumbName
          )}`
        );
        return res.status(200).sendFile(path.join(thumbsFolder, thumbName));
      } else {
        console.log(`Cahche miss -> Generating thumb ${thumbName}`);
        sharp(path.join("assets", "full", filename as string))
          .resize(parseInt(width as string), parseInt(height as string), {
            fit: <keyof sharp.FitEnum | undefined>fit,
            position: <string | undefined>position,
          })
          .toFile(path.join(thumbsFolder, thumbName))
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .then((_) =>
            res.status(200).sendFile(path.join(thumbsFolder, thumbName))
          );
      }
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};
