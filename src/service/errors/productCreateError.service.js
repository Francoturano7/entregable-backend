export const productCreateError = (product) => {
    return `
        Todos los campos son obligatorios,
        Listado de Campos Obligatorios: 
        Title: Tipo String, y se recibio ${product.title},
        Description: Tipo String, y se recibio ${product.description},
        Price: Tipo Number, y se recibio ${product.price},
        Code: Tipo Number, y se recibio ${product.code},
        Category: Tipo String, y se recibio ${product.category}.
        Stock: Tipo Number, y se recibio ${product.stock},
        Imagen: Tipo Number, y se recibio ${product.thumbnail}.
    `
};