import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const initialState = {
  name: '',
  email: '',
  password: ''
}

export default function Auth() {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState(initialState)
  const [localError, setLocalError] = useState(null)
  const navigate = useNavigate()
  const { login, register, authError, isSubmitting, user } = useAuth()

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const switchMode = () => {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'))
    setForm(initialState)
    setLocalError(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLocalError(null)

    try {
      if (mode === 'login') {
        await login({ email: form.email, password: form.password })
      } else {
        await register(form)
      }
      navigate('/dashboard')
    } catch (error) {
      setLocalError(error.message)
    }
  }

  const disabled =
    !form.email || !form.password || (mode === 'register' && !form.name) || isSubmitting

  return (
    <section className="container" style={{ maxWidth: '480px', marginTop: '3rem' }}>
      <div className="card">
        <h2 style={{ marginBottom: '1rem' }}>
          {mode === 'login' ? 'Sign in to manage your portfolio' : 'Create an account'}
        </h2>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
          {mode === 'login'
            ? 'Enter your credentials to access your dashboard.'
            : 'Register to start adding your skills and achievements.'}
        </p>

        {localError || authError ? (
          <div className="alert alert-error" role="alert">
            {localError || authError}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="form-grid">
          {mode === 'register' && (
            <label className="form-field">
              <span>Name</span>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
              />
            </label>
          )}

          <label className="form-field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </label>

          <label className="form-field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </label>

          <button className="btn btn-primary" type="submit" disabled={disabled}>
            {isSubmitting ? 'Please wait...' : mode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            type="button"
            className="link-button"
            onClick={switchMode}
            style={{ color: '#6366f1' }}
          >
            {mode === 'login' ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </section>
  )
}

