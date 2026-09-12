import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

function Navbar() {

    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem('user'))

    const logout = () => {

        localStorage.removeItem('user')

        alert('Logged out successfully!')

        navigate('/login')
    }

    return (
        <nav className="navbar">

            <Link to="/" className="logo">
                MyStore
            </Link>

            <div className="nav-links">

                <Link to="/">Home</Link>

                <Link to="/cart">Cart</Link>

                <Link to="/orders">Orders</Link>

                {user ? (

                    <>
                        <span className="welcome">
                            Hi, {user.name}
                        </span>

                        <button
                            className="logout-button"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </>

                ) : (

                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>

                )}

            </div>

        </nav>
    )
}

export default Navbar