import { Request, Response } from "express";
import { dbClient } from "../db";
import dotenv from "dotenv";
import { Device } from "../models/deviceModel";
import { existClient } from "./client.controller";
import { SoldDevice } from "../models/soldDevice";
import { formatterData } from "../utils/formatterData";

dotenv.config();

const { DB_NAME } = process.env;

if (!DB_NAME) {
  throw new Error("DB_NAME is not defined");
}

export const deviceSold = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { soldValue, seriesNumber, expenses, fees, formPayment, client, seller } =
    req.body as SoldDevice;

  try {

    const soldSeller = await dbClient
    .db(DB_NAME)
    .collection("users")
    .aggregate([
      {
        $match: {
          cpf: seller,
        },
      },
    ])
    .toArray();


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
        soldAt: formatterData,
        client: client,
        seller: soldSeller[0].cpf
      });

      var newArraySold: any[] = soldSeller[0].productSold

    await dbClient
      .db(DB_NAME)
      .collection("users")
      .findOneAndUpdate({ cpf: seller }, { $set: { productSold:  [...newArraySold, sold[0]]}});



    // await dbClient
    //   .db(DB_NAME)
    //   .collection("devices")
    //   .deleteMany({ seriesNumber: id });

    res.status(200).send("Aparelho vendido com sucesso!");
  } catch (error) {
    console.error("Erro ao deletar aparelho vendido", error);
    res.status(500).json({ error: "Erro interno ao deletar aparelho vendido" });
  }
};

