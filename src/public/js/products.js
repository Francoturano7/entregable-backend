let currentCartId = '656223b7806303ad5534b5fd';

const createCart = async () => {
    const newCartResponse = await fetch('http://localhost:8080/api/carts/', {
        method: 'POST',
    });

    const result = await newCartResponse.json();
    currentCartId = result.data._id;
    console.log('Nuevo carrito creado con ID:', currentCartId);
    return currentCartId;
};

const addToCart = async (productId) => {
    if (!currentCartId) {
        await createCart();
    }

    // Agrega el producto al carrito utilizando el ID del carrito actual
    await fetch(`http://localhost:8080/api/carts/${currentCartId}/product/${productId}`, {
        method: 'POST',
    });

    console.log('Producto agregado al carrito con ID:', currentCartId);
    return currentCartId;
};

const deleteToCart = async (productId) => {
    if (currentCartId && productId) {
        try {
            const response = await fetch(`http://localhost:8080/api/carts/${currentCartId}/product/${productId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Producto eliminado del carrito correctamente.');
                window.location.reload(); 
            } else {
                console.error('Error al eliminar el producto del carrito.');
            }
    
        } catch (error) {
            console.error('Error de red o servidor al eliminar el producto del carrito:', error);
        }
    } else {
        console.error('No se proporcionó un ID de carrito o ID de producto válido.');
    }
};
