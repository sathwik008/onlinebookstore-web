export default function DashboardOverview({ books, orders, users }) {
  // Calculate statistics
  const totalBooks = books.length
  const totalOrders = orders.length
  const totalUsers = users.length
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const booksInStock = books.reduce((sum, book) => sum + book.stock, 0)

  // Get recent orders (last 3)
  const recentOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)

  // Get low stock books (less than 15 in stock)
  const lowStockBooks = books.filter((book) => book.stock < 15)

  return (
    <div className="dashboard-overview">
      <h1>Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Books</h3>
          <p className="stat-value">{totalBooks}</p>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-value">{totalOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-value">{totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-value">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Books in Stock</h3>
          <p className="stat-value">{booksInStock}</p>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="dashboard-section">
          <h2>Recent Orders</h2>
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.date}</td>
                    <td>${order.total.toFixed(2)}</td>
                    <td>
                      <span className={`status-badge status-${order.status.toLowerCase()}`}>{order.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Low Stock Alert</h2>
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Book</th>
                  <th>Author</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {lowStockBooks.length > 0 ? (
                  lowStockBooks.map((book) => (
                    <tr key={book.id}>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td className="low-stock">{book.stock}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="empty-table">
                      No books with low stock
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
