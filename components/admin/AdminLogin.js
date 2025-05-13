"use client"

import { useState } from "react"

export default function AdminLogin({ onLogin }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials({
      ...credentials,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!credentials.username || !credentials.password) {
      setError("Please enter both username and password")
      return
    }

    // For demo purposes, we'll accept any credentials
    // In a real app, you would validate against a backend
    onLogin(credentials)
  }

  return (
    <div className="admin-login-container">
      <div className="admin-login-form">
        <h1>BookWorm Admin</h1>
        <p>Sign in to manage your bookstore</p>

        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        <div className="login-help">
          <p>
            <small>Demo credentials: any non-empty username and password will work</small>
          </p>
        </div>
      </div>
    </div>
  )
}
