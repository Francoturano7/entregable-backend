import { Router } from "express";
import { ProductsController } from "../controller/products.controller.js";
import { checkRole, isAuth } from "../middleware/auth.js";
// Con checkRole, autoriza al usuario a crear productos si tiene el rol

export const productsRouter = Router();

// Obtener Productos
productsRouter.get("/", ProductsController.getProducts);

// Crear Productos
productsRouter.post("/", isAuth, checkRole(["admin"]),ProductsController.createProduct);

// Obtener Producto por ID
productsRouter.get("/:pid", ProductsController.getProductById);


