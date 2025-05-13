"use client"

export default function BookList({ books, addToCart, viewDetails }) {
  return (
    <div className="book-list">
      <h2>Available Books</h2>
      <div className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <img
              src={book.cover || "/placeholder.svg"}
              alt={book.title}
              className="book-cover"
              onClick={() => viewDetails(book)}
            />
            <div className="book-info">
              <h3>{book.title}</h3>
              <p className="book-author">by {book.author}</p>
              <p className="book-price">${book.price.toFixed(2)}</p>
              <div className="book-actions">
                <button className="view-details" onClick={() => viewDetails(book)}>
                  View Details
                </button>
                <button className="add-to-cart" onClick={() => addToCart(book)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
