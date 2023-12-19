// Importar Capa de Servicio
import { ProductsService } from "../service/products.service.js";
import { EError } from "../enums/EError.js";
import { CustomError } from "../service/errors/customError.service.js";
import { productCreateError } from "../service/errors/productCreateError.service.js";

export class ProductsController{
    // Obtener Productos
    static getProducts = async (req, res) => {
        const result = await ProductsService.getProducts()
        res.json({message: "Lista de productos", data: result});
    };

    // Crear Productos
    static createProduct = async (req, res, next)=>{
        try {
            const productInfo = req.body;
            const result = await ProductsService.createProducts(productInfo);
            res.json({status:"success", result});
        } catch (error) {
            // res.json({status:"error", message:error.message, cause: error.cause});
            next(error);
        };
    };

    // Obtener Producto por ID
    static getProductById = async(req,res)=>{
        try {
            const productId = parseInt(req.params.pid);
            const product = await ProductsService.getProductById(productId);
            res.json({message:"endpoint para obtener un producto", data:product});
        } catch (error) {
            res.json({status:"error",message:error.message});
        }
    };

    // Modificar stock de Producto
    static updatedProduct = async (req, res) => {
        try {
            const productId = parseInt(req.params.pid);
            const newStock = req.body;
            const result = await ProductsService.updatedProduct(productId, newStock);

            res.json({status:"success", result});            
        } catch (error) {
            res.json({status:"error",message:error.message});
        };
    };
    
};