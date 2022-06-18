import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";

import imagesRouter from "./routes/imagesRouter";
import errorMW from "./middlewares/errorMW";
import notFoundMW from "./middlewares/notFoundMW";

dotenv.config();
const port = process.env.PORT || 5000;

const app: Application = express();

app.use(cors());
app.use(express.static("assets"));
app.use(imagesRouter);
app.use(notFoundMW);
app.use(errorMW);

app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;
