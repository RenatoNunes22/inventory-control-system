import express from "express";

import {
  AllUser,
  CreateUser,
  GetUsers,
  LonginUser,
  UpadtaUser,
} from "../controllers/user.controller";
import { checkToken } from "../middlewares/checkToken";
import {
  AllDevice,
  CreateDevice,
  DeleteDevice,
  GetDevice,
  UpdateDevice,
} from "../controllers/device.controller";
import {
  AllAccessories,
  CreateAccessories,
  DeleteAccessories,
  GetAccessories,
  UpdateAccessories,
  accessoriesSold,
} from "../controllers/accessories.controller";
import { deviceSold } from "../controllers/sold.controller";

const router = express.Router();

//Rotas get
router.get("/users", AllUser);
router.get("/devices", AllDevice);
router.get("/accessories", AllAccessories);
router.get("/accessories/:id", GetAccessories);
router.get("/users/:id", GetUsers);
router.get("/devices/:id", GetDevice);
//Rotas post
router.post("/device", CreateDevice);
router.post("/accessories", CreateAccessories);
router.post("/users", CreateUser);
router.post("/login", LonginUser);
//Rotas delete
router.delete("/deviceSold/:id", deviceSold); //nome do acessorio-nomedocliente (quantidade no corpo da requisição)
router.delete("/devices/:id", DeleteDevice)
router.delete("/users/:id", DeleteDevice)
router.delete("/accessories/:id", DeleteAccessories)
//Route put
router.put("/devices/:id", UpdateDevice);
router.put("/accessories/:id", UpdateAccessories);
router.put("/deviceSold/:id", deviceSold); //nome do acessorio-nomedocliente (quantidade no corpo da requisição)
router.put("/accessoriesSold/:id", accessoriesSold); //nome do acessorio-nomedocliente (quantidade no corpo da requisição)
router.put("/users/:id", UpadtaUser);

export default router;
