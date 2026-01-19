import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Professional Color Palette
  const colors = {
    primary: '#2563eb',
    primaryLight: '#3b82f6',
    secondary: '#7c3aed',
    accent: '#059669',
    neutral: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827'
    },
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  };

  useEffect(() => {
    document.title = 'Login | IT Grievance System';
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username.trim() || !formData.password.trim()) {
      toast.error('Please enter both username and password');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username: formData.username,
        password: formData.password
      });
      
      if (response.data.success) {
        login(response.data);
        toast.success('Login successful!');
        
        if (response.data.role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/my-complaints');
        }
      } else {
        toast.error(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.response) {
        if (error.response.status === 401) {
          toast.error('Invalid username or password');
        } else if (error.response.status === 500) {
          toast.error('Server error. Please try again later.');
        } else {
          toast.error(error.response.data?.message || 'Login failed');
        }
      } else if (error.request) {
        toast.error('Network error. Please check your connection.');
      } else {
        toast.error('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      position: 'relative',
      overflow: 'hidden',
      padding: '20px'
    }}>
      
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(37, 99, 235, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(5, 150, 105, 0.02) 0%, transparent 50%)
        `,
        opacity: 0.7
      }} />
      
      {/* Geometric Grid Lines */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(90deg, rgba(37, 99, 235, 0.03) 1px, transparent 1px),
          linear-gradient(rgba(37, 99, 235, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        opacity: 0.4
      }} />
      
      {/* Floating Elements */}
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: `radial-gradient(circle, 
          rgba(37, 99, 235, 0.08) 0%, 
          rgba(37, 99, 235, 0.02) 70%, 
          transparent 100%)`,
        top: '10%',
        left: '10%',
        filter: 'blur(40px)',
        animation: 'float 25s ease-in-out infinite'
      }} />
      
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: `radial-gradient(circle, 
          rgba(124, 58, 237, 0.06) 0%, 
          rgba(124, 58, 237, 0.02) 70%, 
          transparent 100%)`,
        bottom: '10%',
        right: '10%',
        filter: 'blur(35px)',
        animation: 'float 20s ease-in-out infinite reverse'
      }} />

      {/* Main Container */}
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        minHeight: '700px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '32px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: `
          0 20px 60px rgba(0, 0, 0, 0.08),
          0 4px 24px rgba(0, 0, 0, 0.04),
          inset 0 1px 0 rgba(255, 255, 255, 0.5)
        `,
        display: 'flex',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 2
      }}>

        {/* Glowing Accent Border */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, 
            ${colors.primary}, 
            ${colors.secondary}, 
            ${colors.accent})`,
          borderTopLeftRadius: '32px',
          borderTopRightRadius: '32px'
        }} />

        {/* Left Panel - Branding */}
        <div style={{
          flex: 1,
          background: `linear-gradient(135deg, 
            ${colors.neutral[900]}, 
            ${colors.neutral[800]})`,
          padding: '60px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          
          {/* Overlay Pattern */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `radial-gradient(circle at 30% 30%, 
              rgba(37, 99, 235, 0.1) 0%, 
              transparent 50%),
              radial-gradient(circle at 70% 70%, 
              rgba(124, 58, 237, 0.1) 0%, 
              transparent 50%)`,
            opacity: 0.3
          }} />
          
          {/* Logo */}
          <div style={{ 
            position: 'relative',
            zIndex: 1,
            marginBottom: '60px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '40px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                fontWeight: 'bold',
                color: 'white',
                boxShadow: `0 10px 30px rgba(37, 99, 235, 0.3)`
              }}>
                IT
              </div>
              <div>
                <div style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  letterSpacing: '-0.5px'
                }}>
                  IT Grievance
                </div>
                <div style={{
                  fontSize: '14px',
                  opacity: 0.8,
                  fontWeight: '400'
                }}>
                  Professional Support Platform
                </div>
              </div>
            </div>
          </div>

          {/* Welcome Message */}
          <div style={{ 
            position: 'relative',
            zIndex: 1,
            marginBottom: '60px'
          }}>
            <h1 style={{
              fontSize: '36px',
              fontWeight: '700',
              lineHeight: 1.3,
              marginBottom: '24px',
              letterSpacing: '-0.5px'
            }}>
              Welcome Back to
              <br />
              IT Support Portal
            </h1>
            <p style={{
              fontSize: '16px',
              lineHeight: 1.7,
              opacity: 0.85,
              fontWeight: '300',
              maxWidth: '400px'
            }}>
              Access your IT grievance management dashboard.
              Track issues, manage tickets, and collaborate with support teams.
            </p>
          </div>

          {/* Features */}
          <div style={{ 
            position: 'relative',
            zIndex: 1,
            marginBottom: '40px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '24px',
              opacity: 0.9
            }}>
              What You Can Do
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {[
                { icon: '📊', text: 'Track IT issues in real-time' },
                { icon: '📋', text: 'Submit and manage tickets' },
                { icon: '👥', text: 'Collaborate with support teams' },
                { icon: '🔔', text: 'Receive status updates' },
                { icon: '📈', text: 'View analytics and reports' }
              ].map((feature, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px'
                }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    {feature.icon}
                  </div>
                  <span style={{ 
                    fontSize: '15px', 
                    opacity: 0.85,
                    lineHeight: 1.5
                  }}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div style={{
            position: 'relative',
            zIndex: 1,
            marginTop: 'auto',
            paddingTop: '40px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px',
              fontSize: '14px',
              opacity: 0.7
            }}>
              <div>⚡ Fast Response Times</div>
              <div>•</div>
              <div>🔐 Enterprise Security</div>
              <div>•</div>
              <div>📱 24/7 Access</div>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div style={{
          flex: 1,
          padding: '60px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          
          {/* Form Header */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: colors.neutral[900],
              marginBottom: '12px',
              letterSpacing: '-0.5px'
            }}>
              Sign In to Your Account
            </h2>
            <p style={{
              fontSize: '16px',
              color: colors.neutral[600],
              fontWeight: '400'
            }}>
              Enter your credentials to access the IT support dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            
            {/* Username Field */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: colors.neutral[700],
                marginBottom: '10px'
              }}>
                Username or Email
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="Enter your username or email"
                  autoComplete="username"
                  style={{
                    width: '100%',
                    padding: '18px 18px 18px 52px',
                    fontSize: '15px',
                    border: `1px solid ${colors.neutral[200]}`,
                    borderRadius: '12px',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s ease',
                    backgroundColor: colors.neutral[50],
                    color: colors.neutral[900],
                    fontFamily: 'inherit',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = colors.primary;
                    e.target.style.backgroundColor = 'white';
                    e.target.style.boxShadow = `0 0 0 3px rgba(37, 99, 235, 0.1)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = colors.neutral[200];
                    e.target.style.backgroundColor = colors.neutral[50];
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <div style={{
                  position: 'absolute',
                  left: '18px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: colors.neutral[400],
                  pointerEvents: 'none'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px'
              }}>
                <label style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: colors.neutral[700]
                }}>
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '13px',
                    color: colors.primary,
                    cursor: 'pointer',
                    padding: '4px 8px',
                    fontFamily: 'inherit',
                    fontWeight: '500',
                    borderRadius: '6px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = colors.neutral[100];
                    e.target.style.color = colors.primary;
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = colors.primary;
                  }}
                >
                  {showPassword ? 'Hide Password' : 'Show Password'}
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  style={{
                    width: '100%',
                    padding: '18px 52px 18px 52px',
                    fontSize: '15px',
                    border: `1px solid ${colors.neutral[200]}`,
                    borderRadius: '12px',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s ease',
                    backgroundColor: colors.neutral[50],
                    color: colors.neutral[900],
                    fontFamily: 'inherit',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = colors.primary;
                    e.target.style.backgroundColor = 'white';
                    e.target.style.boxShadow = `0 0 0 3px rgba(37, 99, 235, 0.1)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = colors.neutral[200];
                    e.target.style.backgroundColor = colors.neutral[50];
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <div style={{
                  position: 'absolute',
                  left: '18px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: colors.neutral[400],
                  pointerEvents: 'none'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Forgot Password */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: '32px'
            }}>
              <Link 
                to="/forgot-password"
                style={{
                  fontSize: '14px',
                  color: colors.primary,
                  fontWeight: '500',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                onMouseOut={(e) => e.target.style.textDecoration = 'none'}
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              style={{
                width: '100%',
                padding: '18px',
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                fontFamily: 'inherit',
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                boxShadow: `0 10px 30px rgba(37, 99, 235, 0.3)`,
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
              onMouseOut={(e) => !loading && (e.target.style.transform = 'translateY(0)')}
            >
              {loading ? (
                <>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In to Dashboard
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </>
              )}
            </button>

            {/* Divider */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '32px'
            }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: colors.neutral[200] }}></div>
              <span style={{
                padding: '0 16px',
                fontSize: '14px',
                color: colors.neutral[500],
                fontWeight: '500'
              }}>
                Don't have an account?
              </span>
              <div style={{ flex: 1, height: '1px', backgroundColor: colors.neutral[200] }}></div>
            </div>
          </form>

          {/* Register CTA */}
          <div style={{
            marginBottom: '32px'
          }}>
            <button
              type="button"
              onClick={() => navigate('/register')}
              style={{
                width: '100%',
                padding: '18px',
                background: 'white',
                color: colors.primary,
                border: `2px solid ${colors.primary}`,
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                fontFamily: 'inherit',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px'
              }}
              onMouseOver={(e) => {
                e.target.style.background = colors.neutral[50];
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'white';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
              Create New Account
            </button>
          </div>

          {/* Links */}
          <div style={{
            textAlign: 'center',
            paddingTop: '28px',
            borderTop: `1px solid ${colors.neutral[200]}`
          }}>
            <p style={{
              fontSize: '14px',
              color: colors.neutral[500],
              margin: 0
            }}>
              <Link 
                to="/" 
                style={{
                  color: colors.neutral[500],
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.color = colors.primary;
                  e.target.firstChild.style.transform = 'translateX(-2px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.color = colors.neutral[500];
                  e.target.firstChild.style.transform = 'translateX(0)';
                }}
              >
                <span style={{ 
                  display: 'inline-block',
                  transition: 'transform 0.2s ease'
                }}>
                  ←
                </span>
                Return to Home
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes float {
            0%, 100% { 
              transform: translate(0, 0) scale(1); 
            }
            50% { 
              transform: translate(30px, -30px) scale(1.05); 
            }
          }

          body {
            margin: 0;
            padding: 0;
            background: #f8fafc;
          }

          input, button {
            font-family: 'Inter', sans-serif;
          }

          input:focus {
            outline: none;
          }

          /* Responsive Design */
          @media (max-width: 1024px) {
            .main-container {
              flex-direction: column;
              max-width: 600px;
              min-height: auto;
            }
            
            .left-panel,
            .right-panel {
              padding: 48px;
            }
            
            .left-panel {
              padding-bottom: 60px;
            }
          }

          @media (max-width: 640px) {
            .main-container {
              border-radius: 24px;
              margin: 16px;
            }
            
            .left-panel,
            .right-panel {
              padding: 32px;
            }
            
            .form-header h2 {
              font-size: 24px;
            }
          }

          @media (max-width: 480px) {
            .main-container {
              border-radius: 20px;
              margin: 12px;
            }
            
            .left-panel,
            .right-panel {
              padding: 24px;
            }
            
            .stats-section {
              flex-direction: column;
              gap: 8px;
              align-items: flex-start;
            }
          }
        `}
      </style>
    </div>
  );
}

export default LoginPage;