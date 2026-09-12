import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Cart.css'

function Cart() {

    const [cart, setCart] = useState(
        JSON.parse(localStorage.getItem('cart')) || []
    )

    const updateCart = (newCart) => {
        setCart(newCart)
        localStorage.setItem('cart', JSON.stringify(newCart))
    }

    const increaseQuantity = (id) => {

        const newCart = cart.map(item => {
            if (item.product._id === id) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }

            return item
        })

        updateCart(newCart)
    }

    const decreaseQuantity = (id) => {

        const newCart = cart
            .map(item => {
                if (item.product._id === id) {
                    return {
                        ...item,
                        quantity: item.quantity - 1
                    }
                }

                return item
            })
            .filter(item => item.quantity > 0)

        updateCart(newCart)
    }

    const removeItem = (id) => {

        const newCart = cart.filter(
            item => item.product._id !== id
        )

        updateCart(newCart)
    }

    const total = cart.reduce(
        (sum, item) =>
            sum + item.product.price * item.quantity,
        0
    )

    return (
        <div className="cart-page">

            <h1>Shopping Cart</h1>

            {cart.length === 0 ? (

                <div className="empty-cart">
                    <h2>Your cart is empty</h2>

                    <Link to="/">
                        Continue Shopping
                    </Link>
                </div>

            ) : (

                <>

                    <div className="cart-items">

                        {cart.map(item => (

                            <div
                                className="cart-item"
                                key={item.product._id}
                            >

                                <div className="cart-image">
                                    🛍️
                                </div>

                                <div className="cart-info">

                                    <h2>
                                        {item.product.name}
                                    </h2>

                                    <p>
                                        Rs. {item.product.price}
                                    </p>

                                    <div className="quantity">

                                        <button
                                            onClick={() =>
                                                decreaseQuantity(
                                                    item.product._id
                                                )
                                            }
                                        >
                                            −
                                        </button>

                                        <span>
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() =>
                                                increaseQuantity(
                                                    item.product._id
                                                )
                                            }
                                        >
                                            +
                                        </button>

                                    </div>

                                    <button
                                        className="remove-button"
                                        onClick={() =>
                                            removeItem(
                                                item.product._id
                                            )
                                        }
                                    >
                                        Remove
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                    <div className="cart-summary">

                        <h2>
                            Total: Rs. {total}
                        </h2>

                        <Link
                            to="/checkout"
                            className="checkout-button"
                        >
                            Proceed to Checkout
                        </Link>

                    </div>

                </>

            )}

        </div>
    )
}

export default Cart