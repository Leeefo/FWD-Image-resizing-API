import { Request, Response, NextFunction } from "express";

const notFoundMW = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Not found" });
  next();
};

export default notFoundMW;
