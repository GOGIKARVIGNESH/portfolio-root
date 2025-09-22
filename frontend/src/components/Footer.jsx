import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ 
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      color: 'white',
      padding: '3rem 0 1rem',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div className="footer-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Brand Section */}
          <div>
            <h3 style={{ 
              marginBottom: '1rem', 
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontSize: '1.5rem',
              fontWeight: '700'
            }}>
              Vignesh
            </h3>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              lineHeight: '1.6',
              marginBottom: '1.5rem'
            }}>
              Passionate developer creating innovative solutions and beautiful user experiences.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '40px', 
                height: '40px', 
                background: 'rgba(255, 255, 255, 0.1)', 
                borderRadius: '50%', 
                color: 'white',
                textDecoration: 'none',
                transition: 'var(--transition)'
              }}>
                📱
              </a>
              <a href="#" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '40px', 
                height: '40px', 
                background: 'rgba(255, 255, 255, 0.1)', 
                borderRadius: '50%', 
                color: 'white',
                textDecoration: 'none',
                transition: 'var(--transition)'
              }}>
                💼
              </a>
              <a href="#" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '40px', 
                height: '40px', 
                background: 'rgba(255, 255, 255, 0.1)', 
                borderRadius: '50%', 
                color: 'white',
                textDecoration: 'none',
                transition: 'var(--transition)'
              }}>
                🐙
              </a>
              <a href="#" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '40px', 
                height: '40px', 
                background: 'rgba(255, 255, 255, 0.1)', 
                borderRadius: '50%', 
                color: 'white',
                textDecoration: 'none',
                transition: 'var(--transition)'
              }}>
                📧
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ 
              marginBottom: '1rem', 
              fontSize: '1.125rem',
              fontWeight: '600'
            }}>
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link to="/" style={{ 
                color: 'rgba(255, 255, 255, 0.8)', 
                textDecoration: 'none',
                transition: 'var(--transition)'
              }}>
                Home
              </Link>
              <Link to="/projects" style={{ 
                color: 'rgba(255, 255, 255, 0.8)', 
                textDecoration: 'none',
                transition: 'var(--transition)'
              }}>
                Projects
              </Link>
              <Link to="/blog" style={{ 
                color: 'rgba(255, 255, 255, 0.8)', 
                textDecoration: 'none',
                transition: 'var(--transition)'
              }}>
                Blog
              </Link>
              <Link to="/contact" style={{ 
                color: 'rgba(255, 255, 255, 0.8)', 
                textDecoration: 'none',
                transition: 'var(--transition)'
              }}>
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ 
              marginBottom: '1rem', 
              fontSize: '1.125rem',
              fontWeight: '600'
            }}>
              Get In Touch
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>📧</span>
                <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>vigneshgogikar07@gmail.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>📱</span>
                <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>+91 9999999999</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>📍</span>
                <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>India</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ 
              marginBottom: '1rem', 
              fontSize: '1.125rem',
              fontWeight: '600'
            }}>
              Stay Updated
            </h4>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              marginBottom: '1rem',
              fontSize: '0.875rem'
            }}>
              Subscribe to get notified about new projects and blog posts.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="email" 
                placeholder="Enter your email"
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: 'none',
                  borderRadius: 'var(--radius)',
                  fontSize: '0.875rem'
                }}
              />
              <button 
                className="btn btn-primary"
                style={{ 
                  padding: '0.75rem 1rem',
                  fontSize: '0.875rem',
                  whiteSpace: 'nowrap'
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ 
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.6)',
            margin: 0,
            fontSize: '0.875rem'
          }}>
            © {new Date().getFullYear()} Vignesh. All rights reserved.
          </p>
          <div style={{ 
            display: 'flex', 
            gap: '2rem',
            fontSize: '0.875rem'
          }}>
            <a href="#" style={{ 
              color: 'rgba(255, 255, 255, 0.6)', 
              textDecoration: 'none',
              transition: 'var(--transition)'
            }}>
              Privacy Policy
            </a>
            <a href="#" style={{ 
              color: 'rgba(255, 255, 255, 0.6)', 
              textDecoration: 'none',
              transition: 'var(--transition)'
            }}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
