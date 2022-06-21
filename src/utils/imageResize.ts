import sharp from "sharp";
import path from "path";

export interface ResizeOptions {
  width: string;
  height: string;
  fit: keyof sharp.FitEnum | undefined;
  position: string | undefined;
}
export interface FileOptions {
  filename: string;
  thumbName: string;
  thumbsFolder: string;
}

const imageResize = async (
  { width, height, fit, position }: ResizeOptions,

  { filename, thumbName, thumbsFolder }: FileOptions
): Promise<sharp.OutputInfo> => {
  const fullPath: string = path.join(thumbsFolder, thumbName);

  const outputInfo: sharp.OutputInfo = await sharp(
    path.join("assets", "full", filename as string)
  )
    .resize(parseInt(width), parseInt(height), {
      fit,
      position,
    })
    .toFile(fullPath);

  return outputInfo;
};

export default imageResize;
