"use client"

import { useState, useEffect } from "react"
import AdminLogin from "./AdminLogin"
import AdminHeader from "./AdminHeader"
import AdminSidebar from "./AdminSidebar"
import DashboardOverview from "./DashboardOverview"
import BookManagement from "./BookManagement"
import OrderManagement from "./OrderManagement"
import UserManagement from "./UserManagement"
import "../styles/admin.css"

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeView, setActiveView] = useState("dashboard")
  const [books, setBooks] = useState([])
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    // In a real app, you would check for an auth token here
    // For demo purposes, we'll load sample data
    loadSampleData()
  }, [])

  const loadSampleData = () => {
    // Sample books data
    setBooks([
      {
        id: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        price: 12.99,
        cover: "/placeholder.svg?height=300&width=200",
        description: "A classic novel about racial injustice and moral growth in the American South.",
        year: 1960,
        genre: "Fiction",
        stock: 25,
      },
      {
        id: 2,
        title: "1984",
        author: "George Orwell",
        price: 10.99,
        cover: "/placeholder.svg?height=300&width=200",
        description: "A dystopian novel set in a totalitarian society where critical thought is suppressed.",
        year: 1949,
        genre: "Science Fiction",
        stock: 18,
      },
      {
        id: 3,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 9.99,
        cover: "/placeholder.svg?height=300&width=200",
        description: "A novel about the American Dream and the roaring twenties.",
        year: 1925,
        genre: "Fiction",
        stock: 12,
      },
      {
        id: 4,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        price: 8.99,
        cover: "/placeholder.svg?height=300&width=200",
        description: "A romantic novel about the Bennet family and the proud Mr. Darcy.",
        year: 1813,
        genre: "Romance",
        stock: 20,
      },
      {
        id: 5,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        price: 14.99,
        cover: "/placeholder.svg?height=300&width=200",
        description: "A fantasy novel about Bilbo Baggins and his adventure with dwarves.",
        year: 1937,
        genre: "Fantasy",
        stock: 15,
      },
      {
        id: 6,
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        price: 15.99,
        cover: "/placeholder.svg?height=300&width=200",
        description: "The first book in the Harry Potter series about a young wizard.",
        year: 1997,
        genre: "Fantasy",
        stock: 30,
      },
    ])

    // Sample orders data
    setOrders([
      {
        id: 1,
        customer: "John Doe",
        email: "john@example.com",
        date: "2023-05-15",
        total: 38.97,
        status: "Delivered",
        items: [
          { id: 1, title: "To Kill a Mockingbird", quantity: 1, price: 12.99 },
          { id: 2, title: "1984", quantity: 1, price: 10.99 },
          { id: 3, title: "The Great Gatsby", quantity: 1, price: 9.99 },
        ],
      },
      {
        id: 2,
        customer: "Jane Smith",
        email: "jane@example.com",
        date: "2023-05-18",
        total: 23.98,
        status: "Shipped",
        items: [
          { id: 4, title: "Pride and Prejudice", quantity: 1, price: 8.99 },
          { id: 5, title: "The Hobbit", quantity: 1, price: 14.99 },
        ],
      },
      {
        id: 3,
        customer: "Bob Johnson",
        email: "bob@example.com",
        date: "2023-05-20",
        total: 15.99,
        status: "Processing",
        items: [{ id: 6, title: "Harry Potter and the Sorcerer's Stone", quantity: 1, price: 15.99 }],
      },
    ])

    // Sample users data
    setUsers([
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        joinDate: "2023-01-15",
        orders: 5,
        totalSpent: 89.95,
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        joinDate: "2023-02-20",
        orders: 3,
        totalSpent: 45.97,
      },
      {
        id: 3,
        name: "Bob Johnson",
        email: "bob@example.com",
        joinDate: "2023-03-10",
        orders: 1,
        totalSpent: 15.99,
      },
      {
        id: 4,
        name: "Alice Williams",
        email: "alice@example.com",
        joinDate: "2023-04-05",
        orders: 2,
        totalSpent: 29.98,
      },
    ])
  }

  const handleLogin = (credentials) => {
    // In a real app, you would validate credentials against a backend
    // For demo purposes, we'll accept any non-empty username and password
    if (credentials.username && credentials.password) {
      setIsLoggedIn(true)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  // Book management functions
  const addBook = (newBook) => {
    const bookWithId = {
      ...newBook,
      id: books.length > 0 ? Math.max(...books.map((book) => book.id)) + 1 : 1,
    }
    setBooks([...books, bookWithId])
  }

  const updateBook = (updatedBook) => {
    setBooks(books.map((book) => (book.id === updatedBook.id ? updatedBook : book)))
  }

  const deleteBook = (bookId) => {
    setBooks(books.filter((book) => book.id !== bookId))
  }

  // Order management functions
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return (
    <div className="admin-dashboard">
      <AdminHeader onLogout={handleLogout} />
      <div className="admin-container">
        <AdminSidebar activeView={activeView} setActiveView={setActiveView} />
        <main className="admin-content">
          {activeView === "dashboard" && <DashboardOverview books={books} orders={orders} users={users} />}
          {activeView === "books" && (
            <BookManagement books={books} addBook={addBook} updateBook={updateBook} deleteBook={deleteBook} />
          )}
          {activeView === "orders" && <OrderManagement orders={orders} updateOrderStatus={updateOrderStatus} />}
          {activeView === "users" && <UserManagement users={users} />}
        </main>
      </div>
    </div>
  )
}
