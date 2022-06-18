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
exports.getImages = void 0;
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const thumbsFolder = path_1.default.resolve("assets", "thumb");
const getImages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename, width, height, fit } = req.query;
    const position = req.query.position || "centre".replace("-", " ");
    try {
        const thumbName = `${width}_${height}_${fit || "cover"}_${req.query.position || "centre"}_${filename}`;
        fs_1.default.readdir(thumbsFolder, (err, files) => {
            const img = files.find((image) => thumbName === image);
            if (img) {
                console.log();
                console.log(`Cache hit -> ${path_1.default.resolve(__dirname, "..", thumbsFolder, thumbName)}`);
                return res.status(200).sendFile(path_1.default.join(thumbsFolder, thumbName));
            }
            else {
                console.log(`Cahche miss -> Generating thumb ${thumbName}`);
                (0, sharp_1.default)(path_1.default.join("assets", "full", filename))
                    .resize(parseInt(width), parseInt(height), {
                    fit: fit,
                    position: position,
                })
                    .toFile(path_1.default.join(thumbsFolder, thumbName))
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    .then((_) => res.status(200).sendFile(path_1.default.join(thumbsFolder, thumbName)));
            }
        });
    }
    catch (error) {
        res.status(400);
        next(error);
    }
});
exports.getImages = getImages;
