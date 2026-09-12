import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Checkout.css'

function Checkout() {

    const navigate = useNavigate()

    const [cart] = useState(
        JSON.parse(localStorage.getItem('cart')) || []
    )

    const user = JSON.parse(localStorage.getItem('user'))

    const total = cart.reduce(
        (sum, item) =>
            sum + item.product.price * item.quantity,
        0
    )

    const [loading, setLoading] = useState(false)

    const placeOrder = async () => {

        if (!user) {
            alert('Please login first.')
            navigate('/login')
            return
        }

        if (cart.length === 0) {
            alert('Your cart is empty.')
            navigate('/cart')
            return
        }

        const orderData = {
            user: user._id,

            items: cart.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price
            })),

            totalAmount: total
        }

        try {

            setLoading(true)

            const response = await fetch(
                'http://localhost:3000/api/orders',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(orderData)
                }
            )

            const data = await response.json()

            if (!response.ok) {
                alert(data.msg)
                return
            }

            localStorage.removeItem('cart')

            alert('Order placed successfully!')

            navigate('/orders')

        } catch (error) {

            console.log(error.message)
            alert('Failed to place order.')

        } finally {

            setLoading(false)

        }
    }

    return (
        <div className="checkout-page">

            <div className="checkout-card">

                <h1>Checkout</h1>

                <div className="checkout-section">
                    <h3>Customer</h3>

                    {user ? (
                        <>
                            <p>Name: {user.name}</p>
                            <p>Email: {user.email}</p>
                        </>
                    ) : (
                        <p>Please login before placing your order.</p>
                    )}
                </div>

                <div className="checkout-section">

                    <h3>Order Summary</h3>

                    {cart.map(item => (
                        <div
                            className="checkout-item"
                            key={item.product._id}
                        >
                            <span>
                                {item.product.name} × {item.quantity}
                            </span>

                            <span>
                                Rs. {item.product.price * item.quantity}
                            </span>
                        </div>
                    ))}

                </div>

                <div className="checkout-total">
                    Total: Rs. {total}
                </div>

                <button
                    className="place-order-button"
                    onClick={placeOrder}
                    disabled={loading}
                >
                    {loading ? 'Placing Order...' : 'Place Order'}
                </button>

            </div>

        </div>
    )
}

export default Checkout