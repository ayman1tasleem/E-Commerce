import { Link } from 'react-router-dom'
import './ProductCard.css'

function ProductCard({ product }) {
    return (
        <div className="product-card">

            <div className="product-image">
                <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentElement.innerHTML = '🛍️'
                    }}
                />
            </div>

            <div className="product-info">
                <p className="product-category">{product.category}</p>

                <h2>{product.name}</h2>

                <p className="product-description">
                    {product.description}
                </p>

                <h3>Rs. {product.price}</h3>

                <p className="stock">
                    {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
                </p>

                <Link
                    to={`/product/${product._id}`}
                    className="view-button"
                >
                    View Product
                </Link>
            </div>

        </div>
    )
}

export default ProductCard