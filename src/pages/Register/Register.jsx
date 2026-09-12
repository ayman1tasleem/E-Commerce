import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Register.css'

function Register() {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(
                'http://localhost:3000/api/auth/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            )

            const data = await response.json()

            if (!response.ok) {
                alert(data.msg)
                return
            }

            alert('Registration successful!')
            navigate('/login')
        } catch (error) {
            console.log(error.message)
            alert('Something went wrong')
        }
    }

    return (
        <div className="auth-page">

            <form className="auth-card" onSubmit={handleRegister}>

                <h1>Create Account</h1>
                <p>Join our store today!</p>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

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

                <button type="submit">Register</button>

                <p>
                    Already have an account?{' '}
                    <Link to="/login">Login</Link>
                </p>

            </form>

        </div>
    )
}

export default Register