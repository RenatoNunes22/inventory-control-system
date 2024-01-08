import express from "express";
import {
  AllProducts,
  CreateProduct,
  productSold,
} from "../controllers/product.controller";
import {
  AllUser,
  CreateUser,
  LonginUser,
} from "../controllers/user.controller";
import { checkToken } from "../middlewares/checkToken";

const router = express.Router();

//Rotas get
router.get("/products");
router.get("/users", checkToken, AllUser);
router.get("/products", checkToken, AllProducts);
//Rotas post
router.post("/product", CreateProduct);
router.post("/users", CreateUser);
router.post("/login", LonginUser);
//Rotas delete
router.delete("/sold/:id", productSold);

export default router;
