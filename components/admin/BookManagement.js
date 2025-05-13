"use client"

import { useState } from "react"
import BookForm from "./BookForm"

export default function BookManagement({ books, addBook, updateBook, deleteBook }) {
  const [showForm, setShowForm] = useState(false)
  const [editingBook, setEditingBook] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const handleAddNew = () => {
    setEditingBook(null)
    setShowForm(true)
  }

  const handleEdit = (book) => {
    setEditingBook(book)
    setShowForm(true)
  }

  const handleFormSubmit = (book) => {
    if (editingBook) {
      updateBook(book)
    } else {
      addBook(book)
    }
    setShowForm(false)
    setEditingBook(null)
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingBook(null)
  }

  const handleDelete = (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      deleteBook(bookId)
    }
  }

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="book-management">
      <div className="section-header">
        <h1>Book Management</h1>
        <button className="add-button" onClick={handleAddNew}>
          Add New Book
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {showForm && <BookForm book={editingBook} onSubmit={handleFormSubmit} onCancel={handleFormCancel} />}

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Cover</th>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.id}>
                <td>
                  <img src={book.cover || "/placeholder.svg"} alt={book.title} className="book-thumbnail" />
                </td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>${book.price.toFixed(2)}</td>
                <td>{book.stock}</td>
                <td>
                  <div className="action-buttons">
                    <button className="edit-button" onClick={() => handleEdit(book)}>
                      Edit
                    </button>
                    <button className="delete-button" onClick={() => handleDelete(book.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
