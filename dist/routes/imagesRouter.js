"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imagesController_1 = require("../controllers/imagesController");
const validationMW_1 = __importDefault(require("../middlewares/validationMW"));
const router = express_1.default.Router();
router.get("/images", validationMW_1.default, imagesController_1.getImages);
exports.default = router;
