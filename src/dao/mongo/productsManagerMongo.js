import { productsModel } from "../models/products.models.js"
import { CustomError } from "../../service/errors/customError.service.js";
import { EError } from "../../enums/EError.js";
import { logger } from "../../helpers/logger.js"

export class ProductsManagerMongo{
    constructor(){
        this.model = productsModel;
    };

    // Obtener Productos
    async getProducts(){
        try {
            const result = await this.model.find().lean();
            return result;
        } catch (error) {
            logger.error("getProducts: ", error.message);
            throw new Error("Se produjo un error al obtener los productos");
        }
    };

    // Crear Producto
    async createProduct(productInfo){
        try {
            const result = await this.model.create(productInfo);
            return result;
        } catch (error) {
            // console.log("createProduct: ", error.message); //Error de Mongoose
            // throw new Error("Se produjo un error al crear el producto");
            // throw error;
            CustomError.createError({
                    name:"Create Product Error",
                    cause: error.message,
                    message:"Datos invalidos para crear el producto",
                    errorCode: EError.INVALID_BODY_JSON
            });
        };
    };

    // Obtener Productos con Paginate
    async getProductsPaginate(query, options){
        try {
            const result = await this.model.paginate(query, options);
            return result;
        } catch (error) {
            logger.error("getProducts: ", error.message);
            throw new Error("Se produjo un error al mostrar los producto");
        }
    };

    // Actualizar Stock de Producto
    async updateProductStock(productId, newStock){
        try {
            const updatedProduct = await this.model.findByIdAndUpdate(productId, { stock: newStock }, { new: true });
            return updatedProduct;
        } catch (error) {
            logger.error("updatedProduct: ", error.message);
            throw new Error("Se produjo un error al actualizar el stock"); 
        }
    };

    async getProductById(productId){};

    async deleteProduct(productId){};
}