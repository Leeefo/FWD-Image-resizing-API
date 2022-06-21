import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import { FileOptions, ResizeOptions } from "./../utils/imageResize";
import imageResize from "../utils/imageResize";
import sharp from "sharp";

const thumbsFolder = path.resolve("assets", "thumb");

export const getImages = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { filename, width, height, fit } = req.query;

  const position = (req.query.position as string) || "centre".replace("-", " ");

  try {
    const thumbName = `${width}_${height}_${fit || "cover"}_${req.query.position || "centre"
      }_${filename}`;

    fs.readdir(thumbsFolder, async (err, files) => {
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

        const resizeOptions: ResizeOptions = {
          width: (width as string),
          height: (height as string),
          fit: (fit as keyof sharp.FitEnum | undefined),
          position

        }
        const fileOptions: FileOptions = {
          filename: (filename as string),
          thumbName: (thumbName as string),
          thumbsFolder: (thumbsFolder as string),
        }
        await imageResize(resizeOptions, fileOptions)
        return res.status(200).sendFile(path.join(thumbsFolder, thumbName))

      }
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};
