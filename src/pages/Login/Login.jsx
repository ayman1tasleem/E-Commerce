import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Login.css'

function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(
                'http://localhost:3000/api/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                }
            )

            const data = await response.json()

            if (!response.ok) {
                alert(data.msg)
                return
            }

            localStorage.setItem('user', JSON.stringify(data.user))

            alert('Login successful!')
            window.location.href = '/'
        } catch (error) {
            console.log(error.message)
            alert('Something went wrong')
        }
    }

    return (
        <div className="auth-page">

            <form className="auth-card" onSubmit={handleLogin}>

                <h1>Login</h1>
                <p>Welcome back!</p>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>

                <p>
                    Don't have an account?{' '}
                    <Link to="/register">Register</Link>
                </p>

            </form>

        </div>
    )
}

export default Login