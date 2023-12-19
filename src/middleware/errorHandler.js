import { EError } from "../enums/EError.js";

export const errorHandler = (error, req, res, next) => {
    console.log(error.code);
    switch (error.code){
        case EError.DATABASE_ERROR:
            res.json({status:"Error DB", error: error.message, cause: error.cause});
            break;

        case EError.INVALID_BODY_JSON:
            res.json({status:"Error Invalid Body Json", error: error.message, cause: error.cause});
            break;

        case EError.AUTH_ERROR:
            res.json({status:"Error Auth", error: error.message, cause: error.cause});
            break;

        case EError.INVALID_PARAM:
            res.json({status:"Error Invalid Param", error: error.message, cause: error.cause});
            break;

        default:
            res.json({status:"Error", error: error.message});
            break;
    };
};