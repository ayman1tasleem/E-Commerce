import { useEffect, useState } from 'react'
import './Orders.css'

function Orders() {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const getOrders = async () => {

            try {

                const response = await fetch(
                    'http://localhost:3000/api/orders'
                )

                const data = await response.json()

                setOrders(data)

            } catch (error) {

                console.log(error.message)

            } finally {

                setLoading(false)

            }
        }

        getOrders()

    }, [])

    if (loading) {
        return <h2 className="orders-message">Loading orders...</h2>
    }

    return (
        <div className="orders-page">

            <h1>My Orders</h1>

            {orders.length === 0 ? (

                <div className="orders-message">
                    <h2>No orders found.</h2>
                </div>

            ) : (

                <div className="orders-list">

                    {orders.map(order => (

                        <div
                            className="order-card"
                            key={order._id}
                        >

                            <h3>
                                Order #{order._id}
                            </h3>

                            <p>
                                Status:
                                <strong> {order.status}</strong>
                            </p>

                            <p>
                                Total:
                                <strong> Rs. {order.totalAmount}</strong>
                            </p>

                            <p>
                                Items: {order.items.length}
                            </p>

                        </div>

                    ))}

                </div>

            )}

        </div>
    )
}

export default Orders