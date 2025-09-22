import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="fade-in-up">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Welcome to Vignesh's Portfolio</h1>
          <p>
            I'm a passionate developer creating innovative solutions and 
            beautiful user experiences. Explore my projects, read my thoughts, 
            and let's connect to build something amazing together.
          </p>
          <div className="hero-actions">
            <Link to="/projects" className="btn btn-primary">
              View My Work
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="container">
        <div className="section-header">
          <h2>What I Do</h2>
          <p>Passionate about creating digital experiences that matter</p>
        </div>
        
        <div className="grid grid-3">
          <div className="card text-center">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💻</div>
            <h3>Web Development</h3>
            <p>Building responsive, modern web applications with React, Node.js, and cutting-edge technologies.</p>
          </div>
          
          <div className="card text-center">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎨</div>
            <h3>UI/UX Design</h3>
            <p>Creating intuitive and beautiful user interfaces that provide exceptional user experiences.</p>
          </div>
          
          <div className="card text-center">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
            <h3>Innovation</h3>
            <p>Always exploring new technologies and methodologies to solve complex problems creatively.</p>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="container" style={{ marginTop: '4rem' }}>
        <div className="section-header">
          <h2>Featured Projects</h2>
          <p>Here are some of my recent works that I'm particularly proud of</p>
        </div>
        
        <div className="grid grid-2">
          <div className="card">
            <h3>E-Commerce Platform</h3>
            <p>A full-stack e-commerce solution built with React and Node.js, featuring real-time inventory management and secure payment processing.</p>
            <div style={{ marginTop: '1rem' }}>
              <span style={{ 
                background: '#e0f2fe', 
                color: '#0277bd', 
                padding: '0.25rem 0.75rem', 
                borderRadius: '1rem', 
                fontSize: '0.875rem',
                marginRight: '0.5rem'
              }}>
                React
              </span>
              <span style={{ 
                background: '#f3e5f5', 
                color: '#7b1fa2', 
                padding: '0.25rem 0.75rem', 
                borderRadius: '1rem', 
                fontSize: '0.875rem',
                marginRight: '0.5rem'
              }}>
                Node.js
              </span>
              <span style={{ 
                background: '#e8f5e8', 
                color: '#2e7d32', 
                padding: '0.25rem 0.75rem', 
                borderRadius: '1rem', 
                fontSize: '0.875rem'
              }}>
                MongoDB
              </span>
            </div>
          </div>
          
          <div className="card">
            <h3>Task Management App</h3>
            <p>A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.</p>
            <div style={{ marginTop: '1rem' }}>
              <span style={{ 
                background: '#e0f2fe', 
                color: '#0277bd', 
                padding: '0.25rem 0.75rem', 
                borderRadius: '1rem', 
                fontSize: '0.875rem',
                marginRight: '0.5rem'
              }}>
                React
              </span>
              <span style={{ 
                background: '#fff3e0', 
                color: '#f57c00', 
                padding: '0.25rem 0.75rem', 
                borderRadius: '1rem', 
                fontSize: '0.875rem',
                marginRight: '0.5rem'
              }}>
                TypeScript
              </span>
              <span style={{ 
                background: '#e8f5e8', 
                color: '#2e7d32', 
                padding: '0.25rem 0.75rem', 
                borderRadius: '1rem', 
                fontSize: '0.875rem'
              }}>
                Socket.io
              </span>
            </div>
          </div>
        </div>
        
        <div className="text-center" style={{ marginTop: '2rem' }}>
          <Link to="/projects" className="btn btn-primary">
            View All Projects
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container" style={{ marginTop: '4rem', marginBottom: '2rem' }}>
        <div className="card" style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          color: 'white', 
          textAlign: 'center',
          padding: '3rem 2rem'
        }}>
          <h2 style={{ color: 'white', marginBottom: '1rem' }}>Ready to Work Together?</h2>
          <p style={{ fontSize: '1.125rem', marginBottom: '2rem', opacity: 0.9 }}>
            I'm always excited to take on new challenges and collaborate on interesting projects.
          </p>
          <Link to="/contact" className="btn" style={{ 
            background: 'white', 
            color: '#667eea',
            fontWeight: '600'
          }}>
            Let's Connect
          </Link>
        </div>
      </section>
    </div>
  );
}
