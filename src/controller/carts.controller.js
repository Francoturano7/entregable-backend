// Importar Capa de Servicio
import { CartsService } from "../service/carts.service.js";
import { ProductsService } from "../service/products.service.js";
import { TicketsService } from "../service/tickets.service.js"

import {v4 as uuidv4} from 'uuid';


export class CartsController{
    // Obtener Carritos
    static getCarts = async (req, res) => {
        try {
            const carts = await CartsService.getCarts();
            res.json({data: carts});
        } catch (error) {
            res.json({error:error.message});
        }
    };

    // Obtener Carrito por ID
    static getCartById = async (req, res) => {
        try {
            const cartId = req.params.cid;
            const cart = await CartsService.getCartById(cartId);
            res.json({status:"success", data: cart});
        } catch (error) {
            res.json({error:error.message});
        }
    };

    // Crear Carrito
    static createCart = async (req, res) => {
        try {
            const cartCreated = await CartsService.createCart();
            res.json({status:"success",data: cartCreated, result: "Carrito creado"});
        } catch (error) {
            res.json({status:"error",error:error.message});
        }
    };

    // Agregar producto en carrito
    static addProductInCart = async (req, res) => {
        try {
            const {cid:cartId, pid:productId} = req.params;
            const cart = await CartsService.getCartById(cartId);   
            const result = await CartsService.addProductInCart(cartId, productId);
            res.json({status:"success", result});
        } catch (error) {
            res.json({error:error.message});
        }
    };

    // Eliminar Producto de un carrito
    static deteleProduct = async (req, res) => {
        try {
            const {cid: cartId, pid: productId} = req.params;
            const cart = await CartsService.getCartById(cartId);
            const result = await CartsService.deleteProduct(cartId, productId);
            res.json({status:"success", result});
        } catch (error) {
            res.json({error:error.message});
        }
    };

    // Eliminar un Carrito
    static deleteCart = async (req, res) => {
        try {
            const {cid: cartId} = req.params;
            const result = await CartsService.deleteCart(cartId);
            res.json({status:"success", result: "carrito eliminado",});
        } catch (error) {
            res.json({error:error.message});
        }
    };

    // Actualizar Cantidad de Productos en el Carrito
    static updateProductInCart = async (req, res) => {
        try {
            const {cid: cartId, pid: productId} = req.params;
            const {newQuantity} = req.body;
            const cart = await CartsService.getCartById(cartId);
            const result = await CartsService.updateProductCart(cartId, productId, newQuantity);
            res.json({status:"success", result});
        } catch (error) {
            res.json({error:error.message});
        }
    };

    // Crear Ticket de Purchase
    static purchaseCart = async (req, res) => {
        try {
            const {cid: cartId} = req.params;
            const cart = await CartsService.getCartById(cartId);
            // Verificar Stock de Cada Producto
            if(cart.products.length){
                const ticketProducts = [];
                const rejectedProducts = [];
                for (let i = 0; i < cart.products.length; i++) {
                    // Dato de todo el producto
                    const cartProduct = cart.products[i];
                    const productInfo = cartProduct.productId;
                    // Quantity VS Stock
                    if (cartProduct.quantity <= productInfo.stock) {
                        ticketProducts.push(cartProduct);
                        productInfo.stock -= cartProduct.quantity;
                    } else {
                        rejectedProducts.push(cartProduct);
                    }
                };
                console.log("ticketProducts", ticketProducts);
                console.log("rejectedProducts", rejectedProducts);

                let total = 0;
                for (let i = 0; i < ticketProducts.length; i++) {
                    total += ticketProducts[i].productId.price * ticketProducts[i].quantity;
                };

                // Crear el ticket en BD
                if(ticketProducts.length >= 1){
                    const newTicket = {
                        code: uuidv4(),
                        purchaseDateTime: new Date(),
                        amount: total,
                        purcharser: req.user.email //El comprador, el usuario
                    };

                    const ticket = await TicketsService.createTicket(newTicket);
                    console.log("New Ticket", ticket);
                };

                // Actualizar el carrito con productos rechazados
                if(rejectedProducts.length >= 1 && ticketProducts.length >= 1){
                    for (let i = 0; i < ticketProducts.length; i++) {
                        // Dato de todo el producto
                        let sellProduct = ticketProducts[i];
                        let productId = sellProduct.productId._id;
                        // Control de Stock
                        let stock = sellProduct.productId.stock;
                        // stock -= sellProduct.quantity;
                        console.log("carrito",cartId);
                        console.log("id",productId);
                        await ProductsService.updatedProduct(productId, stock);
    
                        // Eliminar estos productos del carrito
                        await CartsService.deleteProduct(cartId, productId)
                    };

                    res.json({status: "success", message: "Compra Realizada, algunos productos no se pudieron comprar por falta de stock:", rejectedProducts})
                } else if(rejectedProducts.length >= 1 && ticketProducts.length == 0){
                    res.json({status: "error", message: "No es posible concretar la venta, algunos productos tienen falta de stock:", rejectedProducts})
                } else {
                    for (let i = 0; i < ticketProducts.length; i++) {
                        // Dato de todo el producto
                        let sellProduct = ticketProducts[i];
                        let productId = sellProduct.productId._id;
                        // Control de Stock
                        let stock = sellProduct.productId.stock;
                        // stock -= sellProduct.quantity;
                        await ProductsService.updatedProduct(productId, stock);
    
                        // Eliminar estos productos del carrito
                        await CartsService.deleteProduct(cartId, productId)
                    };
                    console.log(`Carrito con ID ${cartId} vacio, ya que se vendieron todos los productos. \nIngresa nuevos productos`);
                    res.json({status: "success", message: "Compra Realizada", ticketProducts})
                };
            } else {
                res.json({status: "error", message: "El carrito está vacio"})
            }
        } catch (error) {
            res.json({error:error.message});
        }
    };

};