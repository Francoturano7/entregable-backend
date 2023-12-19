import { Router } from "express";
import { CartsController } from "../controller/carts.controller.js";

export const cartsRouter = Router();

// Obtener Carrito
cartsRouter.get("/", CartsController.getCarts);

// Obtener Carrito por ID
cartsRouter.get("/:cid", CartsController.getCartById);

// Crear Carrito
cartsRouter.post("/", CartsController.createCart);

// Agregar producto en carrito
cartsRouter.post("/:cid/product/:pid", CartsController.addProductInCart);

// Eliminar Producto de un carrito
cartsRouter.delete("/:cid/product/:pid", CartsController.deteleProduct);

// Eliminar un Carrito
cartsRouter.delete("/:cid", CartsController.deleteCart);

// Actualizar Cantidad de Productos en el Carrito
cartsRouter.put("/:cid/product/:pid", CartsController.addProductInCart);

// Crear Ticket
cartsRouter.post("/:cid/purchase", CartsController.purchaseCart);