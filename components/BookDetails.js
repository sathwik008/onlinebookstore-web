"use client"

export default function BookDetails({ book, addToCart, goBack }) {
  return (
    <div className="book-details">
      <button className="back-button" onClick={goBack}>
        &larr; Back to Books
      </button>

      <div className="book-details-content">
        <div className="book-details-image">
          <img src={book.cover || "/placeholder.svg"} alt={book.title} />
        </div>

        <div className="book-details-info">
          <h2>{book.title}</h2>
          <p className="book-author">by {book.author}</p>
          <p className="book-price">${book.price.toFixed(2)}</p>
          <p className="book-genre">
            <strong>Genre:</strong> {book.genre}
          </p>
          <p className="book-year">
            <strong>Year:</strong> {book.year}
          </p>
          <p className="book-description">{book.description}</p>

          <button className="add-to-cart-large" onClick={() => addToCart(book)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
