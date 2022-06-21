import { unlinkSync, existsSync } from "fs";
import path from "path";
import { OutputInfo } from "sharp";
import imageResize, { FileOptions, ResizeOptions } from "../utils/imageResize";

describe("Image Resize Process", () => {
  const filename = "fjord.jpg";

  const resizeOptions: ResizeOptions = {
    width: "500",
    height: "500",
    fit: "cover",
    position: undefined,
  };

  const fileOptions: FileOptions = {
    filename,
    thumbName: `${resizeOptions.width}_${resizeOptions.height}_${
      resizeOptions.fit || "cover"
    }_${resizeOptions.position || "centre"}_${filename}`,
    thumbsFolder: path.resolve("assets", "thumb"),
  };

  const fullPath: string = path.resolve(
    fileOptions.thumbsFolder,
    fileOptions.thumbName
  );

  const cleanThumbsFolder = (): void => {
    unlinkSync(fullPath);
  };
  afterEach(cleanThumbsFolder);

  beforeEach(() => existsSync(fullPath) && cleanThumbsFolder());

  it("Should return image with the specified dimensions", async () => {
    const outputInfo: OutputInfo = await imageResize(
      resizeOptions,
      fileOptions
    );

    expect(outputInfo.height).toEqual(500);
    expect(outputInfo.width).toEqual(500);
  });
});
