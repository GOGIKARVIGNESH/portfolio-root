import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.site-header')) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="brand">
          Vignesh
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="nav">
          <Link to="/" className={isActive('/')}>
            Home
          </Link>
          <Link to="/projects" className={isActive('/projects')}>
            Projects
          </Link>
          <Link to="/blog" className={isActive('/blog')}>
            Blog
          </Link>
          <Link to="/contact" className={isActive('/contact')}>
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Mobile Navigation */}
        <nav className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          <Link to="/" className={isActive('/')}>
            Home
          </Link>
          <Link to="/projects" className={isActive('/projects')}>
            Projects
          </Link>
          <Link to="/blog" className={isActive('/blog')}>
            Blog
          </Link>
          <Link to="/contact" className={isActive('/contact')}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}