import './Header.css'

function Header({ cartTotal, total, cart, cartOpen, setCartOpen, search, setSearch}) {
    return (
        <header>
        <h1>My Shop</h1>
        <nav>
            <a href="#">Home</a> 
            <a href="#">About</a>
            <a href="#">Contact</a>
        </nav>
        <input 
        type="text" 
        placeholder='Search products...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
        <div className='cart-wrapper'>
            <span 
            className='cart-icon'
            onClick={() => setCartOpen(!cartOpen)}>
            🛒{cartTotal} - ${total}            
           </span>

           {cartOpen && (
            <div className='cart-dropdown'>
                <h3>Your Cart</h3>
                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    cart.map(function(item, index) {
                        return (
                            <div key={index} className='cart-item'>
                                <span>{item.name}</span>
                                <span>{item.quantity}</span>
                                <span>{item.price * item.quantity}</span>
                            </div>
                        )
                    })
                )}
                <div className='cart-total'>
                    <strong>Total: ${total}</strong>
                </div>
            </div>
           )}
        </div>       
    </header>    
    )
}

export default Header