import express from "express";
import { getImages } from "../controllers/imagesController";
import imageValidation from "../middlewares/validationMW";

const router = express.Router();

router.get("/images", imageValidation, getImages);

export default router;
