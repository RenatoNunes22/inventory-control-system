import { Request, Response } from "express";

export const initController = (req: Request, res: Response): void => {
  res.json({ message: "Bem vindo ao API" });
};
