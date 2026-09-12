import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './ProductDetails.css'

function ProductDetails() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const getProduct = async () => {

            try {
                const response = await fetch(
                    `http://localhost:3000/api/products/${id}`
                )

                const data = await response.json()

                setProduct(data)

            } catch (error) {
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }

        getProduct()

    }, [id])

    const addToCart = () => {

        const cart = JSON.parse(localStorage.getItem('cart')) || []

        const existingProduct = cart.find(
            item => item.product._id === product._id
        )

        if (existingProduct) {
            existingProduct.quantity += 1
        } else {
            cart.push({
                product: product,
                quantity: 1
            })
        }

        localStorage.setItem('cart', JSON.stringify(cart))

        alert('Product added to cart!')
    }

    if (loading) {
        return <h2 className="loading">Loading...</h2>
    }

    if (!product || product.msg) {
        return <h2 className="loading">Product not found</h2>
    }

    return (

        <div className="details-page">

            <div className="details-card">

                <div className="details-image">
                    <img
                        src={product.image}
                        alt={product.name}
                        onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.parentElement.innerHTML = '🛍️'
                        }}
                    />
                </div>

                <div className="details-info">

                    <p>{product.category}</p>

                    <h1>{product.name}</h1>

                    <h2>Rs. {product.price}</h2>

                    <p>{product.description}</p>

                    <p>
                        Stock available: {product.stock}
                    </p>

                    <button
                        onClick={addToCart}
                        disabled={product.stock <= 0}
                    >
                        Add to Cart
                    </button>

                    <button
                        className="back-button"
                        onClick={() => navigate('/')}
                    >
                        Back to Products
                    </button>

                </div>

            </div>

        </div>

    )
}

export default ProductDetails