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
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const imageResize_1 = __importDefault(require("../utils/imageResize"));
describe("Image Resize Process", () => {
    const filename = "fjord.jpg";
    const resizeOptions = {
        width: "500",
        height: "500",
        fit: "cover",
        position: undefined
    };
    const fileOptions = {
        filename,
        thumbName: `${resizeOptions.width}_${resizeOptions.height}_${resizeOptions.fit || "cover"}_${resizeOptions.position || "centre"}_${filename}`,
        thumbsFolder: path_1.default.resolve("assets", "thumb"),
    };
    const fullPath = path_1.default.resolve(fileOptions.thumbsFolder, fileOptions.thumbName);
    const cleanThumbsFolder = () => {
        (0, fs_1.unlinkSync)(fullPath);
    };
    // afterEach(cleanThumbsFolder)
    beforeEach(() => (0, fs_1.existsSync)(fullPath) && cleanThumbsFolder());
    it("Should return image with the specified dimensions", () => __awaiter(void 0, void 0, void 0, function* () {
        const outputInfo = yield (0, imageResize_1.default)(resizeOptions, fileOptions);
        expect(outputInfo.height).toEqual(500);
        expect(outputInfo.width).toEqual(500);
    }));
});
