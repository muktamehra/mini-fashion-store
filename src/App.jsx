import { useState, useEffect } from 'react'
import Header from './Header'
import Hero from './Hero'
import ProductCard from './ProductCard'
import Footer from './Footer'
import './ProductCard.css'
import './App.css'
import products from './data/products'

function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('default')
  const [cartOpen, setCartOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [activeSearch, setActiveSearch] = useState('')

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (name, price, quantity) => {
  const existingProduct = cart.find((item) => item.name === name)
  if (existingProduct) {
    setCart(cart.map((item) =>
      item.name === name ? { ...item, quantity: item.quantity + quantity } : item
    ))
  } else {
    setCart([...cart, { name, price, quantity }])
  }
}

  const removeFromCart = (name) => {
    const existingProduct = cart.find((item) => item.name === name)
    if (existingProduct.quantity === 1) {
      setCart(cart.filter((item) => item.name !== name))
    } else {
      setCart(cart.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity - 1 } : item
      ))
    }
  }

  const clearCart = () => setCart([])

  const resetSearch = () => { setSearch(''); setActiveSearch('') } 

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const filteredProducts = products.filter((product) =>
    filter === 'all' ? true : product.category === filter
  )

  const searchedProducts = filteredProducts.filter((product) => {
    const query = activeSearch.toLowerCase()
    return product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query)
  })

  const sortedProducts = [...searchedProducts].sort((a, b) => {
    if (sort === 'low') return a.price - b.price
    if (sort === 'high') return b.price - a.price
    return 0
  })

  const cartTotal = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div>
      <Header
        cartTotal={cartTotal}
        total={total}
        cart={cart}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        search={search}
        setSearch={setSearch}
        setActiveSearch={setActiveSearch}
        removeFromCart={removeFromCart}
        resetSearch={resetSearch}
        clearCart={clearCart}
      />
      {!activeSearch && <Hero /> }
      
      {!activeSearch && (
      <div className='filters'>
  <button type="button" className={filter === 'all' ? 'active' : ''} onClick={() => { setFilter('all'); setSearch(''); setActiveSearch('')  }}>All</button>
  <button type="button" className={filter === 'dresses' ? 'active' : ''} onClick={() => { setFilter('dresses'); setSearch(''); setActiveSearch('')  }}>Dresses</button>
  <button type="button" className={filter === 'tops' ? 'active' : ''} onClick={() => { setFilter('tops'); setSearch(''); setActiveSearch('')  }}>Tops</button>
  <button type="button" className={filter === 'jackets' ? 'active' : ''} onClick={() => { setFilter('jackets'); setSearch(''); setActiveSearch('')  }}>Jackets & Coats</button>
  <button type="button" className={filter === 'bags' ? 'active' : ''} onClick={() => { setFilter('bags'); setSearch(''); setActiveSearch('')  }}>Bags & Purses</button>
  <button type="button" className={filter === 'pants' ? 'active' : ''} onClick={() => { setFilter('pants'); setSearch(''); setActiveSearch('')  }}>Pants & Jeans</button>
</div>
      )}

    {!activeSearch && (
      <div className='sort'>
        <button type="button" className={sort === 'default' ? 'active' : ''} onClick={() => setSort('default')}>Default</button>
        <button type="button" className={sort === 'low' ? 'active' : ''} onClick={() => setSort('low')}>Price Low to High</button>
        <button type="button" className={sort === 'high' ? 'active' : ''} onClick={() => setSort('high')}>Price High to Low</button>
      </div>
    )}

        {activeSearch && (
      <div className='search-results-bar'>
        <button onClick={() => { setSearch(''); setActiveSearch('') }}>← Back</button>
        <p>Showing results for "<strong>{activeSearch}</strong>"</p>
      </div>
    )}
     
     <div className="cards">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            addToCart={addToCart}
          />
        ))}
      </div>

      {sortedProducts.length === 0 && (
  <p style={{ textAlign: 'center', marginTop: '40px', color: '#777' }}>
    No products found.
  </p>
)}

      <Footer />
    </div>
  )
}

export default App