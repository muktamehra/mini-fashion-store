import './Header.css'
import { useEffect, useRef } from 'react'

function Header({ cartTotal, total, cart, cartOpen, setCartOpen, search, setSearch, setActiveSearch, removeFromCart, resetSearch, clearCart }) {
  const cartRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setCartOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setCartOpen])

  return (
    <header>
      <h1>Fashion Mania</h1>
      <nav>
        <a href="#" onClick={resetSearch}>Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>
      <div className='search-wrapper'>
        <input
          type="text"
          placeholder='Search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') setActiveSearch(e.target.value)
          }}
        />
        {search && (
          <span className='search-clear' onClick={() => { setSearch(''); setActiveSearch('') }}>✕</span>
        )}
        <i className="fas fa-search"></i>
      </div>
      <div className='cart-wrapper' ref={cartRef}>
        <span className='cart-icon' onClick={() => setCartOpen(!cartOpen)}>
          🛒{cartTotal} - ${total}
        </span>
        {cartOpen && (
          <div className='cart-dropdown'>
            <h3>Your Cart</h3>
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              cart.map((item) => (
                <div key={item.name} className='cart-item'>
                  <span>{item.name}</span>
                  <span>{item.quantity}</span>
                  <span>${item.price * item.quantity}</span>
                  <button type="button" onClick={() => removeFromCart(item.name)}>❌</button>
                </div>
              ))
            )}
            <div className='cart-total'>
              <strong>Total: ${total}</strong>
            </div>
            <button type="button" className='clear-cart' onClick={clearCart}>Clear Cart</button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header