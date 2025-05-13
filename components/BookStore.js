"use client"

import { useState, useEffect } from "react"
import Header from "./Header"
import BookList from "./BookList"
import BookDetails from "./BookDetails"
import Cart from "./Cart"
import Checkout from "./Checkout"
import Footer from "./Footer"
import "../styles/bookstore.css"

export default function BookStore() {
  const [books, setBooks] = useState([])
  const [cart, setCart] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [view, setView] = useState("books") // books, details, cart, checkout

  useEffect(() => {
    // Load sample book data
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
      },
    ])
  }, [])

  const addToCart = (book) => {
    const existingItem = cart.find((item) => item.id === book.id)

    if (existingItem) {
      setCart(cart.map((item) => (item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...cart, { ...book, quantity: 1 }])
    }
  }

  const removeFromCart = (bookId) => {
    setCart(cart.filter((item) => item.id !== bookId))
  }

  const updateQuantity = (bookId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(bookId)
      return
    }

    setCart(cart.map((item) => (item.id === bookId ? { ...item, quantity } : item)))
  }

  const viewBookDetails = (book) => {
    setSelectedBook(book)
    setView("details")
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <div className="bookstore">
      <Header cartItemCount={cart.reduce((total, item) => total + item.quantity, 0)} setView={setView} />

      <main className="bookstore-content">
        {view === "books" && <BookList books={books} addToCart={addToCart} viewDetails={viewBookDetails} />}

        {view === "details" && selectedBook && (
          <BookDetails book={selectedBook} addToCart={addToCart} goBack={() => setView("books")} />
        )}

        {view === "cart" && (
          <Cart
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            total={calculateTotal()}
            checkout={() => setView("checkout")}
            continueShopping={() => setView("books")}
          />
        )}

        {view === "checkout" && (
          <Checkout cart={cart} total={calculateTotal()} clearCart={clearCart} setView={setView} />
        )}
      </main>

      <Footer />
    </div>
  )
}
