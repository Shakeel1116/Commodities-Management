import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import ThemeToggle from './components/ThemeToggle'


function App() {
  const [user, setUser] = useState(null)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'))
    const savedMode = localStorage.getItem('darkMode') === 'true'
    if (savedUser) setUser(savedUser)
    setDarkMode(savedMode)
  }, [])

  const login = (email, password) => {
    // Mock authentication
    const users = [
      { email: 'manager@test.com', password: 'manager123', role: 'manager', name: 'Alex Manager' },
      { email: 'keeper@test.com', password: 'keeper123', role: 'keeper', name: 'Jamie Keeper' }
    ]
    
    const foundUser = users.find(u => u.email === email && u.password === password)
    if (foundUser) {
      const userData = { email: foundUser.email, role: foundUser.role, name: foundUser.name }
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const toggleTheme = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('darkMode', newMode.toString())
  }

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <BrowserRouter>
        {user && (
          <header className="app-header">
            <div className="logo-container">
              <h1>CommodityFlow</h1>
            </div>
            <div className="user-controls">
              <span className="welcome">Welcome, {user.name}</span>
              <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </div>
          </header>
        )}
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              user ? <Navigate to={user.role === 'manager' ? '/dashboard' : '/products'} /> 
                   : <Login login={login} darkMode={darkMode} />
            } />
            <Route path="/dashboard" element={
              user?.role === 'manager' ? <Dashboard darkMode={darkMode} /> : <Navigate to="/products" />
            } />
            <Route path="/products" element={
              user ? <Products role={user.role} darkMode={darkMode} /> : <Navigate to="/" />
            } />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App