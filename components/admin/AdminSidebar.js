"use client"

export default function AdminSidebar({ activeView, setActiveView }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "books", label: "Books" },
    { id: "orders", label: "Orders" },
    { id: "users", label: "Users" },
  ]

  return (
    <aside className="admin-sidebar">
      <nav className="admin-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`admin-nav-item ${activeView === item.id ? "active" : ""}`}
                onClick={() => setActiveView(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
