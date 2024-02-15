import express from "express";

import {
  AllUser,
  CreateUser,
  DeleteUser,
  GetUsers,
  LonginUser,
  UpdateUser,
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
import {
  deviceSold,
  AllDeviceSold,
  SoldByDate,
} from "../controllers/sold.controller";
import { initController } from "../controllers/init.controller";
import {
  AllClients,
  CreateClients,
  GetClient,
} from "../controllers/client.controller";
import { SendEmail } from "../controllers/email.controller";
import { profit } from "../controllers/profit.controller";

const router = express.Router();

//Rotas get
router.get("/", initController);
router.get("/users", AllUser);
router.get("/devices", AllDevice);
router.get("/accessories", AllAccessories);
router.get("/clients", AllClients);
router.get("/sold", AllDeviceSold);
//Rotas get by id
router.get("/accessories/:id", GetAccessories);
router.get("/users/:id", GetUsers);
router.get("/devices/:id", GetDevice);
router.get("/clients/:id", GetClient);
router.get("/profit/:id", profit);
router.get("/soldByDate/:id", SoldByDate);
//Rotas post
router.post("/clients", CreateClients);
router.post("/sendEmail", SendEmail);
router.post("/device", CreateDevice);
router.post("/accessories", CreateAccessories);
router.post("/users", CreateUser);
router.post("/login", LonginUser);
router.post("/deviceSold/:id", deviceSold);
router.post("/accessoriesSold/", accessoriesSold);
//Rotas delete
router.delete("/deviceSold/:id", deviceSold);
router.delete("/devices/:id", DeleteDevice);
router.delete("/users/:id", DeleteUser);
router.delete("/accessories/:id", DeleteAccessories);
//Route put
router.put("/devices/:id", UpdateDevice);
router.put("/accessories/:id", UpdateAccessories);
router.put("/users/:id", UpdateUser);

export default router;
