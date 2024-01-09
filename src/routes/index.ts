import express from "express";

import {
  AllUser,
  CreateUser,
  LonginUser,
  UpadtaUser,
} from "../controllers/user.controller";
import { checkToken } from "../middlewares/checkToken";
import {
  AllDevice,
  CreateDevice,
  deviceSold,
} from "../controllers/device.controller";
import {
  CreateAccessories,
  accessoriesSold,
} from "../controllers/accessories.controller";

const router = express.Router();

//Rotas get
router.get("/users", checkToken, AllUser);
router.get("/devices", checkToken, AllDevice);
router.get("/accessories", checkToken, AllDevice);
//Rotas post
router.post("/device", CreateDevice);
router.post("/accessories", CreateAccessories);
router.post("/users", CreateUser);
router.post("/login", LonginUser);
//Rotas delete
router.delete("/deviceSold/:id", deviceSold); //nome do acessorio-nomedocliente (quantidade no corpo da requisição)
//Route put
router.put("/deviceSold/:id", deviceSold); //nome do acessorio-nomedocliente (quantidade no corpo da requisição)
router.put("/accessoriesSold/:id", accessoriesSold); //nome do acessorio-nomedocliente (quantidade no corpo da requisição)
router.put("/user/:id", UpadtaUser);

export default router;
