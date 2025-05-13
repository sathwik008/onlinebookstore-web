"use client"

export default function AdminHeader({ onLogout }) {
  return (
    <header className="admin-header">
      <div className="admin-logo">
        <h1>BookWorm Admin</h1>
      </div>
      <div className="admin-header-actions">
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  )
}
