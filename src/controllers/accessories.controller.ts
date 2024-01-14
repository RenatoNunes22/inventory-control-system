import { Request, Response } from "express";
import { dbClient } from "../db";
import dotenv from "dotenv";
import { Accessories } from "../models/acessoriesModel";
import { CreateClients, existClient } from "./client.controller";

dotenv.config();

const { DB_NAME } = process.env;

if (!DB_NAME) {
  throw new Error("DB_NAME is not defined");
}

export const CreateAccessories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, value, type, status, quantity, maxDiscountAmout } =
      req.body as Accessories;

    const Accessories = {
      name,
      value,
      type,
      status,
      quantity,
      maxDiscountAmout,
    };

    dbClient
      .db(DB_NAME)
      .collection("accessories")
      .insertOne({ ...Accessories, createdAt: new Date().toISOString() })
      .then(() => {
        res.json("Produto inserido com sucesso!");
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (error) {
    console.error("Erro ao inserir produtor", error);
    res.status(500).json({ error: "Erro interno ao inserir produto" });
  }
};

export const GetAccessories = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const device = await dbClient
      .db(DB_NAME)
      .collection("accessories")
      .aggregate([
        {
          $match: {
            name: id,
          },
        },
      ])
      .toArray();
    res.status(200).json(device);
  } catch (error) {
    console.error("Erro ao encontrar acessorio", error);
    res.status(500).json({ error: "Erro interno ao encontrar acessorio" });
  }
};

export const DeleteAccessories = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await dbClient
      .db(DB_NAME)
      .collection("accessories")
      .deleteMany({ seriesNumber: id });
  } catch (error) {
    console.error("Erro ao deletar acessorio", error);
    res.status(500).json({ error: "Erro interno ao deletar acessorio" });
  }
};

export const accessoriesSold = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, value, type, status } = req.body as Accessories;

  const Accessories = {
    name,
    value,
    type,
    status,
  };

  const splitResult = id.split("-");

  try {
    if (splitResult.length === 2) {
      const accessoryName = splitResult[0];
      const client = splitResult[1];

      const sold = await dbClient
        .db(DB_NAME)
        .collection("accessories")
        .aggregate([
          {
            $match: {
              name: accessoryName,
            },
          },
        ])
        .toArray();

      const cretedAt = await dbClient
        .db(DB_NAME)
        .collection("accessories")
        .aggregate([
          {
            $match: {
              name: accessoryName,
            },
          },
        ])
        .toArray();

      if (sold.length === 0) {
        res.status(200).send("Acessorio não encontrado!");
      } else {
        if (await existClient(client)) {
          const clientResult = await existClient(client);
          clientResult[0].products.push(accessoryName);

          await dbClient
            .db(DB_NAME)
            .collection("clients")
            .findOneAndUpdate({ cpf: client }, { $set: clientResult[0] });
        }

        await dbClient
          .db(DB_NAME)
          .collection("sold")
          .insertOne({
            ...Accessories,
            createdAt: cretedAt[0].createdAt,
            soldAt: new Date().toISOString(),
            client: client,
          });

        await dbClient
          .db(DB_NAME)
          .collection("accessories")
          .findOneAndUpdate({ name: accessoryName }, { $set: req.body });

        res.status(200).send("Aparelho vendido com sucesso!");
      }
    }
  } catch (error) {
    console.error("Erro ao deletar aparelho vendido", error);
    res.status(500).json({ error: "Erro interno ao deletar aparelho vendido" });
  }
};

export const AllAccessories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await dbClient
      .db(DB_NAME)
      .collection("accessories")
      .find()
      .toArray();
    res.json(users);
  } catch (error) {
    console.error("Erro ao buscar aparelhos", error);
    res.status(500).json({ error: "Erro interno ao buscar aparelhos" });
  }
};
