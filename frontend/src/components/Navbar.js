import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';  // ADD THIS LINE
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Logged out successfully');  // This line needs toast imported
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          IT Grievance System
        </Link>
        
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          
          {isAuthenticated() ? (
            <>
              {isAdmin() ? (
                <>
                  <Link 
                    to="/all-complaints" 
                    className={`nav-link ${location.pathname.includes('complaints') ? 'active' : ''}`}
                  >
                    All Complaints
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to="/my-complaints" 
                    className={`nav-link ${location.pathname === '/my-complaints' ? 'active' : ''}`}
                  >
                    My Complaints
                  </Link>
                  <Link 
                    to="/new-complaint" 
                    className={`nav-link ${location.pathname === '/new-complaint' ? 'active' : ''}`}
                  >
                    New Complaint
                  </Link>
                </>
              )}
              
              <div className="user-info">
                <span className="username">{user?.username}</span>
                <span className="user-role">({user?.role})</span>
              </div>
              
              <button 
                onClick={handleLogout} 
                className="btn btn-outline logout-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
              >
                Login
              </Link>
              
              <Link 
                to="/register" 
                className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;