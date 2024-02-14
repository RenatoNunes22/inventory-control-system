import { Request, Response } from "express";
import { dbClient } from "../db";
import dotenv from "dotenv";
import { Accessories } from "../models/acessoriesModel";

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
    const {
      name,
      inputValue,
      outputValue,
      type,
      status,
      quantity,
      maxDiscountAmout,
    } = req.body as Accessories;

    const Accessories = {
      name,
      inputValue,
      outputValue,
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

export const UpdateAccessories = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    inputValue,
    outputValue,
    type,
    quantity,
    status,
    maxDiscountAmout,
    createdAt,
  } = req.body;

  try {
    const accessories = {
      name,
      inputValue,
      outputValue,
      type,
      quantity,
      status,
      maxDiscountAmout,
      createdAt,
    };

    await dbClient
      .db(DB_NAME)
      .collection("accessories")
      .findOneAndUpdate({ name: id }, { $set: accessories });
    res.status(200).send("Produto atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar aparelho", error);
    res.status(500).json({ error: "Erro interno ao atualizar aparelho" });
  }
};

export const DeleteAccessories = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await dbClient
      .db(DB_NAME)
      .collection("accessories")
      .deleteMany({ name: id });

    res.send("Produto deletado com sucesso!");
  } catch (error) {
    console.error("Erro ao deletar acessorio", error);
    res.status(500).json({ error: "Erro interno ao deletar acessorio" });
  }
};

export const accessoriesSold = async (req: Request, res: Response) => {
  const { name, value, formPayment, quantity, type } = req.body;

  const Accessories = {
    name,
    value,
    formPayment,
    quantity,
    type,
  };

  try {
    const accessorie = await dbClient
      .db(DB_NAME)
      .collection("accessories")
      .aggregate([
        {
          $match: {
            name: name,
          },
        },
      ])
      .toArray();

    if (accessorie.length === 0) {
      res.status(200).send("Acessorio não encontrado!");
    } else {
      if (Number(accessorie[0].quantity) >= quantity) {
        await dbClient
          .db(DB_NAME)
          .collection("accessories")
          .findOneAndUpdate(
            { name: accessorie[0].name },
            { $set: { quantity: Number(accessorie[0].quantity) - quantity } }
          );

        if (accessorie[0].quantity - quantity === 0) {
          await dbClient
            .db(DB_NAME)
            .collection("accessories")
            .deleteMany({ name: accessorie[0].name });
        }

        await dbClient
          .db(DB_NAME)
          .collection("sold")
          .insertOne({
            ...Accessories,
            profit: value - accessorie[0].inputValue * quantity,
            createdAt: accessorie[0].createdAt,
            soldAt: new Date().toISOString(),
          });
      } else {
        res.status(200).send("Quantidade insuficiente!");
      }

      res.status(200).send("Acessório vendido com sucesso!");
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
