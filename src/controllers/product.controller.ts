import { Request, Response } from "express";
import { Product } from "../models/productModel";
import { dbClient } from "../db";
import dotenv from "dotenv";

dotenv.config();

const { DB_NAME } = process.env;

if (!DB_NAME) {
  throw new Error("DB_NAME is not defined");
}

export const CreateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, value, type, numberMei, state, usageTime } =
      req.body as Product;

    const product = {
      name,
      value,
      type,
      numberMei,
      state,
      usageTime,
    };

    const productExists = await checkProduct(numberMei);

    if (productExists.length > 0) {
      res.send("Produto já existe!");
    } else {
      dbClient
        .db(DB_NAME)
        .collection("products")
        .insertOne({ ...product, createdAt: new Date().toISOString() })
        .then(() => {
          res.json("Produto inserido com sucesso!");
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  } catch (error) {
    console.error("Erro ao inserir produtor", error);
    res.status(500).json({ error: "Erro interno ao inserir produto" });
  }
};

export const DeleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await dbClient
      .db(DB_NAME)
      .collection("products")
      .deleteMany({ numberMei: id });
  } catch (error) {
    console.error("Erro ao deletar produtos", error);
    res.status(500).json({ error: "Erro interno ao deletarS produtos" });
  }
};

export const productSold = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const sold = await dbClient
      .db(DB_NAME)
      .collection("products")
      .aggregate([
        {
          $match: {
            numberMei: id,
          },
        },
      ])
      .toArray();

    await dbClient.db(DB_NAME).collection("sold").insertOne(sold[0]);

    await dbClient
      .db(DB_NAME)
      .collection("products")
      .deleteMany({ numberMei: id });

    res.status(200).send("Produto vendido");
  } catch (error) {
    console.error("Erro ao deletar produto vendido", error);
    res.status(500).json({ error: "Erro interno ao deletar produto vendido" });
  }
};

export const AllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await dbClient
      .db(DB_NAME)
      .collection("products")
      .find()
      .toArray();
    res.json(users);
  } catch (error) {
    console.error("Erro ao buscar produtos", error);
    res.status(500).json({ error: "Erro interno ao buscar produtos" });
  }
};

export const checkProduct = async (Mei: string) => {
  return await dbClient
    .db(DB_NAME)
    .collection("products")
    .aggregate([
      {
        $match: {
          numberMei: Mei,
        },
      },
    ])
    .toArray();
};
