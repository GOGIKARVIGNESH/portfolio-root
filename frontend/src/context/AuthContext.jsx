import React, { createContext, useContext, useMemo, useState } from 'react'
import { loginUser, registerUser } from '../api'

const AuthContext = createContext(null)

const getErrorMessage = (error) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    'Something went wrong'
  )
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('authUser')
    return stored ? JSON.parse(stored) : null
  })
  const [authError, setAuthError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const persistUser = (data) => {
    setUser(data)
    localStorage.setItem('authUser', JSON.stringify(data))
  }

  const handleRegister = async (payload) => {
    setIsSubmitting(true)
    setAuthError(null)
    try {
      const { data } = await registerUser(payload)
      persistUser(data)
      return data
    } catch (error) {
      const message = getErrorMessage(error)
      setAuthError(message)
      throw new Error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogin = async (payload) => {
    setIsSubmitting(true)
    setAuthError(null)
    try {
      const { data } = await loginUser(payload)
      persistUser(data)
      return data
    } catch (error) {
      const message = getErrorMessage(error)
      setAuthError(message)
      throw new Error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('authUser')
    setUser(null)
  }

  const value = useMemo(
    () => ({
      user,
      authError,
      isSubmitting,
      register: handleRegister,
      login: handleLogin,
      logout
    }),
    [user, authError, isSubmitting]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

