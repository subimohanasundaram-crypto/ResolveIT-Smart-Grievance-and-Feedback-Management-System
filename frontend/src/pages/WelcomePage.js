import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const navigate = useNavigate();
  const [time, setTime] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
    warning: '#f59e0b'
  };

  // Update time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timeInterval = setInterval(updateTime, 60000);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearInterval(timeInterval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Subtle parallax effect
  const parallaxX = (mousePosition.x / window.innerWidth - 0.5) * 10;
  const parallaxY = (mousePosition.y / window.innerHeight - 0.5) * 10;

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      position: 'relative',
      overflow: 'hidden',
      color: colors.neutral[900],
      padding: '20px'
    }}>
      
      {/* Subtle Background Pattern */}
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
      
      {/* Floating Elements - Subtle Movement */}
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: `radial-gradient(circle, 
          rgba(37, 99, 235, 0.08) 0%, 
          rgba(37, 99, 235, 0.02) 70%, 
          transparent 100%)`,
        top: `${50 + parallaxY * 0.2}px`,
        left: `${50 + parallaxX * 0.2}px`,
        filter: 'blur(40px)',
        animation: 'float 25s ease-in-out infinite'
      }} />
      
      <div style={{
        position: 'absolute',
        width: '250px',
        height: '250px',
        borderRadius: '50%',
        background: `radial-gradient(circle, 
          rgba(124, 58, 237, 0.06) 0%, 
          rgba(124, 58, 237, 0.02) 70%, 
          transparent 100%)`,
        bottom: `${100 - parallaxY * 0.3}px`,
        right: `${100 - parallaxX * 0.3}px`,
        filter: 'blur(35px)',
        animation: 'float 20s ease-in-out infinite reverse'
      }} />

      {/* Main Content Container */}
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '32px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: `
          0 20px 60px rgba(0, 0, 0, 0.08),
          0 4px 24px rgba(0, 0, 0, 0.04),
          inset 0 1px 0 rgba(255, 255, 255, 0.5)
        `,
        padding: 'clamp(40px, 5vw, 60px)',
        maxWidth: 'min(1200px, 95vw)',
        width: '100%',
        position: 'relative',
        zIndex: 2,
        transform: `translate(${parallaxX * 0.1}px, ${parallaxY * 0.1}px)`,
        transition: 'transform 0.1s ease-out',
        overflow: 'hidden'
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

        {/* Header with Time and Logo */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'clamp(40px, 6vw, 60px)',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          {/* Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold',
              boxShadow: `0 10px 30px rgba(37, 99, 235, 0.2)`
            }}>
              IT
            </div>
            <div>
              <div style={{
                fontSize: '24px',
                fontWeight: '700',
                color: colors.neutral[900],
                letterSpacing: '-0.5px'
              }}>
                IT Grievance System
              </div>
              <div style={{
                fontSize: '14px',
                color: colors.neutral[500],
                fontWeight: '400'
              }}>
                Enterprise Support Platform
              </div>
            </div>
          </div>

          {/* Time Display */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 20px',
            backgroundColor: 'rgba(37, 99, 235, 0.05)',
            borderRadius: '20px',
            border: `1px solid rgba(37, 99, 235, 0.1)`
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span style={{
              fontSize: '16px',
              fontWeight: '500',
              color: colors.neutral[700]
            }}>
              {time}
            </span>
          </div>
        </div>

        {/* Main Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(60px, 8vw, 80px)',
          maxWidth: '800px',
          margin: '0 auto clamp(60px, 8vw, 80px)'
        }}>
          <h1 style={{
            fontSize: 'clamp(42px, 7vw, 64px)',
            fontWeight: '800',
            marginBottom: 'clamp(20px, 3vw, 28px)',
            background: `linear-gradient(135deg, 
              ${colors.neutral[900]}, 
              ${colors.primary}, 
              ${colors.secondary})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.025em',
            lineHeight: 1.1
          }}>
            IT Support  Feedback
            <br />
            <span style={{ fontSize: '0.8em' }}>Management Platform</span>
          </h1>

          <p style={{
            fontSize: 'clamp(18px, 2.5vw, 22px)',
            color: colors.neutral[600],
            lineHeight: 1.7,
            fontWeight: '300',
            marginBottom: 'clamp(40px, 5vw, 60px)'
          }}>
            Streamline your IT grievance workflow with our enterprise-grade platform.
            Experience seamless issue tracking, rapid response times, and professional support management.
          </p>

          {/* Stats Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(24px, 4vw, 48px)',
            flexWrap: 'wrap',
            marginBottom: 'clamp(40px, 6vw, 60px)'
          }}>
            {[
              { value: '24/7', label: 'Support', icon: '🛡️', color: colors.primary },
              { value: '99.9%', label: 'Uptime', icon: '📈', color: colors.success },
              { value: '< 1hr', label: 'Response', icon: '⚡', color: colors.warning },
              { value: 'Secure', label: 'Platform', icon: '🔒', color: colors.accent }
            ].map((stat, index) => (
              <div key={index} style={{
                textAlign: 'center',
                minWidth: '140px'
              }}>
                <div style={{
                  fontSize: '32px',
                  marginBottom: '12px',
                  opacity: 0.9
                }}>
                  {stat.icon}
                </div>
                <div style={{
                  fontSize: 'clamp(24px, 3vw, 32px)',
                  fontWeight: '700',
                  color: stat.color,
                  marginBottom: '4px'
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: colors.neutral[600],
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontWeight: '500'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px',
          marginBottom: 'clamp(60px, 8vw, 80px)'
        }}>
          {[
            {
              title: 'Issue Tracking',
              description: 'Comprehensive ticket management system with real-time updates',
              icon: '📋',
              gradient: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`
            },
            {
              title: 'Automated Workflows',
              description: 'Smart routing and escalation for efficient issue resolution',
              icon: '🔄',
              gradient: `linear-gradient(135deg, ${colors.secondary}, #8b5cf6)`
            },
            {
              title: 'Analytics Dashboard',
              description: 'Advanced reporting and insights for performance optimization',
              icon: '📊',
              gradient: `linear-gradient(135deg, ${colors.accent}, #10b981)`
            },
            {
              title: 'Team Collaboration',
              description: 'Integrated communication tools for cross-functional teams',
              icon: '👥',
              gradient: `linear-gradient(135deg, ${colors.warning}, #fbbf24)`
            }
          ].map((feature, index) => (
            <div key={index} style={{
              padding: '32px',
              backgroundColor: 'white',
              borderRadius: '24px',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.04)';
            }}>
              {/* Feature Icon */}
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '18px',
                background: feature.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                marginBottom: '24px',
                boxShadow: `0 10px 30px ${feature.gradient.split(',')[0]}40`
              }}>
                {feature.icon}
              </div>
              
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '12px',
                color: colors.neutral[900]
              }}>
                {feature.title}
              </h3>
              
              <p style={{
                fontSize: '15px',
                color: colors.neutral[600],
                lineHeight: 1.6,
                fontWeight: '300'
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div style={{
          textAlign: 'center',
          padding: 'clamp(40px, 6vw, 60px)',
          backgroundColor: 'rgba(37, 99, 235, 0.03)',
          borderRadius: '28px',
          border: `1px solid rgba(37, 99, 235, 0.08)`,
          marginBottom: 'clamp(40px, 6vw, 60px)'
        }}>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 36px)',
            fontWeight: '700',
            marginBottom: '20px',
            color: colors.neutral[900]
          }}>
            Ready to Transform Your IT Support?
          </h2>
          
          <p style={{
            fontSize: '18px',
            color: colors.neutral[600],
            marginBottom: '40px',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Join thousands of enterprises using our platform for efficient IT grievance management.
          </p>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => navigate('/login')}
              style={{
                padding: '18px 40px',
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
                color: 'white',
                border: 'none',
                borderRadius: '16px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: `0 10px 30px rgba(37, 99, 235, 0.3)`,
                minWidth: '200px',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = `0 15px 40px rgba(37, 99, 235, 0.4)`;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = `0 10px 30px rgba(37, 99, 235, 0.3)`;
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Login to Dashboard
            </button>

            <button
              onClick={() => navigate('/register')}
              style={{
                padding: '18px 40px',
                background: 'white',
                color: colors.primary,
                border: `2px solid ${colors.primary}`,
                borderRadius: '16px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                minWidth: '200px',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = colors.primary;
                e.target.style.color = 'white';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = `0 10px 30px rgba(37, 99, 235, 0.2)`;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'white';
                e.target.style.color = colors.primary;
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
              Get Started Free
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '40px',
          borderTop: `1px solid ${colors.neutral[200]}`,
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <div style={{
              fontSize: '14px',
              color: colors.neutral[500],
              fontWeight: '400',
              marginBottom: '4px'
            }}>
              © {new Date().getFullYear()} IT Grievance System
            </div>
            <div style={{
              fontSize: '12px',
              color: colors.neutral[400]
            }}>
           IT Support Management Platform v4.0
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            gap: '24px'
          }}>
            {['Terms', 'Privacy', 'Security', 'Docs'].map((item, index) => (
              <a key={index} href="#" style={{
                fontSize: '14px',
                color: colors.neutral[500],
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                ':hover': {
                  color: colors.primary
                }
              }}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { 
              transform: translate(0, 0) scale(1); 
            }
            50% { 
              transform: translate(20px, -20px) scale(1.05); 
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
            background: #f8fafc;
          }

          * {
            box-sizing: border-box;
          }

          button {
            font-family: inherit;
            cursor: pointer;
            outline: none;
          }

          button:focus-visible {
            outline: 2px solid ${colors.primary};
            outline-offset: 2px;
          }

          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(241, 245, 249, 0.5);
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: rgba(37, 99, 235, 0.2);
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(37, 99, 235, 0.3);
          }

          /* Smooth animations */
          .feature-card, .stat-item {
            animation: fadeIn 0.6s ease-out forwards;
            animation-delay: calc(var(--i, 0) * 0.1s);
            opacity: 0;
          }

          /* Responsive adjustments */
          @media (max-width: 1024px) {
            .main-container {
              padding: 40px 32px;
            }
            
            .features-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 768px) {
            .main-container {
              padding: 32px 24px;
              border-radius: 24px;
            }
            
            .features-grid {
              grid-template-columns: 1fr;
              gap: 24px;
            }
            
            .header-section {
              flex-direction: column;
              align-items: flex-start;
            }
            
            .cta-buttons {
              flex-direction: column;
              align-items: stretch;
            }
            
            .cta-buttons button {
              width: 100%;
            }
          }

          @media (max-width: 480px) {
            .main-container {
              padding: 24px 20px;
              border-radius: 20px;
            }
            
            .stats-bar {
              flex-direction: column;
              align-items: center;
              gap: 32px;
            }
            
            .footer {
              flex-direction: column;
              align-items: flex-start;
              gap: 24px;
            }
          }
        `}
      </style>
    </div>
  );
}

export default WelcomePage;