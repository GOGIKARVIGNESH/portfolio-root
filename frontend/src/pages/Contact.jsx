import React, { useState } from 'react'
import { postContact } from '../api'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    
    if (!form.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!form.subject.trim()) {
      newErrors.subject = 'Subject is required'
    } else if (form.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters'
    }
    
    if (!form.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    setStatus(null)
    
    try {
      await postContact(form)
      setStatus('sent')
      setForm({ name: '', email: '', subject: '', message: '' })
      setErrors({})
    } catch (err) {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fade-in-up">
      <section className="container">
        <div className="section-header">
          <h2>Get In Touch</h2>
          <p>Have a project in mind or just want to chat? I'd love to hear from you!</p>
        </div>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
          {/* Contact Information */}
          <div>
            <div className="card" style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-dark)' }}>Let's Connect</h3>
              <p style={{ marginBottom: '1.5rem', color: 'var(--text-light)' }}>
                I'm always excited to work on new projects and collaborate with fellow developers. 
                Whether you have a specific project in mind or just want to discuss ideas, 
                feel free to reach out!
              </p>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    background: 'var(--primary-color)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginRight: '1rem',
                    color: 'white',
                    fontSize: '1.2rem'
                  }}>
                    📧
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: 'var(--text-dark)' }}>Email</div>
                    <div style={{ color: 'var(--text-light)' }}>vigneshgogikar07@gmail.com</div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    background: 'var(--primary-color)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginRight: '1rem',
                    color: 'white',
                    fontSize: '1.2rem'
                  }}>
                    📱
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: 'var(--text-dark)' }}>Phone</div>
                    <div style={{ color: 'var(--text-light)' }}>+91 9999999999</div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    background: 'var(--primary-color)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginRight: '1rem',
                    color: 'white',
                    fontSize: '1.2rem'
                  }}>
                    📍
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: 'var(--text-dark)' }}>Location</div>
                    <div style={{ color: 'var(--text-light)' }}>India</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="card">
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-dark)' }}>Follow Me</h3>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="#" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: '40px', 
                  height: '40px', 
                  background: 'var(--bg-light)', 
                  borderRadius: '50%', 
                  color: 'var(--primary-color)',
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
                  background: 'var(--bg-light)', 
                  borderRadius: '50%', 
                  color: 'var(--primary-color)',
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
                  background: 'var(--bg-light)', 
                  borderRadius: '50%', 
                  color: 'var(--primary-color)',
                  textDecoration: 'none',
                  transition: 'var(--transition)'
                }}>
                  🐙
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={submit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  placeholder="Your full name"
                  onChange={handleInputChange}
                  className={errors.name ? 'error' : ''}
                  style={{
                    borderColor: errors.name ? '#dc2626' : 'var(--border-color)'
                  }}
                />
                {errors.name && <div style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.name}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  placeholder="your.email@example.com"
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                  style={{
                    borderColor: errors.email ? '#dc2626' : 'var(--border-color)'
                  }}
                />
                {errors.email && <div style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.email}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  placeholder="What's this about?"
                  onChange={handleInputChange}
                  className={errors.subject ? 'error' : ''}
                  style={{
                    borderColor: errors.subject ? '#dc2626' : 'var(--border-color)'
                  }}
                />
                {errors.subject && <div style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.subject}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  placeholder="Tell me about your project or just say hello!"
                  onChange={handleInputChange}
                  className={errors.message ? 'error' : ''}
                  style={{
                    borderColor: errors.message ? '#dc2626' : 'var(--border-color)',
                    minHeight: '120px'
                  }}
                />
                {errors.message && <div style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.message}</div>}
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
                style={{ 
                  width: '100%',
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="spinner" style={{ width: '20px', height: '20px', marginRight: '0.5rem' }}></div>
                    Sending...
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>

              {status === 'sent' && (
                <div className="success" style={{ marginTop: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '0.5rem' }}>✅</span>
                    <span>Message sent successfully! I'll get back to you soon.</span>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="error" style={{ marginTop: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '0.5rem' }}>❌</span>
                    <span>Failed to send message. Please try again later or contact me directly.</span>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}