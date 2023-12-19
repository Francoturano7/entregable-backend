import mongoose from "mongoose";
import { config } from './config.js'
import { logger } from "../helpers/logger.js";

export const connectDB = async() => {
    try {
        await mongoose.connect(config.mongo.url);
        logger.informativo("Base de Datos Conectada");
    } catch (error) {
        logger.error(`Error al conectar la base de datos: ${error.message}`);
    }
};