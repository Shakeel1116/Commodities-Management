import { useState } from 'react'

export default function Login({ login, darkMode }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!login(email, password)) {
      setError('Invalid email or password')
    }
  }

  return (
    <div className={`login-container ${darkMode ? 'dark' : 'light'}`}>
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to manage your commodities</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>
        
        <div className="demo-credentials">
          <p>Demo Accounts:</p>
          <ul>
            <li>Manager: manager@test.com / manager123</li>
            <li>Store Keeper: keeper@test.com / keeper123</li>
          </ul>
        </div>
      </div>
    </div>
  )
}