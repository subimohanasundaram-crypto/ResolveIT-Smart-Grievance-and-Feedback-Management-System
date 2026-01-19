import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  // Professional Color Palette
  const colors = {
    primary: '#2563eb',       // Modern Blue
    primaryLight: '#3b82f6',  // Lighter Blue
    secondary: '#7c3aed',     // Elegant Purple
    accent: '#059669',        // Professional Green
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
    document.title = 'Register | IT Grievance System';
    
    // Calculate password strength
    const calculateStrength = (password) => {
      let strength = 0;
      if (password.length >= 8) strength++;
      if (/[A-Z]/.test(password)) strength++;
      if (/[a-z]/.test(password)) strength++;
      if (/[0-9]/.test(password)) strength++;
      if (/[^A-Za-z0-9]/.test(password)) strength++;
      return Math.min(strength, 4);
    };
    
    setPasswordStrength(calculateStrength(formData.password));
  }, [formData.password]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      toast.error('Username is required');
      return false;
    }
    if (formData.username.length < 3) {
      toast.error('Username must be at least 3 characters');
      return false;
    }
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      toast.error('Password is required');
      return false;
    }
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        fullName: formData.username
      });
      
      if (response.data.success) {
        toast.success('Registration successful! Please login.');
        navigate('/login');
      } else {
        toast.error(response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.response) {
        if (error.response.status === 409) {
          toast.error('Username or email already exists');
        } else if (error.response.status === 400) {
          toast.error('Invalid registration data');
        } else {
          toast.error(error.response.data?.message || 'Registration failed');
        }
      } else if (error.request) {
        toast.error('Network error. Please check your connection.');
      } else {
        toast.error('Registration failed. Please try again.');
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
                  Enterprise Support Platform
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
              Join Our Professional
              <br />
              IT Support Platform
            </h1>
            <p style={{
              fontSize: '16px',
              lineHeight: 1.7,
              opacity: 0.85,
              fontWeight: '300',
              maxWidth: '400px'
            }}>
              Streamline your IT grievance management with enterprise-grade tools.
              Join thousands of professionals already using our platform.
            </p>
          </div>

          {/* Benefits */}
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
              What You Get
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {[
                { icon: '✓', text: 'Enterprise-grade security & compliance' },
                { icon: '✓', text: '24/7 professional IT support' },
                { icon: '✓', text: 'Advanced analytics & reporting' },
                { icon: '✓', text: 'Team collaboration tools' },
                { icon: '✓', text: 'Customizable workflow automation' }
              ].map((benefit, index) => (
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
                    fontSize: '12px',
                    fontWeight: 'bold',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    {benefit.icon}
                  </div>
                  <span style={{ 
                    fontSize: '15px', 
                    opacity: 0.85,
                    lineHeight: 1.5
                  }}>
                    {benefit.text}
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
              <div>🚀 99.9% Uptime</div>
              <div>•</div>
              <div>🔒 Enterprise Security</div>
              <div>•</div>
              <div>⚡ Fast Response</div>
            </div>
          </div>
        </div>

        {/* Right Panel - Registration Form */}
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
              Create Your Account
            </h2>
            <p style={{
              fontSize: '16px',
              color: colors.neutral[600],
              fontWeight: '400'
            }}>
              Join our professional IT support community
            </p>
          </div>

          {/* Registration Form */}
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
                Username
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="Enter your username"
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
              <div style={{
                fontSize: '13px',
                color: colors.neutral[500],
                marginTop: '8px',
                marginLeft: '4px'
              }}>
                Choose a unique username (min. 3 characters)
              </div>
            </div>

            {/* Email Field */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: colors.neutral[700],
                marginBottom: '10px'
              }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                  autoComplete="email"
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
                    <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                    <path d="M3 7l9 6 9-6"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '28px' }}>
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
                  placeholder="Create a strong password"
                  autoComplete="new-password"
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
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div style={{ marginTop: '12px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <span style={{
                      fontSize: '13px',
                      color: colors.neutral[600],
                      fontWeight: '500'
                    }}>
                      Password strength
                    </span>
                    <span style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: passwordStrength >= 4 ? colors.success : 
                             passwordStrength >= 3 ? colors.primary : 
                             passwordStrength >= 2 ? colors.warning : colors.error
                    }}>
                      {passwordStrength >= 4 ? 'Strong' : 
                       passwordStrength >= 3 ? 'Good' : 
                       passwordStrength >= 2 ? 'Fair' : 'Weak'}
                    </span>
                  </div>
                  <div style={{
                    height: '6px',
                    backgroundColor: colors.neutral[200],
                    borderRadius: '3px',
                    overflow: 'hidden',
                    marginBottom: '12px'
                  }}>
                    <div style={{
                      width: `${passwordStrength * 25}%`,
                      height: '100%',
                      backgroundColor: passwordStrength >= 4 ? colors.success : 
                                     passwordStrength >= 3 ? colors.primary : 
                                     passwordStrength >= 2 ? colors.warning : colors.error,
                      transition: 'width 0.3s ease, background-color 0.3s ease',
                      borderRadius: '3px'
                    }} />
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: colors.neutral[500],
                    lineHeight: 1.5,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '8px'
                  }}>
                    <div>✓ At least 8 characters</div>
                    <div>✓ Uppercase & lowercase</div>
                    <div>✓ Include numbers</div>
                    <div>✓ Special characters</div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
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
                  Confirm Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                  {showConfirmPassword ? 'Hide Password' : 'Show Password'}
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  style={{
                    width: '100%',
                    padding: '18px 52px 18px 52px',
                    fontSize: '15px',
                    border: formData.confirmPassword && formData.password !== formData.confirmPassword 
                      ? `1px solid ${colors.error}` 
                      : `1px solid ${colors.neutral[200]}`,
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
                    e.target.style.borderColor = formData.confirmPassword && formData.password !== formData.confirmPassword 
                      ? colors.error 
                      : colors.neutral[200];
                    e.target.style.backgroundColor = colors.neutral[50];
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <div style={{
                  position: 'absolute',
                  left: '18px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: formData.confirmPassword && formData.password !== formData.confirmPassword 
                    ? colors.error 
                    : colors.neutral[400],
                  pointerEvents: 'none'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <div style={{
                    position: 'absolute',
                    right: '18px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: colors.success
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                )}
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <div style={{
                  fontSize: '13px',
                  color: colors.error,
                  marginTop: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  Passwords do not match
                </div>
              )}
            </div>

            {/* Terms Agreement */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              marginBottom: '32px',
              padding: '20px',
              backgroundColor: colors.neutral[50],
              borderRadius: '12px',
              border: `1px solid ${colors.neutral[200]}`
            }}>
              <input
                type="checkbox"
                id="terms"
                required
                style={{
                  width: '20px',
                  height: '20px',
                  marginTop: '2px',
                  accentColor: colors.primary,
                  cursor: 'pointer'
                }}
              />
              <label htmlFor="terms" style={{
                fontSize: '14px',
                color: colors.neutral[700],
                lineHeight: 1.6,
                cursor: 'pointer',
                flex: 1
              }}>
                I agree to the{' '}
                <Link to="/terms" style={{
                  color: colors.primary,
                  textDecoration: 'none',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" style={{
                  color: colors.primary,
                  textDecoration: 'none',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                >
                  Privacy Policy
                </Link>
              </label>
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
                marginBottom: '24px',
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
                  Creating Account...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                  </svg>
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Links */}
          <div style={{
            textAlign: 'center',
            paddingTop: '28px',
            borderTop: `1px solid ${colors.neutral[200]}`
          }}>
            <p style={{
              fontSize: '15px',
              color: colors.neutral[600],
              margin: '0 0 16px 0'
            }}>
              Already have an account?{' '}
              <Link 
                to="/login" 
                style={{
                  color: colors.primary,
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                onMouseOut={(e) => e.target.style.textDecoration = 'none'}
              >
                Sign In Now
              </Link>
            </p>
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
            
            .password-strength-grid {
              grid-template-columns: 1fr;
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
            
            .form-header h2 {
              font-size: 24px;
            }
            
            .stats-section {
              flex-direction: column;
              gap: 8px;
              align-items: flex-start;
            }
            
            .stats-section div {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
}

export default RegisterPage;