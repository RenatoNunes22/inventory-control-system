import { Request, Response } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dbClient } from "../db";
import { User } from "../models/userModel";
import { Login } from "../models/loginModel";

dotenv.config();

const { JWT_SECRET, DB_NAME } = process.env;

if (!JWT_SECRET) {
  throw new Error("Token is not defined");
}

if (!DB_NAME) {
  throw new Error("DB_NAME is not defined");
}

//Função para criar um novo usuário
export const CreateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, cpf, name, dn, telephone, role, password } =
      req.body as User;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      email,
      cpf,
      name,
      dn,
      telephone,
      role,
      password: hashedPassword,
      productSold: []
    };
    const token = jwt.sign({ user }, JWT_SECRET, {
      expiresIn: "1d",
    });

    const userExists = await checkUserCPF(cpf);

    if (userExists.length > 0) {
      res.send("Usuário já existe!");
    } else {
      dbClient
        .db(DB_NAME)
        .collection("users")
        .insertOne({ ...user, token, createdAt: new Date().toISOString() })
        .then(() => {
          res.json("Usuário criado com sucesso!");
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  } catch (error) {
    console.error("Erro ao criar usuário", error);
    res.status(500).json({ error: "Erro interno ao criar usuário" });
  }
};

//Função para realizar o login
export const LonginUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body as Login;
    const user = await checkUserEmail(email);
    await bcrypt.compare(password, user[0].password).then((result) => {
      if (!result) {
        res.status(401).json({ error: "Credenciais inválidas" });
      } else {
        res.status(200).json({ role: user[0].role, token: user[0].token });
      }
    });
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const GetUsers = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await dbClient
      .db(DB_NAME)
      .collection("users")
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

//Função para buscar todos os usuários
export const AllUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await dbClient
      .db(DB_NAME)
      .collection("users")
      .find()
      .toArray();
    res.json(users);
  } catch (error) {
    console.error("Erro ao buscar usuário", error);
    res.status(500).json({ error: "Erro interno ao buscar usuários" });
  }
};

export const UpadtaUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await dbClient
      .db(DB_NAME)
      .collection("users")
      .findOneAndUpdate({ cpf: id }, { $set: req.body });
      res.send("Usuário atualizado com sucesso!")
  } catch (error) {
    console.error("Erro ao atualizar usuário", error);
    res.status(500).json({ error: "Erro interno ao atualizar usuário" });
  }
};

export const DeleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await dbClient
      .db(DB_NAME)
      .collection("devices")
      .deleteMany({ cpf: id });
      
      res.send("Usuario deletado com sucesso!")
  } catch (error) {
    console.error("Erro ao deletar aparelho", error);
    res.status(500).json({ error: "Erro interno ao deletar aparelho" });
  }
};



export const checkUserCPF = async (cpf: string) => {
  return await dbClient
    .db(DB_NAME)
    .collection("users")
    .aggregate([
      {
        $match: {
          cpf: cpf,
        },
      },
    ])
    .toArray();
};

export const checkUserEmail = async (email: string) => {
  return await dbClient
    .db(DB_NAME)
    .collection("users")
    .aggregate([
      {
        $match: {
          email: email,
        },
      },
    ])
    .toArray();
};
