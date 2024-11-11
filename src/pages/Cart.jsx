import React, { useState, useEffect } from 'react';
import { useCart } from '../components/CartContext';
import { useUser } from '../components/UserContext';
import '../assets/css/Cart.css';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, addToCart, removeFromCart, decreaseQuantity } = useCart();
    const { token } = useUser();

    const [isProcessing, setIsProcessing] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const increaseQuantity = (id) => {
        addToCart(cart.find(pizza => pizza.id === id));
    };

    const totalAmount = cart.reduce((total, pizza) => total + (pizza.price * pizza.quantity), 0);

    const handlePayment = async () => {
        if (isProcessing) return;

        setIsProcessing(true);

        try {
            const response = await fetch('http://localhost:5000/api/checkouts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ cart }),
            });

            if (!response.ok) {
                throw new Error('Hubo un problema con la compra');
            }

            const data = await response.json();
            setSuccessMessage("Compra exitosa!");

        } catch (error) {
            setSuccessMessage("");
            alert(error.message);
        } finally {
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        if (cart.length === 0) {
            alert("El carrito está vacío.");
        }
    }, [cart.length]);

    return (
        <div className="cart">
            <h2 className='carrito-de-compras'>Carrito de Compras</h2>
            <div className="cart-items">
                {cart.length > 0 ? (
                    cart.map(pizza => (
                        <div key={pizza.id} className="cart-item">
                            <img src={pizza.img} alt={pizza.name} />
                            <h3>{pizza.name}</h3>
                            <hr />
                            <p>Ingredientes: {pizza.ingredients.join(', ')}</p>
                            <p>Precio: ${pizza.price}</p>
                            <p>Cantidad: {pizza.quantity}</p>
                            <button onClick={() => increaseQuantity(pizza.id)} className='btn-mas'>+</button>
                            <button onClick={() => decreaseQuantity(pizza.id)} className='btn-menos'>-</button>
                        </div>
                    ))
                ) : (
                    <p>El carrito está vacío 🛒.</p>
                )}
            </div>

            <h3>Total: ${totalAmount}</h3>

            <button
                className="pay-btn"
                onClick={handlePayment}
                disabled={!token || isProcessing || cart.length === 0}
            >
                Pagar
            </button>


            {successMessage && <p className="mensaje-compra">{successMessage}</p>}

            <Link to="/" className="link-btn">Volver a Inicio</Link>
        </div>
    );
};

export default Cart;