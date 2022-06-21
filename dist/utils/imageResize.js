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
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const imageResize = ({ width, height, fit, position }, { filename, thumbName, thumbsFolder }) => __awaiter(void 0, void 0, void 0, function* () {
    const fullPath = path_1.default.join(thumbsFolder, thumbName);
    const outputInfo = yield (0, sharp_1.default)(path_1.default.join("assets", "full", filename))
        .resize(parseInt(width), parseInt(height), {
        fit,
        position
    })
        .toFile(fullPath);
    return outputInfo;
});
exports.default = imageResize;
