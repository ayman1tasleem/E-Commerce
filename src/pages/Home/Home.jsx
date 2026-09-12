import { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard/ProductCard'
import './Home.css'

function Home() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetch(
                    'http://localhost:3000/api/products'
                )

                const data = await response.json()
                setProducts(data)
            } catch (error) {
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }

        getProducts()
    }, [])

    if (loading) {
        return <h2 className="loading">Loading products...</h2>
    }

    return (
        <div className="home">

            <section className="hero">
                <h1>Welcome to Our Store</h1>
                <p>Find the products you love.</p>
            </section>

            <h1 className="products-title">Our Products</h1>

            <div className="products-grid">
                {products.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                    />
                ))}
            </div>

        </div>
    )
}

export default Home