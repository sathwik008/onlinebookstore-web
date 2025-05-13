"use client"

export default function Header({ cartItemCount, setView }) {
  return (
    <header className="header">
      <div className="logo" onClick={() => setView("books")}>
        <h1>BookWorm</h1>
        <p>Your Online Bookstore</p>
      </div>
      <nav className="nav">
        <ul>
          <li onClick={() => setView("books")}>Books</li>
          <li onClick={() => setView("cart")}>Cart ({cartItemCount})</li>
        </ul>
      </nav>
    </header>
  )
}
