import { Request, Response } from "express";
import { dbClient } from "../db";
import dotenv from "dotenv";

dotenv.config();

const { DB_NAME } = process.env;

if (!DB_NAME) {
  throw new Error("DB_NAME is not defined");
}

export const profit = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const dailyProfit = await dbClient
      .db(DB_NAME)
      .collection("sold")
      .aggregate([
        {
          $match: {
            soldAt: {
              $gte: `${id}T00:00:00.000Z`,
              $lt: `${id}T23:59:59.999Z`,
            },
          },
        },
        {
          $group: {
            _id: null,
            profit: {
              $sum: "$profit",
            },
            total: {
              $sum: "$soldValue",
            },
            count: {
              $sum: 1,
            },
          },
        },
        {
          $project: {
            _id: 0,
            profit: 1,
            total: 1,
            count: 1,
          },
        },
      ])
      .toArray();

    res.json(dailyProfit);
  } catch (error) {
    console.error("Erro ao calcular lucro", error);
    res.status(500).json({ error: "Erro interno ao calcular lucro" });
  }
};
