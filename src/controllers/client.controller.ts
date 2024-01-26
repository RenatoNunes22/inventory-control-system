import { Request, Response } from "express";
import { dbClient } from "../db";
import dotenv from "dotenv";
import { Client } from "../models/clientModel";

dotenv.config();

const { DB_NAME } = process.env;

if (!DB_NAME) {
  throw new Error("DB_NAME is not defined");
}

export const CreateClients = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, cpf, name, dn, telephone, products } = req.body as Client;

    const Clients = {
      email,
      cpf,
      name,
      dn,
      telephone,
      products,
    };

    if (await existClient(cpf)) {
      res.send("Cliente já existe!");
    } else {
      dbClient
        .db(DB_NAME)
        .collection("clients")
        .insertOne({ ...Clients, createdAt: new Date().toISOString() })
        .then(() => {
          res.json("Produto inserido com sucesso!");
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  } catch (error) {
    console.error("Erro ao inserir produtor", error);
    res.status(500).json({ error: "Erro interno ao inserir cliente" });
  }
};

export const DeleteClient = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await dbClient.db(DB_NAME).collection("clients").deleteMany({ cpf: id });
  } catch (error) {
    console.error("Erro ao deletar cliente", error);
    res.status(500).json({ error: "Erro interno ao deletar cliente" });
  }
};

export const GetClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await dbClient
      .db(DB_NAME)
      .collection("clients")
      .aggregate([
        {
          $match: {
            cpf: id,
          },
        },
      ])
      .toArray();
    res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao encontrar usuario", error);
    res.status(500).json({ error: "Erro interno ao encontrar usuario" });
  }
};

export const AllClients = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await dbClient
      .db(DB_NAME)
      .collection("clients")
      .find()
      .toArray();
    res.json(users);
  } catch (error) {
    console.error("Erro ao buscar clientes", error);
    res.status(500).json({ error: "Erro interno ao buscar clientes" });
  }
};

export const existClient = async (client: string) => {
  return await dbClient
    .db(DB_NAME)
    .collection("clients")
    .find({ cpf: client })
    .toArray();
};
