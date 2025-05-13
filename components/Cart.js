"use client"

export default function Cart({ cart, updateQuantity, removeFromCart, total, checkout, continueShopping }) {
  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your Cart is Empty</h2>
        <p>Add some books to your cart to get started!</p>
        <button className="continue-shopping" onClick={continueShopping}>
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="cart">
      <h2>Your Shopping Cart</h2>

      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.cover || "/placeholder.svg"} alt={item.title} className="cart-item-cover" />

            <div className="cart-item-details">
              <h3>{item.title}</h3>
              <p>by {item.author}</p>
              <p className="cart-item-price">${item.price.toFixed(2)}</p>
            </div>

            <div className="cart-item-actions">
              <div className="quantity-control">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>

              <p className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</p>

              <button className="remove-item" onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total">
          <h3>Total: ${total}</h3>
        </div>

        <div className="cart-actions">
          <button className="continue-shopping" onClick={continueShopping}>
            Continue Shopping
          </button>
          <button className="checkout" onClick={checkout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
