import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import './Header.css'

const Header = () => {
  const { user, logout } = useAuth()

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">
          Web Series Insight
        </Link>
      </div>
      
      <div className="search-bar">
        <input type="text" placeholder="Search for a series..." />
      </div>

      <nav className="header-nav">
        {user ? (
          <>
            <Link to="/dashboard">
              Dashboard
            </Link>
            <span>Welcome, {user.name}</span>
            <button onClick={logout} className="btn btn-primary">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            Login
          </Link>
        )}
      </nav>
    </header>
  )
}

export default Header