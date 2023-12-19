import winston from "winston";
import { __dirname } from "../utils.js";
import path from "path";
import { config } from "../config/config.js";

const currentEnv = config.server.env;

// Winston Personalizado
const customLevels = {
    levels: { error: 0, advertencia: 1, informativo: 2, debbug: 3},
    color:{ error: "red", advertencia: "yellow", informativo: "blue", debbug: "green"}
};

// Logger para Dev
winston.addColors(customLevels.color)
const devLogger = winston.createLogger({
    levels: customLevels.levels,
    transports: new winston.transports.Console({level: "debbug"})
});

// Logger para Prod
winston.addColors(customLevels.color)
const prodLogger = winston.createLogger({
    levels: customLevels.levels,
    transports: new winston.transports.File({
        filename: path.join(__dirname,"/logs/prod.logs"), level:"advertencia"
    })
});

export let logger;
(currentEnv === "development") ? logger = devLogger : logger = prodLogger;

