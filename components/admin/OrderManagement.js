"use client"

import { useState } from "react"

export default function OrderManagement({ orders, updateOrderStatus }) {
  const [expandedOrderId, setExpandedOrderId] = useState(null)
  const [filterStatus, setFilterStatus] = useState("all")

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId)
  }

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus)
  }

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((order) => order.status.toLowerCase() === filterStatus.toLowerCase())

  return (
    <div className="order-management">
      <h1>Order Management</h1>

      <div className="filter-container">
        <label htmlFor="status-filter">Filter by Status:</label>
        <select
          id="status-filter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="status-filter"
        >
          <option value="all">All Orders</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <>
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.date}</td>
                  <td>${order.total.toFixed(2)}</td>
                  <td>
                    <span className={`status-badge status-${order.status.toLowerCase()}`}>{order.status}</span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="view-button" onClick={() => toggleOrderDetails(order.id)}>
                        {expandedOrderId === order.id ? "Hide" : "View"}
                      </button>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="status-select"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </td>
                </tr>
                {expandedOrderId === order.id && (
                  <tr className="order-details-row">
                    <td colSpan="6">
                      <div className="order-details">
                        <div className="order-customer-info">
                          <h3>Customer Information</h3>
                          <p>
                            <strong>Name:</strong> {order.customer}
                          </p>
                          <p>
                            <strong>Email:</strong> {order.email}
                          </p>
                        </div>
                        <div className="order-items-list">
                          <h3>Order Items</h3>
                          <table className="order-items-table">
                            <thead>
                              <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Subtotal</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.items.map((item) => (
                                <tr key={item.id}>
                                  <td>{item.title}</td>
                                  <td>{item.quantity}</td>
                                  <td>${item.price.toFixed(2)}</td>
                                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot>
                              <tr>
                                <td colSpan="3" className="total-label">
                                  Total
                                </td>
                                <td className="total-value">${order.total.toFixed(2)}</td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="6" className="empty-table">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
