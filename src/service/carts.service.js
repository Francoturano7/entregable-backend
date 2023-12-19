import { cartsDao } from "../dao/index.js";

export class CartsService{
    // Obtener Carritos
    static getCarts(){
        return cartsDao.getCarts();
    };

    // Obtener Carrito por ID
    static getCartById(cartId){
        return cartsDao.getCartById(cartId);
    };

    // Crear Carrito
    static createCart(){
        return cartsDao.createCart();
    };
    // Agregar producto en carrito
    static addProductInCart(cartId, productId){
        return cartsDao.addProductInCart(cartId, productId);
    };

    // Eliminar Producto de un carrito
    static deleteProduct(cartId, productId){
        return cartsDao.deleteProduct(cartId, productId);
    };

    // Eliminar un Carrito
    static deleteCart(cartId){
        return cartsDao.deleteCart(cartId);
    };

    // Actualizar Cantidad de Productos en el Carrito
    static updateProductCart(cartId, productId, newQuantity){
        return cartsDao.updateProductCart(cartId, productId, newQuantity);
    };
}