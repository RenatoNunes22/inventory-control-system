import { Request, Response } from "express";
import { dbClient } from "../db";
import dotenv from "dotenv";
import { Device } from "../models/deviceModel";
import { existClient } from "./client.controller";
import { SoldDevice } from "../models/soldDevice";

dotenv.config();

const { DB_NAME } = process.env;

if (!DB_NAME) {
  throw new Error("DB_NAME is not defined");
}

export const CreateDevice = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      name,
      value,
      type,
      seriesNumber,
      status,
      stateBattery,
      maxDiscountAmout,
    } = req.body as Device;

    const device = {
      name,
      value,
      type,
      seriesNumber,
      status,
      stateBattery,
      maxDiscountAmout,
    };

    const deviceExists = await checkDevice(seriesNumber);

    if (deviceExists.length > 0) {
      res.send("Produto já existe!");
    } else {
      dbClient
        .db(DB_NAME)
        .collection("devices")
        .insertOne({ ...device, createdAt: new Date().toISOString() })
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

export const DeleteDevice = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await dbClient
      .db(DB_NAME)
      .collection("devices")
      .deleteMany({ seriesNumber: id });
  } catch (error) {
    console.error("Erro ao deletar aparelho", error);
    res.status(500).json({ error: "Erro interno ao deletar aparelho" });
  }
};

export const deviceSold = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { soldValue, seriesNumber, expenses, fees, formPayment, client } =
    req.body as SoldDevice;

  try {
    const sold = await dbClient
      .db(DB_NAME)
      .collection("devices")
      .aggregate([
        {
          $match: {
            seriesNumber: id,
          },
        },
      ])
      .toArray();

    if (await existClient(client)) {
      const clientResult = await existClient(client);
      clientResult[0].products.push(sold[0].name);
      await dbClient
        .db(DB_NAME)
        .collection("clients")
        .findOneAndUpdate({ cpf: client }, { $set: clientResult[0] });
    }

    console.log(sold[0].value);
    console.log(soldValue);
    console.log(expenses);
    console.log(fees);

    await dbClient
      .db(DB_NAME)
      .collection("sold")
      .insertOne({
        name: sold[0].name,
        soldValue: soldValue,
        seriesNumber: seriesNumber,
        expenses: expenses,
        fees: fees,
        formPayment: formPayment,
        profit: soldValue - sold[0].value - expenses - fees,
        createdAt: sold[0].createdAt,
        soldAt: new Date().toISOString(),
        client: client,
      });

    await dbClient
      .db(DB_NAME)
      .collection("devices")
      .deleteMany({ seriesNumber: id });

    res.status(200).send("Aparelho vendido com sucesso!");
  } catch (error) {
    console.error("Erro ao deletar aparelho vendido", error);
    res.status(500).json({ error: "Erro interno ao deletar aparelho vendido" });
  }
};

export const AllDevice = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await dbClient
      .db(DB_NAME)
      .collection("devices")
      .find()
      .toArray();
    res.json(users);
  } catch (error) {
    console.error("Erro ao buscar aparelhos", error);
    res.status(500).json({ error: "Erro interno ao buscar aparelhos" });
  }
};

export const checkDevice = async (Mei: string) => {
  return await dbClient
    .db(DB_NAME)
    .collection("devices")
    .aggregate([
      {
        $match: {
          seriesNumber: Mei,
        },
      },
    ])
    .toArray();
};
