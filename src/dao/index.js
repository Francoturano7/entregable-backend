import { ProductsManagerMongo } from "./mongo/productsManagerMongo.js";
import { CartsManagerMongo } from "./mongo/cartsManagerMongo.js";
import { UsersManagerMongo } from "./mongo/usersManagerMongo.js";
import { TicketsManagerMongo } from "./mongo/ticketsManagerMongo.js";

// Capa de persistencia

export const cartsDao = new CartsManagerMongo();
export const productsDao = new ProductsManagerMongo();
export const ticketsDao = new TicketsManagerMongo()
export const usersService = new UsersManagerMongo();

