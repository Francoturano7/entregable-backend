import { productsDao } from "../dao/index.js";

export class ProductsService{

    // Obtener Productos
    static getProducts(){
        return productsDao.getProducts();
    };

    // Crear Productos
    static createProducts(productInfo){
        return productsDao.createProduct(productInfo);
    };

    // Obtener Producto Por ID
    static getProductById(){
        return productsDao.getProductById();
    };

    // Obtener Productos con Paginate
    static getProductsPaginate(query, options){
        return productsDao.getProductsPaginate(query, options);
    };

    // Modificar stock de un producto
    static updatedProduct(productId, newStock){
        return productsDao.updateProductStock(productId, newStock);
    };
}