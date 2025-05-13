"use client"

import { useState } from "react"

export default function BookForm({ book, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    id: book?.id || "",
    title: book?.title || "",
    author: book?.author || "",
    price: book?.price || "",
    cover: book?.cover || "/placeholder.svg?height=300&width=200",
    description: book?.description || "",
    year: book?.year || "",
    genre: book?.genre || "",
    stock: book?.stock || "",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "price" || name === "year" || name === "stock" ? Number.parseFloat(value) || "" : value,
    })
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.title) newErrors.title = "Title is required"
    if (!formData.author) newErrors.author = "Author is required"
    if (!formData.price) newErrors.price = "Price is required"
    if (!formData.genre) newErrors.genre = "Genre is required"
    if (!formData.year) newErrors.year = "Year is required"
    if (!formData.stock && formData.stock !== 0) newErrors.stock = "Stock is required"
    if (!formData.description) newErrors.description = "Description is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(formData)
    }
  }

  return (
    <div className="book-form-container">
      <h2>{book ? "Edit Book" : "Add New Book"}</h2>
      <form className="book-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
            {errors.title && <span className="error">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} />
            {errors.author && <span className="error">{errors.author}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <input type="text" id="genre" name="genre" value={formData.genre} onChange={handleChange} />
            {errors.genre && <span className="error">{errors.genre}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="year">Year</label>
            <input type="number" id="year" name="year" value={formData.year} onChange={handleChange} />
            {errors.year && <span className="error">{errors.year}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price ($)</label>
            <input type="number" id="price" name="price" step="0.01" value={formData.price} onChange={handleChange} />
            {errors.price && <span className="error">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock</label>
            <input type="number" id="stock" name="stock" value={formData.stock} onChange={handleChange} />
            {errors.stock && <span className="error">{errors.stock}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="cover">Cover Image URL</label>
          <input type="text" id="cover" name="cover" value={formData.cover} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          ></textarea>
          {errors.description && <span className="error">{errors.description}</span>}
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            {book ? "Update Book" : "Add Book"}
          </button>
        </div>
      </form>
    </div>
  )
}
