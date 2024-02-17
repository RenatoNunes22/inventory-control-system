import { Request, Response } from "express";
import { dbClient } from "../db";
import dotenv from "dotenv";
import { Device } from "../models/deviceModel";
import { existClient } from "./client.controller";
import { SoldDevice } from "../models/soldDevice";
import { formatterData } from "../utils/formatterData";
import { MatchStage } from "../models/matchStage";

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
      inputValue,
      outputValue,
      type,
      seriesNumber,
      status,
      stateBattery,
      maxDiscountAmout,
    } = req.body as Device;

    const device = {
      name,
      inputValue,
      outputValue,
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

export const DeviceByDate = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const device = await dbClient
      .db(DB_NAME)
      .collection("device")
      .aggregate([
        {
          $match: {
            createdAt: {
              $gte: `${id}T00:00:00.000Z`,
              $lt: `${id}T23:59:59.999Z`,
            },
          },
        },
      ])
      .toArray();

    res.status(200).json(device);
  } catch (error) {
    console.error("Erro ao listar aparelhos", error);
    res.status(500).json({ error: "Erro interno ao listar aparelhos" });
  }
};

export const GetDevice = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const device = await dbClient
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
    res.status(200).json(device);
  } catch (error) {
    console.error("Erro ao encontrar aparelho", error);
    res.status(500).json({ error: "Erro interno ao encontrar aparelho" });
  }
};

export const DeleteDevice = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await dbClient
      .db(DB_NAME)
      .collection("devices")
      .deleteMany({ seriesNumber: id });

    res.send("Produto deletado com sucesso!");
  } catch (error) {
    console.error("Erro ao deletar aparelho", error);
    res.status(500).json({ error: "Erro interno ao deletar aparelho" });
  }
};

export const UpdateDevice = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    inputValue,
    outputValue,
    type,
    seriesNumber,
    status,
    stateBattery,
    maxDiscountAmout,
    createdAt,
  } = req.body;

  try {
    const device = {
      name,
      inputValue,
      outputValue,
      type,
      seriesNumber,
      status,
      stateBattery,
      maxDiscountAmout,
      createdAt,
    };

    await dbClient
      .db(DB_NAME)
      .collection("devices")
      .findOneAndUpdate({ seriesNumber: id }, { $set: device });
    res.status(200).send("Produto atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar aparelho", error);
    res.status(500).json({ error: "Erro interno ao atualizar aparelho" });
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

export const filterDevice = async (req: Request, res: Response) => {
  const name = req.query.name;
  const numberSerie = req.query.numberSerie;
  const date = req.query.date;

  console.log(name, numberSerie, date);

  const pipeline = [];

  if (name !== undefined || numberSerie !== undefined || date !== undefined) {
    const matchStage: MatchStage = {};

    if (name !== undefined) {
      matchStage["name"] = name;
    }

    if (numberSerie !== undefined) {
      matchStage["seriesNumber"] = numberSerie;
    }

    if (date !== undefined) {
      matchStage["createdAt"] = { $regex: date };
    }

    pipeline.push({ $match: matchStage });
  }

  try {
    const device = await dbClient
      .db(DB_NAME)
      .collection("devices")
      .aggregate(pipeline)
      .toArray();

    res.status(200).json(device);
  } catch (error) {
    console.error("Erro ao encontrar aparelho", error);
    res.status(500).json({ error: "Erro interno ao encontrar aparelho" });
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
